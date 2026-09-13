import { useEffect, useState } from "react";
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
    <div>
      <h2>Your posts</h2>
      {loading && <p>Loading…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && posts.length === 0 && <p>You have not posted any jobs yet.</p>}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default MyPostsPage;
