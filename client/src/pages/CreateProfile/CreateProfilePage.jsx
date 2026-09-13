import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createProfile } from "../../api/users";
import { getErrorMessage } from "../../api/client";

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ about: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const user = await createProfile(formData);
      updateUser(user);
      navigate(`/user/profile/${user._id}`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save profile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <p>Tell others a little about yourself. Education, work experience and skills can be added from your profile page.</p>
      <form onSubmit={handleSubmit}>
        <label>
          About:
          <input type="text" name="about" value={formData.about} onChange={handleInputChange} maxLength={500} />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateProfilePage;
