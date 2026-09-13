import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "../../features/profile/ProfileCard";
import PostCard from "../../features/jobs/PostCard";
import { useAuth } from "../../context/AuthContext";
import { getFriends, getUser } from "../../api/users";
import { getUserPosts } from "../../api/posts";
import { getErrorMessage } from "../../api/client";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import "./ProfilePage.css";

const FriendCard = ({ friend, onOpen }) => (
  <div className="friend-card">
    <img className="friend-photo" src={avatarUrl(friend.photo)} alt="" onError={onAvatarError} />
    <p className="friend-name" onClick={onOpen}>
      {friend.username}
    </p>
  </div>
);

// Profile page for any user (/user/profile/:userId). Own profile is editable.
const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: me, updateUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isOwnProfile = me?._id === userId;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([getUser(userId), getFriends(userId), getUserPosts(userId)])
      .then(([fetchedUser, fetchedFriends, fetchedPosts]) => {
        if (cancelled) return;
        setProfileUser(fetchedUser);
        setFriends(fetchedFriends);
        setPosts(fetchedPosts);
      })
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Could not load this profile")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Edits made on the profile card update this page and, for the own profile, the session user.
  const handleUserUpdated = (patch) => {
    setProfileUser((prev) => ({ ...prev, ...patch }));
    if (isOwnProfile) updateUser(patch);
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading profile…</p>;
  if (error || !profileUser) return <p style={{ padding: "1rem" }} role="alert">{error || "Profile not found"}</p>;

  return (
    <div className="parentdiv">
      <div className="profileSection">
        <ProfileCard User={profileUser} onUserUpdated={handleUserUpdated} />
      </div>
      <div className="activitySection">
        <div className="activitydiv">
          {isOwnProfile ? "Your Activity" : `${profileUser.username}'s posts`}
          <div>
            {posts.length === 0 ? (
              <div>No posts to show</div>
            ) : (
              posts.map((post) => (
                <PostCard key={post._id} post={post} applyTo={isOwnProfile ? undefined : `/user/applyform/${post._id}`} />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="friendSection">
        <h2>Friends</h2>
        {friends.length === 0 && <p>No connections yet.</p>}
        {friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} onOpen={() => navigate(`/user/profile/${friend._id}`)} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
