import React, { useState, useRef } from "react";

const totLeagues = ["NHL", "NBA", "MLB", "NFL", "WNBAA", "CFL"];

const LeageSelect = () => {
  const [selectedLeague, setSelectedLeague] = useState("NHL");
  const containerRef = useRef(null);
  const buttonsPerPage = 4; // Number of buttons to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const handleLeagueSelect = (item) => {
    setSelectedLeague(item);
    console.log("Selected League:", item);
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

  

  return (
    <div className="league-select-container flex items-center space-x-4">
      <div className="scroll-left cursor-pointer" onClick={prevPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={39}
          height={38}
          viewBox="0 0 39 38"
          fill="none"
        >
          <path
            d="M22.6667 11.0834L14.75 19.0001L22.6667 26.9167"
            stroke="#737373"
            strokeWidth="3.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul
        className="league-list overflow-x-auto flex space-x-4"
        ref={containerRef}
      >
        {totLeagues.map((item) => (
          <li
            key={item}
            className={`text-white cursor-pointer text-base ${
              item === selectedLeague ? "league-selected" : ""
            }`}
            style={{
              textShadow: "0px 2px 4px rgba(255, 255, 255, 0.25)",
              color: item === selectedLeague ? "#C28602" : "white",
              borderBottom:
                item === selectedLeague ? "2px solid #C28602" : "none", // Add a bottom border for the selected league
              paddingBottom: item === selectedLeague ? "10px" : "0", // Add padding to the bottom border for spacing
              // boxShadow:
              //   item === selectedLeague
              //     ? "0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00"
              //     : "none",
            }}
            onClick={() => handleLeagueSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="scroll-right cursor-pointer" onClick={nextPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={39}
          height={38}
          viewBox="0 0 39 38"
          fill="none"
        >
          <path
            d="M16.3333 11.0834L24.25 19.0001L16.3333 26.9167"
            stroke="#A4A4A4"
            strokeWidth="3.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default LeageSelect;
