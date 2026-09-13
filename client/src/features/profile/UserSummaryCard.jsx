import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import "./UserSummaryCard.css";

// Sidebar card for the logged-in user. Reads from the auth context; no extra request needed.
const UserSummaryCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="summary-card">
      <div className="summary-card__cover" />
      <img className="summary-card__avatar" src={avatarUrl(user.photo)} alt="" onError={onAvatarError} />
      <div className="summary-card__body">
        <p className="summary-card__name" onClick={() => navigate(`/user/profile/${user._id}`)}>
          {user.name || user.username}
        </p>
        <p className="summary-card__about">{user.about || "No bio yet. Add one from your profile."}</p>
      </div>
      <ul className="summary-card__stats">
        <li>
          <strong>{user.friends?.length ?? 0}</strong>
          <span>Connections</span>
        </li>
        <li>
          <strong>{user.skills?.length ?? 0}</strong>
          <span>Skills</span>
        </li>
        <li>
          <strong>{user.posts?.length ?? 0}</strong>
          <span>Posts</span>
        </li>
      </ul>
    </div>
  );
};

export default UserSummaryCard;
