import "./MessengerPage.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import Conversation from "../../features/chat/Conversation";
import Message from "../../features/chat/Message";
import ChatOnline from "../../features/chat/ChatOnline";
import { useAuth } from "../../context/AuthContext";
import { getConversations, getMessages, sendMessage } from "../../api/chat";
import { getErrorMessage } from "../../api/client";
import logger from "../../utils/logger";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "ws://localhost:8900";

export default function MessengerPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef(null);
  const scrollRef = useRef();

  // One socket per mount; registered as this user; torn down on unmount.
  useEffect(() => {
    const s = io(SOCKET_URL);
    socket.current = s;
    s.on("getMessage", (data) => {
      setArrivalMessage({ sender: data.senderId, text: data.text, conversationId: data.conversationId, createdAt: Date.now() });
    });
    s.on("getUsers", (users) => {
      setOnlineUsers(user.friends?.filter((f) => users.some((u) => u.userId === f)) ?? []);
    });
    s.emit("addUser", user._id);
    return () => {
      s.off("getMessage");
      s.off("getUsers");
      s.disconnect();
    };
  }, [user._id, user.friends]);

  // Append live messages that belong to the open conversation.
  useEffect(() => {
    if (!arrivalMessage || !currentChat) return;
    const forThisChat = arrivalMessage.conversationId
      ? arrivalMessage.conversationId === currentChat._id
      : currentChat.members.includes(arrivalMessage.sender);
    if (forThisChat) setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    let cancelled = false;
    getConversations(user._id)
      .then((data) => !cancelled && setConversations(data))
      .catch((err) => logger.error("Could not load conversations:", err));
    return () => {
      cancelled = true;
    };
  }, [user._id]);

  useEffect(() => {
    if (!currentChat?._id) return undefined;
    let cancelled = false;
    getMessages(currentChat._id)
      .then((data) => !cancelled && setMessages(data))
      .catch((err) => logger.error("Could not load messages:", err));
    return () => {
      cancelled = true;
    };
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Opening a chat from the online list adds it to the sidebar if it is new.
  const openChat = useCallback((conversation) => {
    setCurrentChat(conversation);
    setConversations((prev) => (prev.some((c) => c._id === conversation._id) ? prev : [conversation, ...prev]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text || !currentChat) return;
    try {
      // Persist first, then notify, so a delivered message always exists on the server.
      const saved = await sendMessage({ conversationId: currentChat._id, text });
      setMessages((prev) => [...prev, saved]);
      setNewMessage("");
      const receiverId = currentChat.members.find((member) => member !== user._id);
      socket.current?.emit("sendMessage", { senderId: user._id, receiverId, text, conversationId: currentChat._id });
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not send the message"));
    }
  };

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m, index) => (
                  <div key={m._id ?? `live-${index}`} ref={index === messages.length - 1 ? scrollRef : undefined}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <form className="chatBoxBottom" onSubmit={handleSubmit}>
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" type="submit">
                  Send
                </button>
              </form>
            </>
          ) : (
            <span className="noConversationText">Pick a conversation, or a friend who is online, to start chatting.</span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={openChat} />
        </div>
      </div>
    </div>
  );
}
