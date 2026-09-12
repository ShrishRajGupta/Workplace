import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { avatarUrl, onAvatarError } from "../utils/avatar";
import "../css/widget.css";

// Sidebar card for the logged-in user. Reads from the auth context; no extra request needed.
const UserWidget = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="widgetdiv">
      <div className="card">
        <img className="card-img-top" src={avatarUrl(user.photo)} alt="" onError={onAvatarError} />
        <div className="card-body">
          <span onClick={() => navigate(`/user/profile/${user._id}`)} style={{ cursor: "pointer" }}>
            <h5>{user.username}</h5>
          </span>
          {user.name && <p className="card-text">{user.name}</p>}
          <p className="card-text">{user.about || "No bio yet. Add one from your profile."}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Connections: {user.friends?.length ?? 0}</li>
          <li className="list-group-item">Skills: {user.skills?.length ?? 0}</li>
          <li className="list-group-item">Posts: {user.posts?.length ?? 0}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserWidget;
