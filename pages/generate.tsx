import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "jspdf-autotable";
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
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${name}-resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      include: [
        './generate.css', // path to your separate CSS file
      ],
    };
    html2pdf().set(opt).from(element).save();
  };

  const downloadPdf = () => {
    // Create a new jsPDF object
    const doc = new jsPDF();

    // Add the user's name and contact information to the PDF
    doc.text(name, 10, 10);
    doc.text(email, 10, 20);
    doc.text(phone, 10, 30);

    // Add the user's education section to the PDF
    doc.text("Education:", 10, 50);
    doc.text(education, 10, 60);

    // Add the user's experience section to the PDF
    doc.text("Experience:", 10, 80);
    doc.text(experience, 10, 90);

    // Add the user's skills section to the PDF
    doc.text("Skills:", 10, 110);
    doc.text(skills, 10, 120);

    // Save the PDF with the user's name as the filename
    doc.save(`${name}_resume.pdf`);
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
