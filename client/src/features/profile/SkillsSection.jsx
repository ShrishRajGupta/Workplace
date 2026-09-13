import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ModalBox from "../../components/ModalBox/ModalBox";
import { addSkill } from "../../api/users";
import { getErrorMessage } from "../../api/client";

const SkillsSection = ({ entries = [], editable, onUserUpdated }) => {
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
            {editable && (
              <Button variant="outlined" startIcon={<DeleteIcon />} disabled title="Coming soon">
                Delete
              </Button>
            )}
            <p>Desc = {skill.description}</p>
          </div>
        ))
      ) : (
        <h3>Empty</h3>
      )}
      {editable && <Button onClick={() => setOpen(true)}>Add</Button>}

      <ModalBox open={open} onClose={() => setOpen(false)} title="Add Skills">
        <form onSubmit={handleAdd}>
          <input type="text" placeholder="Description" required />
          <button className="button-36" type="submit">
            Add
          </button>
        </form>
      </ModalBox>
    </div>
  );
};

export default SkillsSection;
