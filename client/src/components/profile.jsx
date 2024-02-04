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
import CircularProgress from "@mui/material/CircularProgress";

import "../css/profile.css";

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

const ProfileInfo = ({ user }) => {
  console.log(user);
  const { isAuthenticated } = useContext(Context);
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

  const handleClick = async () => {
    try {
      const response = await axios.get(`/user/profile/${user._id}/connect`);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const Profile = (props) => {
  const [name, setName] = useState(null);
  const [about, setAbout] = useState(null);
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]); //array of objects
  const [workexp, setWorkexp] = useState([]);
  const [friends, setFriends] = useState([]);

  const [name_about_modal, setNameAboutModal] = useState(false);
  const [photo_modal, setPhotoModal] = useState(false);
  const [photo_loader_modal, setPhotoLoaderModal] = useState(false);

  const home = "http://localhost:3001";
  const [newUser, setNewAuthor] = useState({
    photo: "",
  });
  const handleOpen = () => setNameAboutModal(true);
  const handleClose = () => setNameAboutModal(false);
  const photoOpen = () => setPhotoModal(true);
  const photoClose = () => setPhotoModal(false);
  const photoLoaderOpen = () => setPhotoLoaderModal(true);
  const photoLoaderClose = () => setPhotoLoaderModal(false);

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

  useEffect(() => {
    console.log();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("user", props.user._id);

    const local = await axios.post(`${home}/in/add/`, formData);
    photoClose();
  };

  const handlePhoto = (e) => {
    setNewAuthor({ photo: e.target.files[0] });
  };

  return (
    <div>
      <div className="profile">
        <h2>Profile</h2>
        <Avatar
          style={{ width: "15%", height: "25%" }}
          src={`${props.user.photo}`}
          alt="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
        />
        <Button onClick={photoOpen}>Upload</Button>
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

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="photo"
                  onChange={handlePhoto}
                />

                <input type="submit" />
              </form>
            </div>
          </Box>
        </Modal>

        <div>
          <p>
            {" "}
            <h3>Name {props.user.name}</h3>
          </p>
          <p>Username {props.user.username}</p>
          <p>About - {props.user.about}</p>
          <Button onClick={handleOpen}>Update</Button>
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
                      onClick={() => updatePersonalInfo(props.user.username)}
                    >
                      Update
                    </button>
                  </form>
                </Typography>
              </div>
            </Box>
          </Modal>
        </div>
        <div> {props.user.email}</div>
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
