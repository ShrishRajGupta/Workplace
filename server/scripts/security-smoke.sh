#!/bin/bash
# Security smoke test for the API. Needs a running server pointed at a throwaway database
# (it registers users alice, bob and carol). Not part of CI.
#
#   BASE_URL=http://localhost:3001 server/scripts/security-smoke.sh
#
# Checks: password hash never returned, cookie flags, 401 without a token, Bearer header
# accepted, profile writes target the logged-in user only, regex-safe search, chat routes
# limited to conversation members, welcome email limited to the logged-in user.
set -u
B=${BASE_URL:-http://localhost:3001}; J=$(mktemp -d); rm -rf $J; mkdir -p $J
pass=0; fail=0
check(){ if [ "$2" = "$3" ]; then echo "PASS  $1"; pass=$((pass+1)); else echo "FAIL  $1  (got: $2 | want: $3)"; fail=$((fail+1)); fi; }
code(){ curl -s -o /dev/null -w '%{http_code}' "$@"; }
reg(){ curl -s -D $J/$1.h -c $J/$1.jar -X POST $B/user/register -H 'Content-Type: application/json' -d "{\"username\":\"$1\",\"email\":\"$1@x.test\",\"password\":\"pw-$1\"}"; }

A=$(reg alice); Bb=$(reg bob); C=$(reg carol)
check "register 200 + success" "$(echo "$A" | grep -c '"success":true')" 1
check "register body has no password" "$(echo "$A" | grep -c password)" 0
check "cookie HttpOnly+SameSite+Max-Age" "$(grep -i 'set-cookie' $J/alice.h | grep -ci 'httponly.*samesite=lax\|samesite=lax.*httponly')$(grep -i set-cookie $J/alice.h | grep -ci max-age)" 11
AID=$(echo "$A" | sed -E 's/.*"_id":"([a-f0-9]+)".*/\1/'); BID=$(echo "$Bb" | sed -E 's/.*"_id":"([a-f0-9]+)".*/\1/')

L=$(curl -s -c $J/alice.jar -X POST $B/user/login -H 'Content-Type: application/json' -d '{"email":"alice@x.test","password":"pw-alice"}')
check "login first attempt 200" "$(echo "$L" | grep -c '"success":true')" 1
check "login body has no password" "$(echo "$L" | grep -c password)" 0
check "login wrong password 401" "$(code -X POST $B/user/login -H 'Content-Type: application/json' -d '{"email":"alice@x.test","password":"nope"}')" 401

check "GET /user/profile no cookie -> 401" "$(code $B/user/profile)" 401
check "GET /user/profile bad token -> 401" "$(code -H 'Authorization: Bearer garbage' $B/user/profile)" 401
P=$(curl -s -b $J/alice.jar $B/user/profile)
check "GET /user/profile with cookie 200, no hash" "$(echo "$P" | grep -c '"success":true')$(echo "$P" | grep -c password)" 10
TOK=$(awk '/authorization/ {print $7}' $J/alice.jar)
check "Bearer header accepted" "$(code -H "Authorization: Bearer $TOK" $B/user/profile)" 200

check "POST /in/populate gone -> 404" "$(code -X POST $B/in/populate -H 'Content-Type: application/json' -d '{"username":"evil","email":"e@x","password":"p"}')" 404
check "POST /in/update no cookie -> 401" "$(code -X POST $B/in/update/alice -H 'Content-Type: application/json' -d '{"about":"x"}')" 401
check "POST /in/addCollege no cookie -> 401" "$(code -X POST $B/in/addCollege/alice -H 'Content-Type: application/json' -d '{"collegeName":"x"}')" 401
curl -s -o /dev/null -b $J/alice.jar -X POST $B/in/update/bob -H 'Content-Type: application/json' -d '{"about":"HACKED-VIA-URL"}'
check "IDOR: alice editing /in/update/bob changes alice" "$(curl -s $B/in/alice | grep -c HACKED-VIA-URL)" 1
check "IDOR: bob untouched" "$(curl -s $B/in/bob | grep -c HACKED-VIA-URL)" 0
check "GET /in/:username has no hash" "$(curl -s $B/in/bob | grep -c password)" 0
check "addCollege empty body -> 400" "$(code -b $J/alice.jar -X POST $B/in/addCollege/x -H 'Content-Type: application/json' -d '{}')" 400
check "photo upload wrong type -> 400" "$(printf 'notanimage' > /tmp/x.txt; code -b $J/alice.jar -X POST $B/in/add -F 'photo=@/tmp/x.txt;type=text/plain')" 400

check "search hostile regex -> 200 fast" "$(code --max-time 3 "$B/search/(a%2B)%2B%24")" 200
check "search result has no hash" "$(curl -s "$B/search/ali" | grep -c password)" 0

check "email/intro no cookie -> 401" "$(code -X POST $B/email/intro -H 'Content-Type: application/json' -d '{"userEmail":"victim@x.test","userName":"v"}')" 401

check "chat: no cookie -> 401" "$(code $B/conversations/$AID)" 401
CV=$(curl -s -b $J/bob.jar -X POST $B/conversations -H 'Content-Type: application/json' -d "{\"receiverId\":\"$AID\"}")
CID=$(echo "$CV" | sed -E 's/.*"_id":"([a-f0-9]+)".*/\1/')
check "chat: bob creates conversation 201" "$(echo "$CV" | grep -c '"members"')" 1
check "chat: bob reading alice's list -> 403" "$(code -b $J/bob.jar $B/conversations/$AID)" 403
check "chat: alice reading own list -> 200" "$(code -b $J/alice.jar $B/conversations/$AID)" 200
M=$(curl -s -b $J/alice.jar -X POST $B/messages -H 'Content-Type: application/json' -d "{\"conversationId\":\"$CID\",\"sender\":\"$BID\",\"text\":\"hi\"}")
check "chat: sender forced to token user (not spoofed)" "$(echo "$M" | grep -c "\"sender\":\"$AID\"")" 1
check "chat: carol reading thread -> 403" "$(code -b $J/carol.jar $B/messages/$CID)" 403
check "chat: carol posting to thread -> 403" "$(code -b $J/carol.jar -X POST $B/messages -H 'Content-Type: application/json' -d "{\"conversationId\":\"$CID\",\"text\":\"spam\"}")" 403
check "chat: bob reading thread -> 200" "$(code -b $J/bob.jar $B/messages/$CID)" 200

curl -s -D $J/logout.h -b $J/alice.jar $B/user/logout > /dev/null
check "logout clears cookie" "$(grep -i set-cookie $J/logout.h | grep -ci 'authorization=;')" 1
echo; echo "passed=$pass failed=$fail"
