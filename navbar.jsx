import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          🚍 SafeTransit
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/feedback">
                Feedback
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/book">
                BOOK TICKETS
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin Login
              </NavLink>
            </li>

           

             <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                contact us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
