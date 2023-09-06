import React, { useState, useEffect } from "react";
import { useMutation } from 'react-query';

import { Link } from "react-router-dom";
import logo from "../src/assets/logo.png";
import "./index.css"; // Import your custom CSS file
import "./navbar.css"; // Import your custom CSS file
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "./services/auth";

const Navbar = () => {
  const [selectedLeague, setSelectedLeague] = useState("PRO FOOTBALL");
  const [user,setUser] = useState({
    email:"",
    password:""
  });

  const inputChangeHandler = (e)=>{

    const {name,value} = e.target;
    setUser({
      ...user,
      [name]:value,
    })

  }

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (user) => login(JSON.stringify(user))
  );

const handleLogin = ()=>{
   mutate(user);
}

  const handleLeagueClick = (league) => {
    setSelectedLeague(league);
  };

  return (
    <nav
      className="navbar navbar-dark bg-dark d-flex justify-content-between gradient-custom custom-navbar navbar-expand-lg bg-body-tertiary col-md-4 col-lg-12"
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: "40px",
        zIndex: 1000,
      }}
    >
      <div
        className="row align-items-center justify-content-between"
        style={{
          width: "100%",
          // padding: "0 20px", // Adjust padding as needed
        }}
      >
        <div className="col-lg-4 align-items-center">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="logo"
              className="logo-img"
              style={{ width: "80px", height: "40px", marginRight: "10px" }}
            />
            <span
              style={{
                color: "#ffb300",
                textShadow:
                  "2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.3), 0px 0px 6px rgba(0, 0, 0, 0.5)",
                fontFamily: "Ubuntu",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              BRAGGING RIGHTS
            </span>
          </Link>
        </div>

        <div className="selectLeague dropdown-center col-lg-4">
          <label>Select League</label>
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedLeague || ""}{" "}
            {/* Conditionally render based on selectedLeague */}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleLeagueClick("PRO FOOTBALL")}
              >
                PRO FOOTBALL
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleLeagueClick("PRO HOCKEY")}
              >
                PRO HOCKEY
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleLeagueClick("PRO BASKETBALL")}
              >
                PRO BASKETBALL
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleLeagueClick("PRO BASEBALL")}
              >
                PRO BASEBALL
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() =>
                  handleLeagueClick("INTERNATIONAL ICE HOCKEY FEDERATION")
                }
              >
                INTERNATIONAL ICE HOCKEY FEDERATION
              </button>
            </li>
          </ul>
        </div>

        <div className="col-lg-4 display-inline d-flex align-items-center justify-content-end">
          <div className="d-flex align-items-center">
            <div className="form-outline me-2">
              <input
                type="email"
                id="form2Example1"
                name="email"
                onChange={inputChangeHandler}
                className="form-control custom-input"
                placeholder="Email"
              />
            </div>
            <div className="form-outline me-2">
              <input
                type="password"
                name="password"
                onChange={inputChangeHandler}
                className="form-control custom-input"
                placeholder="Password"
              />
            </div>
            <button type="button" className="btn btn-warning "
            style={{
              minWidth:"88px"
            }}
              onClick={handleLogin}
            >
              Sign in
            </button>
            <Link to="/signup" className="btn btn-warning"
               style={{
                minWidth:"88px"
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
