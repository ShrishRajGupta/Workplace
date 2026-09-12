import { format } from "timeago.js";
import "./message.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <span className="messageText">{message.text}</span>
      </div>
      <div className="messageBottom">
        <p className="messageTime">{format(message.createdAt)}</p>
      </div>
    </div>
  );
}
