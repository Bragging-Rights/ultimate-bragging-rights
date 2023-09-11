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
            <NavLink className="nav-link" to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/games"
              activeClassName="selected"
            >
              Games
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/results"
              activeClassName="selected"
            >
              Results
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/standings"
              activeClassName="selected"
            >
              Standings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/stats"
              activeClassName="selected"
            >
              Stats
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/sportspools"
              activeClassName="selected"
            >
              Sports Pools
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/fbchallenge"
              activeClassName="selected"
            >
              FB Challenge
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/alltimerecords"
              activeClassName="selected"
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
