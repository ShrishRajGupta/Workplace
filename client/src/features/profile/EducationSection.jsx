import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
      <div className="profile-card__section-head">
        <h2>Education</h2>
        {editable && <button className="btn--ghost" onClick={() => setOpen(true)}>Add</button>}
      </div>
      {entries.length > 0 ? (
        <ul className="entry-list">
          {entries.map((edu) => (
            <li className="entry" key={edu._id}>
              <div>
                <p className="entry__title">{edu.collegeName}</p>
                <p className="entry__meta">{[edu.degree, edu.year].filter(Boolean).join(" · ")}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-note">{editable ? "Add where you studied." : "Nothing added yet."}</p>
      )}

      <ModalBox open={open} onClose={() => setOpen(false)} title="Add education">
        <form className="dialog-form" onSubmit={handleAdd}>
          <input type="text" placeholder="College or university" required />
          <input type="text" placeholder="Degree" required />
          <input type="text" placeholder="Year" required />
          <button type="submit">Add</button>
        </form>
      </ModalBox>
    </>
  );
};

export default EducationSection;
