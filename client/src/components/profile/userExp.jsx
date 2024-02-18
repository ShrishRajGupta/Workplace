// Component of Skills and Work Ex

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../../css/profile.css";
import { Box, Button, Modal, Typography } from "@mui/material";

import { Delete as DeleteIcon } from "@mui/icons-material";
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
const home = "http://localhost:3001";
const Skills = ({ props }) => {
  const addSkills = async (e) => {
    e.preventDefault();
    const description = e.target[0].value;
    const username = localStorage.getItem("username");
    try {
      const response = await axios.post(`${home}/in/addSkills/${username}`, {
        description,
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="Skills">
        {props !== undefined &&
        typeof props !== "undefined" &&
        props.length > 0 ? (
          props.map((skill) => (
            <div className="flyby" key={skill._id}>
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <p>Desc = {skill.description}</p>
            </div>
          ))
        ) : (
          <h3>Empty</h3>
        )}
        <Button onClick={() => setOpen(true)}>Add</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Skills
            </Typography>
            <form onSubmit={addSkills}>
              <input type="text" placeholder="Description" />
              <button className="button-36" role="button" type="submit">
                Add
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

const WorkEx = ({ props }) => {
  const addWorkEx = async (e) => {
    e.preventDefault();
    const companyName = e.target[0].value;
    const year = e.target[1].value;
    const username = localStorage.getItem("username");
    try {
      const response = await axios.post(`${home}/in/addWorkEx/${username}`, {
        companyName,
        year,
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = useState(false);
  useEffect(() => {
  }, []);
  return (
    <>
      <div className="WorkEx">
        {props !== undefined &&
        typeof props !== "undefined" &&
        props.length > 0 ? (
          props.map((work) => (
            <div className="flyby" key={work._id}>
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <p>Company Name = {work.companyName}</p>
              <p>Year = {work.year}</p>
            </div>
          ))
        ) : (
          <h3>Empty</h3>
        )}
        <Button onClick={() => setOpen(true)}>Add</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Work Experience
            </Typography>
            <form onSubmit={addWorkEx}>
              <input type="text" placeholder="Company Name" />
              <input type="text" placeholder="Year" />
              <button className="button-36" role="button" type="submit">
                Add
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export { Skills, WorkEx };
