import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
// import "jspdf-autotable";
import jsPDF from "jspdf";

export default function ResumeGenerator() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const previewRef = useRef(null);

  useEffect(() => {
    const generatePreview = async () => {
      const canvas = await html2canvas(previewRef.current!);
      setPreviewUrl(canvas.toDataURL("image/png"));
    };
    generatePreview();
  }, [name, email, phone, education, experience, skills]);

  const generatePdf = () => {
    // const element = document.getElementById('resume-preview');

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add the name field separately with custom styling
    doc.setFontSize(20);
    doc.text(name, 15, 20);
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(email, 15, 28);
    doc.text(phone, 15, 34);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Education", 15, 50);
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(education, 15, 58);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Experience", 15, 80);
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(experience, 15, 88);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Skills", 15, 110);
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(skills, 15, 118);

    // const imgData = previewUrl;
    // doc.addImage(imgData, "PNG", 130, 20, 60, 80);
    doc.save(`${name}-resume.pdf`);
  };

  const downloadPdf = () => {
    // Create a new jsPDF object
    generatePdf();
  };

  return (
    <div>
      <div ref={previewRef}>
        <h1 className="resume-name">{name}</h1>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <h2>Education</h2>
        <p>{education}</p> 
        <h2>Experience</h2>
        <p>{experience}</p>
        <h2>Skills</h2>
        <p>{skills}</p>
      </div>
      <br />
      <br />
      <button onClick={downloadPdf}>Download PDF</button>
      <br />
      <br />
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br />
      <label>
        Education:
        <textarea
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Experience:
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </label>
      <br />
      <label>
        Skills:
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </label>
      <br />
    </div>
  );
}
