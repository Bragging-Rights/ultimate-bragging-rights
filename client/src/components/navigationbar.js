import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationBar.css"; // Import your custom CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient justify-content-center ">
      {" "}
      <div className="gradient-text ">
        <ul className="navbar-nav ">
          <li className="nav-item ">
            <NavLink className="nav-link" to="/" activeclassname="active-link">
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
    </nav>
  );
};

export default NavigationBar;
