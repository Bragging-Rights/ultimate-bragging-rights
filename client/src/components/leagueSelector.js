import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./leagueSelector.css";
import { useLeagueContext } from "../services/LeagueContext";
import logo from "../assets/logo2.png";
import arrow from "../assets/polygon1.png";

const LeagueSelector = () => {
  const { selectedLeague, setSelectedLeague } = useLeagueContext();
  const [newLeagueName, setNewLeagueName] = useState(""); // Track the new league name
  const [isAddingLeague, setIsAddingLeague] = useState(false); // Track if adding a league is in progress
  const [leagueButtons, setLeagueButtons] = useState([
    "NHL",
    "NBA",
    "MLB",
    "NFL",
    "WNBAA",
    "CFL",
  ]);
  const buttonsPerPage = 4; // Number of buttons to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const handleLeagueClick = (league) => {
    setSelectedLeague(league);
    console.log("Selected League:", league);
  };

  const nextPage = () => {
    if (currentPage < leagueButtons.length / buttonsPerPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startButtonIndex = currentPage * buttonsPerPage;
  const endButtonIndex = startButtonIndex + buttonsPerPage;
  const visibleButtons = leagueButtons.slice(startButtonIndex, endButtonIndex);

  const openAddLeague = () => {
    setIsAddingLeague(true);
  };

  const closeAddLeague = () => {
    setIsAddingLeague(false);
    setNewLeagueName(""); // Clear the input field
  };

  const addLeague = () => {
    if (newLeagueName.trim() !== "") {
      setLeagueButtons([...leagueButtons, newLeagueName]);
      closeAddLeague(); // Close the input field after adding
    }
  };

  useEffect(() => {
    // You can add your data fetching logic here using Axios or any other method
    // Example:
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://your-api-url.com/leagues/${selectedLeague}`
    //     );
    //     // Process the response data here
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, [selectedLeague]);

  return (
    <div className="league-selector">
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          alt="logo"
          className="logo-img"
          style={{ width: "80px", height: "40px", marginRight: "10px" }}
        />
      </Link>

      <div className="buttons">
        <button className="arrow-button" onClick={prevPage}>
          &lt; {/* Left arrow */}
        </button>
        <div className="league-buttons">
          {visibleButtons.map((league) => (
            <button
              key={league}
              className={`league-button ${
                selectedLeague === league ? "active" : ""
              }`}
              onClick={() => handleLeagueClick(league)}
            >
              {league}
              {selectedLeague === league && (
                <div className="selected-indicator">
                  <img src={arrow} alt="Selected" />
                </div>
              )}
            </button>
          ))}
        </div>
        <button className="arrow-button" onClick={nextPage}>
          &gt; {/* Right arrow */}
        </button>
      </div>

      <div className="button-container">
        <div
          className="custom-button add-league"
          onClick={() => openAddLeague()}
          style={{ display: isAddingLeague ? "none" : "block" }}
        >
          <div
            className="button-text"
            style={{
              color: "black",
              textAlign: "center",
              lineHeight: "33px",
            }}
          >
            Add League
          </div>
        </div>
        {isAddingLeague && (
          <div className="add-league-input">
            <input
              type="text"
              placeholder="Enter a new league"
              value={newLeagueName}
              onChange={(e) => setNewLeagueName(e.target.value)}
            />
            <button onClick={addLeague}>Add</button>
            <button onClick={closeAddLeague}>Cancel</button>
          </div>
        )}
        <Link to="/signup" className="custom-button register">
          <div className="button-text">Register</div>
        </Link>
      </div>
    </div>
  );
};

export default LeagueSelector;
