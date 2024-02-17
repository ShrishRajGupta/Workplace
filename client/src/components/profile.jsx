// Profile.js
import React, { useContext, useEffect, useState } from 'react';
import {Avatar} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import "../css/profile.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
const Profile =  ({User}) => {
    console.log(User);

    const {user} = useContext(AuthContext);
    console.log(user);
  
    
    const navigate = useNavigate();
    const handleClick = async ()=>{
          try{
            const response = await axios.get(`/user/profile/${User._id}/connect`);
            if(response.status === 200){
              console.log(response.data);
            }
          }
          catch(err){
            console.log(err);
          }
    }
    
  return (
    <div>
      
    <div className="profile">
      <h2>Profile</h2>
      
      <div><img src =""></img></div>
      <Avatar src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" style={{width: "20%",height:"100%"}}/>
      <div>
        <p>{User.username} </p>
        <p>{User.About}</p>
        <div className='btndiv'>
        <button onClick={handleClick} > { User._id == user.user._id? "open to": "+ Connect"}</button>
        <button className='postBtn' onClick={()=>{
          navigate("/user/jobpostform");
        }}>Post Job Here</button>
        <button className='messenger' onClick={()=>{
          navigate("/user/messenger");
        }}>Messenger</button>
        </div>
        
      </div>
      
    </div>
    <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Education</h2>
      <div>
        <div>{User.Education}</div>
      </div>

      </div>
      <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Work Experience</h2>
      <div>
        <div>{User.workExperience}</div>
      </div>

      </div>
      <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Skills</h2>
      <div>
       <p>{User.Skills}</p>
      </div>
      </div>
    
    </div>
    
  );
};

const FriendsList = function AlignItemsList({props}) {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
   
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={props.username}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {props.workExperience}
                </Typography>
                {props.About}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" /> 
      </List>
    );
  }
export {Profile,FriendsList};
