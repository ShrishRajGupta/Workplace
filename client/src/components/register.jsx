import React, { useState } from 'react';
import axios from "axios";
const RegistrationForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle form submission
  const handleFormSubmit = async (e) => {
  
    e.preventDefault();
    
    try {
      const response = await axios.post("/user/register", formData);
  
      if (response.status === 200) {
        console.log(response);
        const data = response.data;
        console.log(data); // Handle the response as needed
      } else {
        // Handle registration errors
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default RegistrationForm;