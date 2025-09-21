import React from "react";

const FeedbackDetails = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Transport Safety Feedback</h1>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Bus Route 42 Safety Concern</h3>
          <p className="text-muted">Location: Central Station • Reported 2 hours ago</p>
          <p>Reported overcrowding during peak hours.</p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">
            Metro Platform Issue <span className="badge bg-success">Resolved</span>
          </h3>
          <p className="text-muted">Location: Downtown Metro • Reported 4 hours ago</p>
          <p>Slippery platform resolved with anti-slip coating.</p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">
            Bus Stop Lighting <span className="badge bg-warning text-dark">Pending</span>
          </h3>
          <p className="text-muted">Location: Park Avenue Stop • Reported 1 day ago</p>
          <p>Poor lighting reported at evening hours.</p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">
            Train Safety Upgrade <span className="badge bg-success">Resolved</span>
          </h3>
          <p className="text-muted">Location: North Terminal • Reported 2 days ago</p>
          <p>Emergency communication system updated.</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
