import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const MyForm = () => {
  // State variables for form fields
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [formData,setFormData] = useState({
        username:"",
        About:"",
        Education:"",
        workExperience:"",
        Skills:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
   
        e.preventDefault();
        
        try {
          // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
          const response = await axios.post('/user/createProfile',formData);
          // Handle the response as needed
          console.log(response);
          if(response.status == 200){
            console.log(response.data);
            const userId = response.data.user._id;
            console.log(userId);
            navigate(`/user/profile/${userId}`);
          }
        } catch (error) {
          // Handle errors
          console.log('Error making post request:', error);
        }
        
      };
  return (
    <div>
    <h1>Create Profile</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name='username'
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>

      <label>
        About:
        <input
            type='text'
            name='About'
          value={formData.About}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Education:
        <input
          type="text"
          name='Education'
          value={formData.Education}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Work Experience:
        <input
          type="text"
          name='workExperience'
          value={formData.workExperience}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Skills:
        <input
          type="text"
          name='Skills'
          value={formData.Skills}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default MyForm;
