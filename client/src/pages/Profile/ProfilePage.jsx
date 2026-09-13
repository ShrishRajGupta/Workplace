import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileCard from "../../features/profile/ProfileCard";
import PostCard from "../../features/jobs/PostCard";
import { useAuth } from "../../context/AuthContext";
import { getFriends, getUser } from "../../api/users";
import { getUserPosts } from "../../api/posts";
import { getErrorMessage } from "../../api/client";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import "./ProfilePage.css";

const FriendCard = ({ friend, onOpen }) => (
  <div className="friend-card" onClick={onOpen} role="link" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen()}>
    <img className="friend-photo" src={avatarUrl(friend.photo)} alt="" onError={onAvatarError} />
    <span className="friend-name">{friend.username}</span>
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

  if (loading) return <p className="page-status">Loading profile…</p>;
  if (error || !profileUser) return <p className="page-status" role="alert">{error || "Profile not found"}</p>;

  return (
    <main className="page profile-page">
      <ProfileCard User={profileUser} onUserUpdated={handleUserUpdated} />

      <section className="profile-page__section">
        <h2>{isOwnProfile ? "Your job posts" : `${profileUser.username}'s job posts`}</h2>
        {posts.length === 0 ? (
          <p className="text-muted">No posts to show.</p>
        ) : (
          <div className="profile-page__list">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                applyTo={isOwnProfile ? undefined : `/user/applyform/${post._id}`}
                footer={isOwnProfile ? <Link to={`/user/posts/${post._id}/applicants`}>View applicants</Link> : undefined}
              />
            ))}
          </div>
        )}
      </section>

      <section className="profile-page__section">
        <h2>Connections</h2>
        {friends.length === 0 && <p className="text-muted">No connections yet.</p>}
        <div className="profile-page__list">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} onOpen={() => navigate(`/user/profile/${friend._id}`)} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
