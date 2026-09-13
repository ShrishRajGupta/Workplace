import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
    <>
      <div className="profile-card__section-head">
        <h2>Work experience</h2>
        {editable && <button className="btn--ghost" onClick={() => setOpen(true)}>Add</button>}
      </div>
      {entries.length > 0 ? (
        <ul className="entry-list">
          {entries.map((work) => (
            <li className="entry" key={work._id}>
              <div>
                <p className="entry__title">{work.companyName}</p>
                {work.year && <p className="entry__meta">{work.year}</p>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-note">{editable ? "Add where you have worked." : "Nothing added yet."}</p>
      )}

      <ModalBox open={open} onClose={() => setOpen(false)} title="Add work experience">
        <form className="dialog-form" onSubmit={handleAdd}>
          <input type="text" placeholder="Company" required />
          <input type="text" placeholder="Years (e.g. 2022 – 2024)" />
          <button type="submit">Add</button>
        </form>
      </ModalBox>
    </>
  );
};

export default WorkExperienceSection;
