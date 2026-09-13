import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ModalBox from "../../components/ModalBox/ModalBox";
import { useAuth } from "../../context/AuthContext";
import { sendConnectionRequest, updateInfo, uploadPhoto } from "../../api/users";
import { getErrorMessage } from "../../api/client";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import EducationSection from "./EducationSection";
import WorkExperienceSection from "./WorkExperienceSection";
import SkillsSection from "./SkillsSection";
import "./ProfileCard.css";

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="loading-spinner" />
  </div>
);

// Profile card. `User` is the profile being viewed; `onUserUpdated(patch)` lets the parent
// merge edits into its copy (and the session user when it is the own profile).
const ProfileCard = ({ User, onUserUpdated }) => {
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const isOwnProfile = me?._id === User._id;
  const alreadyConnected = Boolean(me?.friends?.some((id) => String(id) === String(User._id)));

  const [uploading, setUploading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [name, setName] = useState(User.name || "");
  const [about, setAbout] = useState(User.about || "");
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
    <div className="profile-card">
      <section className="profile-card__panel profile-card__identity">
        <img className="profile-card__avatar" src={avatarUrl(User.photo)} alt="" onError={onAvatarError} />
        <h1 className="profile-card__name">{User.name || User.username}</h1>
        <p className="profile-card__handle">@{User.username}</p>
        {User.about ? <p className="profile-card__about">{User.about}</p> : isOwnProfile && <p className="profile-card__about text-muted">Add a short bio so people know what you do.</p>}
        <p className="profile-card__email">{User.email}</p>

        <div className="profile-card__actions">
          {isOwnProfile ? (
            <>
              <button onClick={() => setInfoModalOpen(true)}>Edit profile</button>
              <button className="btn--ghost" onClick={() => setPhotoModalOpen(true)}>Change photo</button>
              <button className="btn--ghost" onClick={() => navigate("/user/jobpostform")}>Post a job</button>
              <button className="btn--ghost" onClick={() => navigate("/user/messenger")}>Messages</button>
            </>
          ) : (
            <button onClick={handleConnect} disabled={alreadyConnected || requestSent}>
              {alreadyConnected ? "Connected" : requestSent ? "Request sent" : "+ Connect"}
            </button>
          )}
        </div>
      </section>

      <ModalBox open={infoModalOpen} onClose={() => setInfoModalOpen(false)} title="Edit profile">
        <form className="dialog-form" onSubmit={handleInfoSubmit}>
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
          </label>
          <label>
            About
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} maxLength={500} />
          </label>
          <button type="submit">Save</button>
        </form>
      </ModalBox>

      <ModalBox open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} title="Change photo">
        {uploading && <LoadingSpinner />}
        <form className="dialog-form" onSubmit={handlePhotoSubmit} encType="multipart/form-data">
          <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={(e) => setPhotoFile(e.target.files[0])} />
          <button type="submit" disabled={uploading || !photoFile}>
            Upload
          </button>
        </form>
      </ModalBox>

      <section className="profile-card__panel">
        <EducationSection entries={User.education} editable={isOwnProfile} onUserUpdated={onUserUpdated} />
      </section>
      <section className="profile-card__panel">
        <WorkExperienceSection entries={User.workexperience} editable={isOwnProfile} onUserUpdated={onUserUpdated} />
      </section>
      <section className="profile-card__panel">
        <SkillsSection entries={User.skills} editable={isOwnProfile} onUserUpdated={onUserUpdated} />
      </section>
    </div>
  );
};

export default ProfileCard;
