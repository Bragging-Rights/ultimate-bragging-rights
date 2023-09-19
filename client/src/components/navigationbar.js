import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css"; // Import your custom CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="navigator justify-content-center align-items-center">
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
        <div className="gradient-text collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mb-1 mb-md-0">
              <NavLink
                className="nav-link"
                to="/"
                activeClassName="active-link"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/games"
                activeclassname="selected"
              >
                Games
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/results"
                activeclassname="selected"
              >
                Results
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/standings"
                activeclassname="selected"
              >
                Standings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/stats"
                activeclassname="selected"
              >
                Stats
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/sportspools"
                activeclassname="selected"
              >
                Sports Pools
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/fbchallenge"
                activeclassname="selected"
              >
                FB Challenge
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/alltimerecords"
                activeclassname="selected"
              >
                All-Time Records
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
