import { useEffect, useState } from "react";
import { getMyPosts } from "../api/posts";
import { getErrorMessage } from "../api/client";

const PostCard = ({ post }) => (
  <div style={{ margin: "2px", border: "2px solid black" }}>
    <p>JobTitle : {post.jobTitle}</p>
    <p>CompanyName : {post.companyName}</p>
    <p>WorkPlace : {post.workPlace}</p>
    <p>JobLocation : {post.jobLocation}</p>
    <p>JobType : {post.jobType}</p>
    <p>Salary : {post.salary}</p>
  </div>
);

// The logged-in user's own job posts.
const Allposts = () => {
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

export default Allposts;
