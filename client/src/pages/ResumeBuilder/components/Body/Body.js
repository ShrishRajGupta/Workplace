import React, { useEffect, useRef, useState } from "react";
import { getResume, saveResume } from "../../../../api/users";
import logger from "../../../../utils/logger";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
const sections = {
  basicInfo: "Basic Info",
  workExp: "Work Experience",
  project: "Projects",
  education: "Education",
  achievement: "Achievements",
  summary: "Summary",
  other: "Other",
};

const SAVE_DEBOUNCE_MS = 800;

function Body() {
  const resumeRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const lastSavedRef = useRef("");
  const initialInformationRef = useRef(null);

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  // Captured on the first render so the load effect can compare against the untouched defaults.
  if (initialInformationRef.current === null) initialInformationRef.current = resumeInformation;

  // Load the saved resume once; then save changes after a short pause in editing.
  useEffect(() => {
    let cancelled = false;
    getResume()
      .then((saved) => {
        if (cancelled) return;
        if (saved?.information) setResumeInformation(saved.information);
        if (saved?.color) setActiveColor(saved.color);
        // Nothing saved yet: treat the defaults as the saved state so we only save after an edit.
        lastSavedRef.current = JSON.stringify({
          information: saved?.information ?? initialInformationRef.current,
          color: saved?.color ?? colors[0],
        });
      })
      .catch((err) => logger.error("Could not load the saved resume:", err))
      .finally(() => !cancelled && setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return undefined;
    const payload = { information: resumeInformation, color: activeColor };
    const serialised = JSON.stringify(payload);
    if (serialised === lastSavedRef.current) return undefined;
    setSaveState("saving");
    const timer = setTimeout(() => {
      saveResume(payload)
        .then(() => {
          lastSavedRef.current = serialised;
          setSaveState("saved");
        })
        .catch((err) => {
          logger.error("Could not save the resume:", err);
          setSaveState("error");
        });
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [resumeInformation, activeColor, loaded]);

  const saveLabel = { idle: "", saving: "Saving…", saved: "Saved", error: "Not saved" }[saveState];

  return (
    <div className={styles.container}>
      <p className={styles.heading}>
        Resume Builder
        {saveLabel && <span className={styles.saveState}>{saveLabel}</span>}
      </p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
      </div>
      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;
