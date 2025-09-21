import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const JobApplication = ({ jobTitle }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Application submitted:", { ...form, jobTitle });
  //   alert(`Application submitted successfully for ${jobTitle}!`);
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/apply", {  // ✅ backend URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, jobTitle }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Application submitted successfully!");
    } else {
      alert("❌ Failed: " + data.message);
    }
  } catch (error) {
    console.error("Error submitting:", error);
    alert("❌ Error submitting application");
  }
};



  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title text-center text-primary mb-4">
            Apply for {jobTitle}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Write a brief cover letter"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Resume Link</label>
              <input
                type="text"
                name="resume"
                value={form.resume}
                onChange={handleChange}
                className="form-control"
                placeholder="Google Drive / Dropbox link"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
