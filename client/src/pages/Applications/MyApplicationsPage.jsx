import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../../api/posts";
import { getErrorMessage } from "../../api/client";
import "./ApplicationsPage.css";

const formatDate = (value) => new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

// Jobs the logged-in user has applied to (/user/applications).
const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getMyApplications()
      .then((data) => !cancelled && setApplications(data))
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Could not load your applications")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page applications">
      <h1>Your applications</h1>
      {loading && <p className="text-muted">Loading…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && applications.length === 0 && (
        <p className="text-muted">
          You have not applied to any jobs yet. <Link to="/home">Browse the latest jobs</Link>.
        </p>
      )}
      <div className="applications__list">
        {applications.map((application) => (
          <article className="application-card" key={application._id}>
            <div>
              <p className="application-card__title">{application.post?.jobTitle ?? "Job no longer available"}</p>
              <p className="application-card__meta">
                {[application.post?.companyName, application.post?.jobLocation, `Applied ${formatDate(application.createdAt)}`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {application.coverNote && <p className="application-card__note">{application.coverNote}</p>}
              {application.resumeUrl && (
                <p className="application-card__links">
                  <a href={application.resumeUrl} target="_blank" rel="noreferrer">
                    Resume you sent
                  </a>
                </p>
              )}
            </div>
            <span className={`status-chip status-chip--${application.status}`}>{application.status}</span>
          </article>
        ))}
      </div>
    </main>
  );
};

export default MyApplicationsPage;
