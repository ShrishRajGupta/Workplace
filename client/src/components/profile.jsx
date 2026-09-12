import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { sendConnectionRequest, updateInfo, uploadPhoto } from "../api/users";
import { getErrorMessage } from "../api/client";
import { avatarUrl, onAvatarError } from "../utils/avatar";
import { Skills, WorkEx } from "./profile/userExp";
import CollegeDesc from "./profile/collegeDesc";
import "../css/profile.css";

export const modalStyle = {
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

// Profile card. `User` is the profile being viewed; `onUserUpdated(patch)` lets the parent
// merge edits into its copy (and the session user when it is the own profile).
const Profile = ({ User, onUserUpdated }) => {
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const isOwnProfile = me?._id === User._id;
  const alreadyConnected = Boolean(me?.friends?.some((id) => String(id) === String(User._id)));

  const [uploading, setUploading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const handleConnect = async () => {
    try {
      await sendConnectionRequest(User._id);
      setRequestSent(true);
      toast.success(`Connection request sent to ${User.username}`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not send the request"));
    }
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateInfo({ name, about });
      onUserUpdated({ name: data.name, about: data.about });
      setInfoModalOpen(false);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not update the profile"));
    }
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!photoFile) return;
    setUploading(true);
    try {
      const url = await uploadPhoto(photoFile);
      onUserUpdated({ photo: url });
      setPhotoModalOpen(false);
      toast.success("Photo updated");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not upload the photo"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="profile">
        <h2>Profile</h2>
        <img className="card-img-top" src={avatarUrl(User.photo)} alt="" onError={onAvatarError} />
        <br />
        {isOwnProfile && (
          <Button variant="contained" startIcon={<CloudUploadIcon />} color="success" onClick={() => setPhotoModalOpen(true)}>
            Upload
          </Button>
        )}

        <Modal open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} aria-labelledby="photo-modal-title">
          <Box sx={modalStyle}>
            <Typography id="photo-modal-title" variant="h6" component="h2">
              Profile photo
            </Typography>
            {uploading && <LoadingSpinner />}
            <form onSubmit={handlePhotoSubmit} encType="multipart/form-data">
              <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={(e) => setPhotoFile(e.target.files[0])} />
              <button type="submit" className="button-51" disabled={uploading || !photoFile}>
                Update
              </button>
            </form>
          </Box>
        </Modal>

        <div>
          <h3>Username {User.username}</h3>
          <p>Name {User.name}</p>
          <blockquote>
            <i>About -</i> {User.about}
          </blockquote>
          {isOwnProfile && (
            <Button color="secondary" onClick={() => setInfoModalOpen(true)}>
              Update
            </Button>
          )}

          <Modal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} aria-labelledby="info-modal-title">
            <Box sx={modalStyle}>
              <Typography id="info-modal-title" variant="h6" component="h2">
                Profile update
              </Typography>
              <form onSubmit={handleInfoSubmit}>
                <input type="text" placeholder="Name" defaultValue={User.name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="About" defaultValue={User.about} onChange={(e) => setAbout(e.target.value)} />
                <button className="button-36" type="submit">
                  Update
                </button>
              </form>
            </Box>
          </Modal>
        </div>
        <div>{User.email}</div>
      </div>

      <div className="btndiv">
        {!isOwnProfile && (
          <button onClick={handleConnect} disabled={alreadyConnected || requestSent}>
            {alreadyConnected ? "Connected" : requestSent ? "Request sent" : "+ Connect"}
          </button>
        )}
        {isOwnProfile && (
          <>
            <button className="postBtn" onClick={() => navigate("/user/jobpostform")}>
              Post Job Here
            </button>
            <button className="messenger" onClick={() => navigate("/user/messenger")}>
              Messenger
            </button>
          </>
        )}
      </div>

      <div className="education">
        <h2>Education</h2>
        <CollegeDesc entries={User.education} editable={isOwnProfile} onUserUpdated={onUserUpdated} />
      </div>
      <div className="workExp">
        <h2>Work Experience</h2>
        <WorkEx entries={User.workexperience} editable={isOwnProfile} onUserUpdated={onUserUpdated} />
      </div>
      <div className="skills">
        <h2>Skills</h2>
        <Skills entries={User.skills} editable={isOwnProfile} onUserUpdated={onUserUpdated} />
      </div>
    </div>
  );
};

export { Profile };
