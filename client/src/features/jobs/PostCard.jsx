import { Link } from "react-router-dom";
import "./PostCard.css";

// One job post. Pass `applyTo` (a route) to show the Apply button.
const PostCard = ({ post, applyTo }) => (
  <div className="post-card">
    <div className="post-card__header">
      <p>JOB Title: {post.jobTitle}</p>
      {applyTo && (
        <Link to={applyTo}>
          <button className="apply-button">Apply Now</button>
        </Link>
      )}
    </div>
    <p>Company Name : {post.companyName}</p>
    <p>WorkPlace : {post.workPlace}</p>
    <p>Job Location : {post.jobLocation}</p>
    <p>Job Type : {post.jobType}</p>
    <p>Salary : {post.salary}</p>
  </div>
);

export default PostCard;
