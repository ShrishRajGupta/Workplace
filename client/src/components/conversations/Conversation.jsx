import { useState } from "react";
import "./Conversation.css";
import { useEffect } from "react";
import axios from "axios";

export default function Conversation({conversation,currentUser}){

    const [user,setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
        const friendId = conversation.members.find((m)=>m !== currentUser._id);
        const getUser = async ()=>{
            try{
                const response = await axios.get(`/user/${friendId}`);
                setUser(response.data.user);
            }
            catch(err){
                console.log(err);
            }
        }
        getUser();
    },[currentUser,conversation]);

    return <div className="conversation">
        <img className="conversationImg" 
        src="/images/person/noAvatar.png" 
        alt=""/>
        <span className="conversationName">{user?.username}</span>
    </div>
}