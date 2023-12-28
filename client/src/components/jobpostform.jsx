import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/JobForm.css";
const JobForm = () => {
  // State to hold form data
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    workPlace: '',
    jobLocation: '',
    jobType: '',
    salary: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("/user/jobpostform",formData);
      if(response.status == 200){
        console.log(response.data);
        navigate('/user/allposts');
      }
    }
    catch(err){
      console.log(err);
    }
   
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
      </label>

      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
      </label>

      <label>
        Workplace:
        <input
          type="text"
          name="workPlace"
          value={formData.workPlace}
          onChange={handleChange}
        />
      </label>

      <label>
        Job Location:
        <input
          type="text"
          name="jobLocation"
          value={formData.jobLocation}
          onChange={handleChange}
        />
      </label>

      <label>
        Job Type:
        <input
          type="text"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
        />
      </label>

      <label>
        Salary:
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default JobForm;

