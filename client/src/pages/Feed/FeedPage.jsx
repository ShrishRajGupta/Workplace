import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UserSummaryCard from "../../features/profile/UserSummaryCard";
import PostCard from "../../features/jobs/PostCard";
import { useAuth } from "../../context/AuthContext";
import { getAllPosts } from "../../api/posts";
import { respondToRequest } from "../../api/users";
import { getErrorMessage } from "../../api/client";
import "./FeedPage.css";

const FriendRequest = ({ request, onAnswered }) => {
  const [busy, setBusy] = useState(false);

  const answer = async (action) => {
    setBusy(true);
    try {
      const updatedUser = await respondToRequest({ from: request.from, to: request.to, requestId: request._id, action });
      onAnswered(updatedUser);
      toast.success(action === "Accept" ? `You are now connected with ${request.username}` : "Request declined");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not update the request"));
      setBusy(false);
    }
  };

  return (
    <div className="request-card">
      <p>
        <strong>{request.username}</strong> wants to connect with you.
      </p>
      <div className="request-card__actions">
        <button onClick={() => answer("Accept")} disabled={busy}>Accept</button>
        <button className="btn--ghost" onClick={() => answer("Reject")} disabled={busy}>Decline</button>
      </div>
    </div>
  );
};

// Logged-in home: profile summary, pending connection requests, latest jobs.
const FeedPage = () => {
  const { user, updateUser, refreshUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Requests may have arrived since login; refresh the session user when the feed opens.
  useEffect(() => {
    refreshUser().catch(() => {});
  }, [refreshUser]);

  useEffect(() => {
    let cancelled = false;
    getAllPosts()
      .then((data) => !cancelled && setPosts(data))
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Could not load posts")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const requests = user?.friendRequests ?? [];

  return (
    <main className="page feed">
      <aside>
        <UserSummaryCard />
      </aside>
      <div className="feed__main">
        {requests.length > 0 && (
          <section className="feed__section">
            <h2>Connection requests</h2>
            <div className="feed__list">
              {requests.map((request) => (
                <FriendRequest key={request._id} request={request} onAnswered={updateUser} />
              ))}
            </div>
          </section>
        )}
        <section className="feed__section">
          <h2>Latest jobs</h2>
          {loading && <p className="text-muted">Loading…</p>}
          {error && <p role="alert">{error}</p>}
          {!loading && !error && posts.length === 0 && <p className="text-muted">No jobs posted yet.</p>}
          <div className="feed__list">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} applyTo={post.user_id === user?._id ? undefined : `/user/applyform/${post._id}`} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default FeedPage;
