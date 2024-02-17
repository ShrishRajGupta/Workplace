import "./message.css";
import {format} from "timeago.js";

export default function Message({message,own}){
    return <div className={own?"message own":"message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://images.unsplash.com/photo-1706550631672-15f4502b7527?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
            <span className="messageText">{message.text}</span>
        </div>
        <div className="messageBottom">
            <p className="messageTime">{format(message.createdAt)}</p>
        </div>
    </div>
}