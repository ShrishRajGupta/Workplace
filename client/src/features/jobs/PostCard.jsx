import { Link } from "react-router-dom";
import "./PostCard.css";

const formatSalary = (salary) =>
  salary === undefined || salary === null || salary === "" ? null : `₹${Number(salary).toLocaleString("en-IN")}`;

// One job post. Pass `applyTo` (a route) to show the Apply button.
const PostCard = ({ post, applyTo }) => {
  const salary = formatSalary(post.salary);
  return (
    <article className="post-card">
      <div className="post-card__header">
        <div>
          <h3 className="post-card__title">{post.jobTitle}</h3>
          <p className="post-card__company">{post.companyName}</p>
        </div>
        {applyTo && (
          <Link to={applyTo}>
            <button className="apply-button">Apply now</button>
          </Link>
        )}
      </div>
      <div className="post-card__meta">
        {post.jobType && <span>{post.jobType}</span>}
        {post.workPlace && <span>{post.workPlace}</span>}
        {post.jobLocation && <span>{post.jobLocation}</span>}
        {salary && <span className="post-card__salary">{salary}</span>}
      </div>
    </article>
  );
};

export default PostCard;
