import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OpenPositions = () => {
  // ✅ Jobs data (can later come from backend API)
  const jobs = [
    {
      title: "Transport Safety Analyst",
      description:
        "Responsible for monitoring bus and train safety reports, analyzing risk data, and preparing actionable insights to improve passenger safety.",
      location: "Central Transport Office",
      type: "Full-time",
    },
    {
      title: "Metro Safety Coordinator",
      description:
        "Work with metro authorities to ensure platforms, escalators, and emergency systems meet safety standards. Conduct regular safety drills.",
      location: "Downtown Metro Station",
      type: "Contract",
    },
    {
      title: "Bus Stop Safety Officer",
      description:
        "Focus on improving safety around bus stops including lighting, surveillance, and passenger crowd management during peak hours.",
      location: "Park Avenue Bus Stop",
      type: "Part-time",
    },
    {
      title: "Emergency Response Coordinator",
      description:
        "Ensure rapid response to incidents in bus, train, and metro systems. Train staff in evacuation and first aid protocols.",
      location: "North Terminal",
      type: "Full-time",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        🚦 Open Positions in Public Transport Safety
      </h2>

      <div className="row">
        {jobs.map((job, index) => (
          <div className="col-md-6" key={index}>
            <div className="card shadow-lg mb-4 border-0">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">{job.description}</p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Type:</strong> {job.type}
                </p>

                {/* ✅ Dynamic Apply Now link */}
                <Link to={`/apply/${encodeURIComponent(job.title)}`}>
                  <button className="btn btn-success">Apply Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenPositions;
