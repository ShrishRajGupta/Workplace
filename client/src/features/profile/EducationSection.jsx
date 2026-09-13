import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ModalBox from "../../components/ModalBox/ModalBox";
import { addEducation } from "../../api/users";
import { getErrorMessage } from "../../api/client";

const EducationSection = ({ entries = [], editable, onUserUpdated }) => {
  const [open, setOpen] = useState(false);

  const handleAdd = async (e) => {
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

      <ModalBox open={open} onClose={() => setOpen(false)} title="Add College">
        <form onSubmit={handleAdd}>
          <input type="text" placeholder="College Name" required />
          <input type="text" placeholder="Degree" required />
          <input type="text" placeholder="Year" required />
          <button className="button-36" type="submit">
            Add
          </button>
        </form>
      </ModalBox>
    </>
  );
};

export default EducationSection;
