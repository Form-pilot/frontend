// src/ResumeGenerator.js

import React, { useState } from "react";
import axios from "axios";

const ResumeGenerator = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateResume = async () => {
    // Convert multi-line input to a single-line string with newline characters escaped
    const formattedResume = resume.replace(/(\r\n|\n|\r)/gm, "\\n");
    const formattedJobDescription = jobDescription.replace(/(\r\n|\n|\r)/gm, "\\n");

    try {
      const response = await axios.get("http://localhost:8000/generate-latex-resume-save", {
        params: {
          resume: formattedResume,
          job_description: formattedJobDescription,
        },
      });
      if (response.status === 200) {
        setMessage("Resume generation successful! The resume has been saved to your Google Drive.");
      } else {
        setMessage("Failed to generate the resume. Please try again.");
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      setMessage("An error occurred while generating the resume.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate Tailored LaTeX Resume</h2>
      <textarea
        placeholder="Enter your resume text here"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={5}
        cols={50}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <textarea
        placeholder="Enter the job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={5}
        cols={50}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button onClick={handleGenerateResume} style={{ padding: "10px 20px" }}>
        Generate Resume
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResumeGenerator;