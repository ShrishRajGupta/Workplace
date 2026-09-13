import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import './ApplyPage.css';

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submitting applications is not wired to the API yet.
    toast.error('Applications are not available yet.');
  };

  return (
    <main className="page">
      <div className="form-card">
        <h1>Apply for this job</h1>
        <p>Your details go straight to the employer.</p>
    <form className="apply-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fullName">Full name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="resume">Resume</label>
        <input
          type="file"
          id="resume"
          name="resume"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="coverLetter">Cover letter</label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Send application</button>
    </form>
      </div>
    </main>
  );
};

export default ApplyPage;
