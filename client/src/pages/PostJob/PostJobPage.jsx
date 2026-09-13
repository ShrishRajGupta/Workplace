import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/posts";
import { getErrorMessage } from "../../api/client";

const EMPTY_FORM = { jobTitle: "", companyName: "", workPlace: "", jobLocation: "", jobType: "", salary: "" };

const PostJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createPost(formData);
      toast.success("Job posted");
      navigate("/user/allposts");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create the post"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page">
      <div className="form-card">
        <h1>Post a job</h1>
        <p>Describe the role. It appears on the feed for every member.</p>
    <form onSubmit={handleSubmit}>
      <label>
        Job title
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
      </label>
      <label>
        Company
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
      </label>
      <label>
        Workplace (e.g. Remote, Hybrid, On-site)
        <input type="text" name="workPlace" value={formData.workPlace} onChange={handleChange} />
      </label>
      <label>
        Location
        <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} />
      </label>
      <label>
        Job type (e.g. Full-time, Contract)
        <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} />
      </label>
      <label>
        Salary (per year)
        <input type="number" min="0" name="salary" value={formData.salary} onChange={handleChange} />
      </label>
      <button type="submit" disabled={saving}>
        {saving ? "Posting…" : "Publish job"}
      </button>
    </form>
      </div>
    </main>
  );
};

export default PostJobPage;
