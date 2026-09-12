// Skills and Work Experience sections of the profile card
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { addSkill, addWorkExperience } from "../../api/users";
import { getErrorMessage } from "../../api/client";
import { modalStyle } from "../profile";
import "../../css/profile.css";

const DeleteButton = () => (
  <Button variant="outlined" startIcon={<DeleteIcon />} disabled title="Coming soon">
    Delete
  </Button>
);

const Skills = ({ entries = [], editable, onUserUpdated }) => {
  const [open, setOpen] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const description = e.target.elements[0].value;
    try {
      const skills = await addSkill({ description });
      onUserUpdated({ skills });
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not add the skill"));
    }
  };

  return (
    <div className="Skills">
      {entries.length > 0 ? (
        entries.map((skill) => (
          <div className="flyby" key={skill._id}>
            {editable && <DeleteButton />}
            <p>Desc = {skill.description}</p>
          </div>
        ))
      ) : (
        <h3>Empty</h3>
      )}
      {editable && <Button onClick={() => setOpen(true)}>Add</Button>}

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="add-skill-title">
        <Box sx={modalStyle}>
          <Typography id="add-skill-title" variant="h6" component="h2">
            Add Skills
          </Typography>
          <form onSubmit={handleAdd}>
            <input type="text" placeholder="Description" required />
            <button className="button-36" type="submit">
              Add
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const WorkEx = ({ entries = [], editable, onUserUpdated }) => {
  const [open, setOpen] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const [companyName, year] = Array.from(e.target.elements, (el) => el.value);
    try {
      const workexperience = await addWorkExperience({ companyName, year });
      onUserUpdated({ workexperience });
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not add the work experience"));
    }
  };

  return (
    <div className="WorkEx">
      {entries.length > 0 ? (
        entries.map((work) => (
          <div className="flyby" key={work._id}>
            {editable && <DeleteButton />}
            <p>Company Name = {work.companyName}</p>
            <p>Year = {work.year}</p>
          </div>
        ))
      ) : (
        <h3>Empty</h3>
      )}
      {editable && <Button onClick={() => setOpen(true)}>Add</Button>}

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="add-work-title">
        <Box sx={modalStyle}>
          <Typography id="add-work-title" variant="h6" component="h2">
            Add Work Experience
          </Typography>
          <form onSubmit={handleAdd}>
            <input type="text" placeholder="Company Name" required />
            <input type="text" placeholder="Year" />
            <button className="button-36" type="submit">
              Add
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export { Skills, WorkEx };
