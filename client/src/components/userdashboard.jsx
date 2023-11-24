import React, { useEffect, useState } from 'react';
import {Profile} from './profile';
import "../css/userdashboard.css";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from '@mui/material';


const Dashboard = () => {
  const [userFriends, setUserFriends] = useState([]);
  var [user,setUser] = useState([]);
  const {userId}  = useParams();
  const navigate = useNavigate();
  const getUser = async () => {
      try{
        const response = await axios.get(`/user/profile/${userId}`);
        if(response.status === 200){
          console.log(response.data);
          setUser(response.data.user);
          
        }
      }
      catch(err){
        console.log(err);
      }
  }
  const getUserFriends = async () => {
    try {
      const response = await axios.get(`/user/profile/${userId}`);
      if (response.status === 200) {
        // Assuming response.data.user.friends contains friend IDs
        const friendIds = response.data.user.friends;

        // Fetch details for each friend
        const friendDetailsPromises = friendIds.map(async (friendId) => {
          const friendResponse = await axios.get(`/user/${friendId}`);
          return friendResponse.data.user;
        });

        // Wait for all friend details to be fetched
        const friendDetails = await Promise.all(friendDetailsPromises);

        setUserFriends(friendDetails);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  useEffect(() => {
    getUserFriends();
    getUser();
  },[userId]);

  return (
    <div style={{display: "flex"}}>
      <div className="dashboard">
        <Profile 
          user={user}
        />
      </div>
      <div style={{marginTop:"25px",}}>
      <h2 style={{textAlign:'center'}}>Friends</h2>
      
        {userFriends.map((friend) => (
          <div key={friend._id} style={{
           margin: "10px",
           padding: "20px",
          border: "2px solid #333",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "left",
          maxWidth: "300px",
          backgroundColor: "#fff",
        }}>
        <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "8px",cursor:"pointer"}} onClick={()=>{
          navigate(`/user/profile/${friend._id}`)
        }}>{friend.username}</p>
        <p style={{ marginBottom: "8px" }}>Education: {friend.Education}</p>
        <p style={{ marginBottom: "8px" }}>Work Experience: {friend.workExperience}</p>
      </div>
        ))}
      
      </div>
    
    </div>
  );
};

export default Dashboard;
