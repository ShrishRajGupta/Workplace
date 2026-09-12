import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { addEducation } from "../../api/users";
import { getErrorMessage } from "../../api/client";
import { modalStyle } from "../profile";
import "../../css/profile.css";

const CollegeDesc = ({ entries = [], editable, onUserUpdated }) => {
  const [open, setOpen] = useState(false);

  const addCollege = async (e) => {
    e.preventDefault();
    const [collegeName, degree, year] = Array.from(e.target.elements, (el) => el.value);
    try {
      const education = await addEducation({ collegeName, degree, year });
      onUserUpdated({ education });
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not add the college"));
    }
  };

  return (
    <>
      <div className="College">
        {entries.length > 0 ? (
          entries.map((edu) => (
            <div key={edu._id}>
              <p>College = {edu.collegeName}</p>
              <p>Degree = {edu.degree}</p>
              <p>Year = {edu.year}</p>
              {editable && (
                <Button variant="outlined" startIcon={<DeleteIcon />} disabled title="Coming soon">
                  Delete
                </Button>
              )}
            </div>
          ))
        ) : (
          <h3>Empty</h3>
        )}
      </div>
      {editable && <Button onClick={() => setOpen(true)}>Add</Button>}

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="add-college-title">
        <Box sx={modalStyle}>
          <Typography variant="h6" id="add-college-title" component="h2">
            Add College
          </Typography>
          <form onSubmit={addCollege}>
            <input type="text" placeholder="College Name" required />
            <input type="text" placeholder="Degree" required />
            <input type="text" placeholder="Year" required />
            <button className="button-36" type="submit">
              Add
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CollegeDesc;
