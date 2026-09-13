import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ModalBox from "../../components/ModalBox/ModalBox";
import { addWorkExperience } from "../../api/users";
import { getErrorMessage } from "../../api/client";

const WorkExperienceSection = ({ entries = [], editable, onUserUpdated }) => {
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
            {editable && (
              <Button variant="outlined" startIcon={<DeleteIcon />} disabled title="Coming soon">
                Delete
              </Button>
            )}
            <p>Company Name = {work.companyName}</p>
            <p>Year = {work.year}</p>
          </div>
        ))
      ) : (
        <h3>Empty</h3>
      )}
      {editable && <Button onClick={() => setOpen(true)}>Add</Button>}

      <ModalBox open={open} onClose={() => setOpen(false)} title="Add Work Experience">
        <form onSubmit={handleAdd}>
          <input type="text" placeholder="Company Name" required />
          <input type="text" placeholder="Year" />
          <button className="button-36" type="submit">
            Add
          </button>
        </form>
      </ModalBox>
    </div>
  );
};

export default WorkExperienceSection;
