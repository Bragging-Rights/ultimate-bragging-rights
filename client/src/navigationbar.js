import React from "react";
import { Link } from "react-router-dom";

import "./NavigationBar.css"; // Import your custom CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
      {" "}
      {/* Added justify-content-center class */}
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/games">
              Games
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/results">
              Results
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/standings">
              Standings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/stats">
              Stats
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sportspools">
              Sports Pools
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/fbchallenge">
              FB Challenge
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/alltimerecords">
              All-Time Records
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
