import { useEffect, useState } from "react";
import { getUser } from "../../api/users";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import logger from "../../utils/logger";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    if (!friendId) return undefined;
    let cancelled = false;
    getUser(friendId)
      .then((data) => !cancelled && setFriend(data))
      .catch((err) => logger.error("Could not load conversation partner:", err));
    return () => {
      cancelled = true;
    };
  }, [currentUser._id, conversation.members]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={avatarUrl(friend?.photo)} alt="" onError={onAvatarError} />
      <span className="conversationName">{friend?.username ?? "…"}</span>
    </div>
  );
}
