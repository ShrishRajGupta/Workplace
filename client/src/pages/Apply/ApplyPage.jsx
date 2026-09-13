import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { applyToPost, getPost } from "../../api/posts";
import { getErrorMessage } from "../../api/client";

// Apply to one job post (/user/applyform/:postId). Name and email are prefilled from the session.
const ApplyPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || user?.username || "",
    email: user?.email || "",
    phone: "",
    coverNote: "",
    resume: null,
  });

  useEffect(() => {
    let cancelled = false;
    getPost(postId)
      .then((data) => !cancelled && setPost(data))
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Could not load this job")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [postId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await applyToPost(postId, form);
      toast.success(`Application sent to ${post.companyName}`);
      navigate("/user/applications");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not send the application"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="page-status">Loading job…</p>;
  if (error || !post) return <p className="page-status" role="alert">{error || "Job not found"}</p>;

  const isOwnPost = String(post.user_id?._id ?? post.user_id) === String(user?._id);

  return (
    <main className="page">
      <div className="form-card">
        <p className="section-title">Apply</p>
        <h1>{post.jobTitle}</h1>
        <p>
          {post.companyName}
          {post.jobLocation ? ` · ${post.jobLocation}` : ""}
          {post.jobType ? ` · ${post.jobType}` : ""}
        </p>
        {isOwnPost ? (
          <p>
            This is your own post. <Link to={`/user/posts/${post._id}/applicants`}>See who applied</Link>.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Full name
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required maxLength={120} />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Phone (optional)
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} maxLength={40} />
            </label>
            <label>
              Resume (PDF or Word, up to 5 MB, optional)
              <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} />
            </label>
            <label>
              Cover note
              <textarea name="coverNote" value={form.coverNote} onChange={handleChange} maxLength={2000} placeholder="Why are you a good fit?" />
            </label>
            <button type="submit" disabled={saving}>
              {saving ? "Sending…" : "Send application"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ApplyPage;
