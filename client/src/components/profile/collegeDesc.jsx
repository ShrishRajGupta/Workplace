
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../../css/profile.css"
import {
    Box,
    Button,
    Modal,
    Typography,
  } from "@mui/material";

import {
    Delete as DeleteIcon,
  } from "@mui/icons-material";
  
const home = "http://localhost:3001";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const CollegeDesc = ({props,User,user})=>{
    const addCollege = async (e) => {
        e.preventDefault();
        const collegeName = e.target[0].value;
        const degree = e.target[1].value;
        const year = e.target[2].value;
        const username = localStorage.getItem("username");
        try {
          const response = await axios.post(`${home}/in/addCollege/${username}`, {
            collegeName,
            degree,
            year
          });
          if (response.status === 200) {
            console.log(response.data);
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
        }
        const [open, setOpen] = useState(false);
    
    return(
        <>
        <div className="College">
        {props !== undefined && typeof props !== 'undefined' && props.length > 0  ? (
            props.map((edu) => (
            <div key={edu._id}>
                <p>College = {edu.collegeName}</p>
                <p>Degree = {edu.degree}</p>
                <p>Year = {edu.year}</p>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
                </Button>

            </div>
            
            ))
        ) : (
            <h3>Empty</h3>
        )}
        </div>
        {
          User._id !== user.user._id?"":<Button onClick={()=>setOpen(true)}>Add</Button>
        }
        
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography variant="h6" id="modal-modal-title" component="h2">
            Add College
            </Typography>
            <form onSubmit={addCollege}>
            <input type="text" placeholder="College Name" required />
            <input type="text" placeholder="Degree" required />
            <input type="text" placeholder="Year" required />
            <button className="button-36" role="button" type="submit">
                Add
              </button>
            </form>
        </Box>
        </Modal>
        </>
    )
};

export default CollegeDesc;
  