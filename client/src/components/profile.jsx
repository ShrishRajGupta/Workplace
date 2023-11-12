// Profile.js
import React from 'react';
import {Avatar} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

const Profile = (user) => {
  return (
    <div>

    <div className="profile">
      <h2>Profile</h2>
      <div><img src ={user.backgrndimg}></img></div>
      <Avatar src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" style={{width: "20%",height:"100%"}}/>
      <div>
        <p>{user.name} Abhishek Yadav</p>
        <p>{user.about} Nothing</p>
      </div>
      
      <div> {user.workexperience}</div>
      <div> {user.skills}</div>
    </div>
    <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Education</h2>
      <div>
        <p>College Name</p>
        <p>Degree</p>
        <p>Year</p>
      </div>

      </div>
      <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Work Experience</h2>
      <div>
        <p>Company Name</p>
        <p>Year</p>
      </div>

      </div>
      <div className="education">
      {/* <div> {user.education}</div> */}
      <h2>Skills</h2>
      <div>
        <p>College Name</p>
        <p>Degree</p>
        <p>Year</p>
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
