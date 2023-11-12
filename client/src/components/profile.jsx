// Profile.js
import React from "react";
import { Avatar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const Profile = (props) => {
  const [name, setName] = useState(null);
  const [backgrndimg, setBackgrndimg] = useState(null);
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]); //array of objects
  const [workexp, setWorkexp] = useState([]);
  const [friends, setFriends] = useState([]);
  const home = "http://localhost:3001";

  const updatePersonalInfo = (id) => {
    fetch(`${home}/in/update/${id}/personel`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        backgrndimg,
        about,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setData(data);
      });
  };

  return (
    <div>
      <div className="profile">
        <h2>Profile</h2>
        <div>
          {/* <img src={user.backgrndimg}></img> */}
        </div>
        <Avatar
          style={{ width: "10%", height: "100%" }}
          src={props.user.backgrndimg}
          alt="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
        />
        <div>
          <p>{props.user.name}</p>
          <p>About - {props.user.about}</p>
        </div>

        <div> {props.user.email}</div>
      </div>
      <div className="profile">
        <label>Update Name</label>
        <input
          type="text"
          placeholder="Add a Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          />
          <label>Update About</label>
        <input
          type="text"
          placeholder="Add a about"
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
        <label>Update Background Image</label>
        <input
          type="file"
          placeholder="Add a Background img"
          name="myImage"
          accept="image/x-png, image/jpeg"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setBackgrndimg(e.target.files[0]);
          }}
        />
        <button onClick={()=> updatePersonalInfo(props.user.username)}> Add + </button>
      </div>

      {/* --------------------------------------------- */}
      <div className="education">
        {/* <div> {user.education}</div> */}
        {/* Array of education */}
        <h2>Education{props.education}</h2>
        <div>
          <p>Collge Name </p>
          <p>Degree</p>
          <p>Year</p>
        </div>
      </div>
      {/* --------------------------------- */}
      <div className="education">
        {/* Array of work experience */}
        <h2>Work Experience</h2>
        <div>
          <p>Company Name</p>
          <p>Year</p>
        </div>
      </div>

      {/* --------------------------------- */}
      <div className="education">
        {/* <div> {user.education}</div> */}
        {/* array of skills */}
        <h2>Skills</h2>
        <div>
          <p>Collge Name</p>
          <p>Degree</p>
          <p>Year</p>
        </div>
      </div>
    </div>
  );
};

const FriendsList = function AlignItemsList() {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <h2 style={{ textAlign: "center" }}>Friends</h2>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
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
                sx={{ display: "inline" }}
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
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {" — Do you have Paris recommendations? Have you ever…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
};
export { Profile, FriendsList };
