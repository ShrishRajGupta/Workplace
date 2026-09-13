import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getApplicants } from "../../api/posts";
import { getErrorMessage } from "../../api/client";
import { avatarUrl, onAvatarError } from "../../utils/avatar";
import "../Applications/ApplicationsPage.css";

const formatDate = (value) => new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

// Applicants for one of the logged-in user's posts (/user/posts/:postId/applicants).
const ApplicantsPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getApplicants(postId)
      .then((data) => {
        if (cancelled) return;
        setPost(data.post);
        setApplications(data.applications);
      })
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Could not load applicants")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (loading) return <p className="page-status">Loading applicants…</p>;
  if (error || !post) return <p className="page-status" role="alert">{error || "Post not found"}</p>;

  return (
    <main className="page applications">
      <p className="section-title">Applicants</p>
      <h1>{post.jobTitle}</h1>
      <p className="text-muted" style={{ marginBottom: "var(--wp-space-4)" }}>
        {post.companyName} · {applications.length} {applications.length === 1 ? "application" : "applications"}
      </p>
      {applications.length === 0 && <p className="text-muted">No one has applied yet.</p>}
      <div className="applications__list">
        {applications.map((application) => (
          <article className="application-card" key={application._id}>
            <div>
              <div className="application-card__applicant">
                <img src={avatarUrl(application.applicant?.photo)} alt="" onError={onAvatarError} />
                <div>
                  <p className="application-card__title">{application.fullName}</p>
                  <p className="application-card__meta">
                    {application.applicant ? (
                      <Link to={`/user/profile/${application.applicant._id}`}>@{application.applicant.username}</Link>
                    ) : (
                      "Account removed"
                    )}
                    {` · Applied ${formatDate(application.createdAt)}`}
                  </p>
                </div>
              </div>
              {application.coverNote && <p className="application-card__note">{application.coverNote}</p>}
              <p className="application-card__links">
                <a href={`mailto:${application.email}`}>{application.email}</a>
                {application.phone && <a href={`tel:${application.phone}`}>{application.phone}</a>}
                {application.resumeUrl && (
                  <a href={application.resumeUrl} target="_blank" rel="noreferrer">
                    Resume
                  </a>
                )}
              </p>
            </div>
            <span className={`status-chip status-chip--${application.status}`}>{application.status}</span>
          </article>
        ))}
      </div>
    </main>
  );
};

export default ApplicantsPage;
