import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getFriends } from "../../api/users";
import { createConversation, findConversation } from "../../api/chat";
import { getErrorMessage } from "../../api/client";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import logger from "../../utils/logger";
import "./chatonline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getFriends(currentId)
      .then((data) => !cancelled && setFriends(data))
      .catch((err) => logger.error("Could not load friends:", err));
    return () => {
      cancelled = true;
    };
  }, [currentId]);

  const onlineFriends = friends.filter((f) => onlineUsers?.includes(f._id));

  const handleClick = async (friend) => {
    try {
      const conversation = (await findConversation(currentId, friend._id)) || (await createConversation(friend._id));
      setCurrentChat(conversation);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not open the conversation"));
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.length === 0 && <span className="chatOnlineName">No friends online</span>}
      {onlineFriends.map((friend) => (
        <div key={friend._id} className="chatOnlineFriend" onClick={() => handleClick(friend)}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={avatarUrl(friend.photo)} alt="" onError={onAvatarError} />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  );
}
