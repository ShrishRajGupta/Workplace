import { useEffect, useState } from "react";
import { getUser } from "../../api/users";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import logger from "../../utils/logger";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [friend, setFriend] = useState(null);
  // Newer API responses include the other participant; fall back to a lookup for older shapes.
  const participant = conversation.participants?.find((p) => p._id !== currentUser._id);

  useEffect(() => {
    if (participant) return undefined;
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    if (!friendId) return undefined;
    let cancelled = false;
    getUser(friendId)
      .then((data) => !cancelled && setFriend(data))
      .catch((err) => logger.error("Could not load conversation partner:", err));
    return () => {
      cancelled = true;
    };
  }, [currentUser._id, conversation.members, participant]);

  const shown = participant ?? friend;

  return (
    <div className="conversation">
      <img className="conversationImg" src={avatarUrl(shown?.photo)} alt="" onError={onAvatarError} />
      <span className="conversationName">{shown?.username ?? "…"}</span>
    </div>
  );
}
