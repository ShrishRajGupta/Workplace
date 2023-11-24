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
import { Context } from '..';
const Profile =  ({user}) => {
    console.log(user);
    const {isAuthenticated} = useContext(Context);
    const navigate = useNavigate();
  // const getUser = async () => {
  //   try {
  //     let response = await axios.get("/user/profile");
  //     if (response.status === 200) {
  //       console.log(response.data.user);
  //       setUser(response.data.user);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user:', error);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // },[]);
    const handleClick = async ()=>{
          try{
            const response = await axios.get(`/user/profile/${user._id}/connect`);
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
        <p>{user.username} </p>
        <p>{user.About}</p>
        <div className='btndiv'>
        <button onClick={handleClick} > {isAuthenticated ? "open to": "+ Connect"}</button>
        <button className='postBtn' onClick={()=>{
          navigate("/user/jobpostform");
        }}>Post Job Here</button>
        </div>
        
      </div>
      
    </div>
    <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Education</h2>
      <div>
        <div>{user.Education}</div>
      </div>

      </div>
      <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Work Experience</h2>
      <div>
        <div>{user.workExperience}</div>
      </div>

      </div>
      <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Skills</h2>
      <div>
       <p>{user.Skills}</p>
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
