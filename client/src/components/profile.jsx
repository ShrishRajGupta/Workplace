// Profile.js
import React, { useEffect, useState } from 'react';
import {Avatar} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import axios from "axios";

const Profile =  () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      let response = await axios.get("/user/profile");
      if (response.status === 200) {
        console.log(response.data.user);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    getUser();
  },[]);


  return (
    <div>
      
    <div className="profile">
      <h2>Profile</h2>
      
      <div><img src ={user.backgrndimg}></img></div>
      <Avatar src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" style={{width: "20%",height:"100%"}}/>
      <div>
        <p>{user.username} </p>
        <p>{user.About}</p>
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

const FriendsList = function AlignItemsList() {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <h2 style={{textAlign:'center'}}>Friends</h2>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    );
  }
export {Profile,FriendsList};
