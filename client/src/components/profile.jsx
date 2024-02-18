// Profile.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import {
  Avatar,
  Box,
  Button,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import {
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";

import "../css/profile.css";
import { Skills, WorkEx } from "./profile/userExp";
import CollegeDesc from "./profile/collegeDesc";
import { AuthContext } from "../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}


const Profile = ({User}) => {
  const home = "http://localhost:3001";
  const [isLoading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);

  const [name, setName] = useState(null);
  const [about, setAbout] = useState(null);
  const [newUser, setNewAuthor] = useState({
    photo: "",
  });

  // Modals -------------------------------
  const [name_about_modal, setNameAboutModal] = useState(false);
  const [photo_modal, setPhotoModal] = useState(false);

  // Toggle Functions ----------------------
  const handleOpen = () => setNameAboutModal(true);
  const handleClose = () => setNameAboutModal(false);
  const photoOpen = () => setPhotoModal(true);
  const photoClose = () => setPhotoModal(false);

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
 
  const updatePersonalInfo = (username) => {
    fetch(`${home}/in/update/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("user", User._id);

    const local = await axios.post(`${home}/in/add/`, formData);
    User.photo = local.data.url;
    setLoading(false);
    photoClose();
  };

  const handlePhoto = (e) => {
    setNewAuthor({ photo: e.target.files[0] });
  };
  // Add username to local storage
  localStorage.setItem("username", User.username);

  useEffect(() => { 
    console.log(User)
  }, []);
  return (
    <div className=" wrapper">
      <div className="profile">
        <h2>Profile</h2>
        <Avatar
          style={{ width: "50px", height: "75px" }}
          src={`${User.photo}`}
          alt="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
        />
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          color="success"
          onClick={photoOpen}
        >
          Upload
        </Button>
        <Modal
          open={photo_modal}
          onClose={photoClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Profile update
              </Typography>
              {isLoading ? <LoadingSpinner /> : null}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  onChange={handlePhoto}
                />

                <button
                  type="submit"
                  className="51"
                  role="button"
                  disabled={isLoading}
                >
                  Update
                </button>
              </form>
            </div>
          </Box>
        </Modal>

        <div>
          <p>
            {" "}
            <h3>Username {User.username}</h3>
          </p>
          <p>Name {User.name}</p>
          <blockquote>
            <i>About -</i> {User.about}
          </blockquote>
          <Button color="secondary" onClick={handleOpen}>
            Update
          </Button>
          <Modal
            open={name_about_modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Profile update
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="About"
                      onChange={(e) => setAbout(e.target.value)}
                    />
                    <button
                      className="button-36"
                      role="button"
                      onClick={() => updatePersonalInfo(User.username)}
                    >
                      Update
                    </button>
                  </form>
                </Typography>
              </div>
            </Box>
          </Modal>
        </div>
        <div> {User.email}</div>
      </div>
      <div>
        <div className='btndiv'>
        <button onClick={handleClick} > { User._id == user.user._id? "open to": "+ Connect"}</button>
        <button className='postBtn' onClick={()=>{
          navigate("/user/jobpostform");
        }}>Post Job Here</button>
        <button className='messenger' onClick={()=>{
          navigate("/user/messenger");
        }}>Messenger</button>
        </div></div>
      {/* --------------------------------------------- */}
      <div className="education">
        {/* Array of education */}
        <h2>Education</h2>
        <CollegeDesc props={User.education} />
      </div>
      {/* --------------------------------- */}
      <div className="flyby">
        {/* Array of work experience */}
        <h2>Work Experience</h2>
        <WorkEx props={User.workexperience} />
      </div>

      {/* --------------------------------- */}
      <div className="flyby">
        {/* array of skills */}
        <h2>Skills</h2>
        <Skills props={User.skills} />
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
