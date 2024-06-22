import React from "react";
import { useState, useEffect } from "react";
import { Profile} from "./profile";
import "../css/userdashboard.css";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const home = "http://localhost:3001";

// @desc    User dashboard
// @route   GET /in/:username/dashboard

const Dashboard = () => {
  const [userFriends, setUserFriends] = useState([]);
  const [User,setUser] = useState([]);
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
    const [post,setPost] = useState([]);
    const getPosts = async () => {
    try {
      const response = await axios.get(`/user/allposts/${userId}`);
      if (response.status === 200) {
        console.log(response.data);
        setPost(response.data.allposts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    
    }
  }
  const PostCard = (props)=>{
    const {user} = useContext(AuthContext);
    return <div className="post-card">
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <p>JOB Title: {props.jobTitle}</p>
        {
          user.user._id !== userId ? <a href={`/user/applyform/${props._id}`}><button className="apply-button" >Apply Now</button></a> :""
        }
       
        </div>
        <p>Company Name : {props.companyName}</p>
        <p>WorkPlace : {props.workPlace}</p>
        <p>Job Location : {props.jobLocation}</p>
        <p>Job Type : {props.jobType}</p>
        <p>Salary : {props.salary}</p>
    </div>
  }
  useEffect(() => {
    getUserFriends();
    getUser();
    getPosts();
  },[userId]);

  return (
    <div style={{display: "flex"}} className="parentdiv">
      <div className="profileSection">
        <Profile 
          User={User}
        />
        
      </div>
      <div className="activitySection">
          <div className="activitydiv">
          Your Activity
          <div className="notidiv">

              <div>
              {
                post.length === 0 ? <div>No posts to show</div> :
                post.map(PostCard)
              }
              </div>
          </div>

          </div>
      </div>
      <div className="friendSection">
      <h2>Friends</h2>
      
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
          display: "flex",
          flexDirection: "column",
        }}>
        <div style={{display:"flex"}}>
        <div>
        <img
          src={`${friend.photo}`}
          alt="Profile"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }} />
        </div>
            <div>
            <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "8px",cursor:"pointer"}} onClick={()=>{
            navigate(`/user/profile/${friend._id}`)
            }}>{friend.username}</p>
            <p style={{ marginBottom: "8px" }}>Education: {friend.Education}</p>
            <p style={{ marginBottom: "8px" }}>Work Experience: {friend.workExperience}</p>
            </div>
        </div>
      </div>
        ))}
      
      </div>
    </div>
  );
};

export default Dashboard;

