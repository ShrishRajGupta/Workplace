import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
    <>
      <div className="profile-card__section-head">
        <h2>Skills</h2>
        {editable && <button className="btn--ghost" onClick={() => setOpen(true)}>Add</button>}
      </div>
      {entries.length > 0 ? (
        <ul className="chip-list">
          {entries.map((skill) => (
            <li className="entry--chip" key={skill._id}>
              {skill.description}
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-note">{editable ? "Add the skills you want to be found for." : "Nothing added yet."}</p>
      )}

      <ModalBox open={open} onClose={() => setOpen(false)} title="Add a skill">
        <form className="dialog-form" onSubmit={handleAdd}>
          <input type="text" placeholder="Skill (e.g. React, SQL, product management)" required />
          <button type="submit">Add</button>
        </form>
      </ModalBox>
    </>
  );
};

export default SkillsSection;
