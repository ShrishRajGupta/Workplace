import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPosts } from "../../api/posts";
import { getErrorMessage } from "../../api/client";
import PostCard from "../../features/jobs/PostCard";

// The logged-in user's own job posts.
const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getMyPosts()
      .then((data) => !cancelled && setPosts(data))
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Could not load your posts")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page my-posts">
      <h1>Your job posts</h1>
      {loading && <p className="text-muted">Loading…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && posts.length === 0 && <p className="text-muted">You have not posted any jobs yet.</p>}
      <div className="my-posts__list">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} footer={<Link to={`/user/posts/${post._id}/applicants`}>View applicants</Link>} />
        ))}
      </div>
    </main>
  );
};

export default MyPostsPage;
