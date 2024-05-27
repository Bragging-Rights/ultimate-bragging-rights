import React, { useState, useEffect } from "react";
import { useLeagueContext } from "../LeagueContext";
import "./NightResult.css";
const { data, headers, headerOption } = require("./dump");

const headerOptions = {
  NHL: [
    //REGULAR SEASON
    "CO",
    "CITY PROV/STATE",
    "REP",
    "PLAYER",
    "R",
    "NPT",
    "GP",
    "W",
    "L",
    "APG",
    "W%",
    "BR",
    "ML",
    "SPRD",
    "1S",
    "1S 0",
    "Reg",
    "OT",
    "SO",
    "L1I",
    "CT",
    //PLAYOFFS
    // "CO",
    // "CITY PROV/STATE",
    // "REP",
    // "PLAYER",
    // "R",
    // "NPT",
    // "GP",
    // "W",
    // "L",
    // "APG",
    // "W%",
    // "BR",
    // "ML",
    // "SPRD",
    // "1S",
    // "1S 0",
    // "Reg",
    // "OT",
    // "L1I",
    // "CT"
  ],
  NBA: [
    "CO",
    "CITY PROV/STATE",
    "REP",
    "PLAYER",
    "R",
    "NPT",
    "GP",
    "W",
    "L",
    "APG",
    "W%",
    "BR",
    "ML",
    "SPRD",
    "1S",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg",
    "OT",
    "L10",
    "CT",
  ],
  MLB: [
    "CO",
    "CITY PROV/STATE",
    "REP",
    "PLAYER",
    "R",
    "NPT",
    "GP",
    "W",
    "L",
    "APG",
    "W%",
    "BR",
    "ML",
    "SPRD",
    "1S",
    "1S0",

    "Reg",
    "EI",
    "L10",
    "CT",
  ],
  NFL: [
    "CO",
    "CITY PROV/STATE",
    "REP",
    "PLAYER",
    "R",
    "NPT",
    "GP",
    "W",
    "L",
    "APG",
    "W%",
    "BR",
    "ML",
    "SPRD",
    "1S",
    "1S0",
    "2S0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg",
    "OT",
    "L10",
    "CT",
  ],
  WNBA: [
    // WNBA header options
  ],
  CFL: [
    // CFL header options
  ],
  NCAAF: [
    // NCAAF header options
  ],
  UFL: [
    // UFL header options
  ],
  NCCA: [
    // NCCA header options
  ],
  NCAAB: [
    // NCAAB header options
  ],
};

const NightResult = () => {
  const [showGames, setShowGames] = useState({
    game1: false,
    game2: false,
    game3: false,
    game4: false,
  });
  const { selectedLeague } = useLeagueContext();

  const [animationPaused, setAnimationPaused] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);

  useEffect(() => {
    if (selectedLeague && headerOptions[selectedLeague]) {
      setFilteredHeaderOptions(headerOptions[selectedLeague]);
    } else {
      setFilteredHeaderOptions([]); // Set empty array for consistency
    }
  }, [selectedLeague]);

  useEffect(() => {
    if (!animationPaused) {
      const delay = 1500; // 1.5 seconds
      const timeouts = [
        setTimeout(
          () => setShowGames((prevState) => ({ ...prevState, game1: true })),
          delay
        ),
        setTimeout(
          () => setShowGames((prevState) => ({ ...prevState, game2: true })),
          delay * 2
        ),
        setTimeout(
          () => setShowGames((prevState) => ({ ...prevState, game3: true })),
          delay * 3
        ),
        setTimeout(
          () => setShowGames((prevState) => ({ ...prevState, game4: true })),
          delay * 4
        ),
      ];

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    }
  }, [animationPaused]);

  const handleToggleAnimation = () => {
    setAnimationPaused(!animationPaused);
  };

  const handleSkipAnimation = () => {
    setShowGames({
      game1: true,
      game2: true,
      game3: true,
      game4: true,
    });
  };

  useEffect(() => {
    if (!animationPaused) {
      const newData = data.map((item) => ({
        ...item,
        br:
          (showGames.game1 ? item.game1 : 0) +
          (showGames.game2 ? item.game2 : 0) +
          (showGames.game3 ? item.game3 : 0) +
          (showGames.game4 ? item.game4 : 0),
      }));
      const sortedData = [...newData].sort((a, b) => b.br - a.br);

      // Assign position classes to sortedData
      sortedData.forEach((item, index) => {
        item.position = index + 1;
      });

      setSortedData(sortedData);
    }
  }, [showGames, animationPaused]);

  return (
    <div className="table-container">
      <div className="night-result-container">
        {/* <div className="animation-controls">
          <label htmlFor="animation-toggle" className="pause-label">
            Pause Animation :
          </label>
          <div className="toggle-container">
            <input
              type="checkbox"
              checked={animationPaused}
              onChange={handleToggleAnimation}
              id="animation-toggle"
            />
            <label htmlFor="animation-toggle" className="slider"></label>
          </div>
          <button onClick={handleSkipAnimation}>Skip Animation</button>
        </div>
        <br />
        <br /> */}

        <table style={{ width: "100%" }}>
          <thead style={{ fontSize: "0.8rem" }}>
            <tr>
              {/* {headerOption?.map((item, ind) => (
              <th
                key={ind}
                style={{
                  background:
                    "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  color: "#FEF098",
                }}
              ></th> */}
              {filteredHeaderOptions.map((item, ind) => (
                <th key={ind} className="text-xs font-medium">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.8rem" }}>
            <tr className="  bg-[#181818] text-white  separator">
              {/* {headers.map((header, index) => (
              <td key={index} className="header-cell">
                {header.split("\n").map((text, i) => (
                  <React.Fragment key={i}>
                    {text}
                    <br />
                  </React.Fragment>
                ))}
              </td>
            ))} */}
            </tr>
            {sortedData.map((item, index) => (
              <tr
                key={index}
                style={{ backgroundColor: item.backgroundColor }}
                className={`position-${item.position}`}
              >
                <td className="nr-state-rank">{item.city}</td>
                <td className="nr-player-tp-rank">{item.player}</td>
                <td className="nr-state-rank">{item.rank}</td>
                <td className="nr-player-tp-rank">{item.tp}</td>
                <td className="nr-player-tp-rank">{item.br}</td>
                <td className="nr-bg">
                  <span className="nr-svg-span">
                    <SvgIcon />
                  </span>
                </td>
                <td style={{ color: "white", padding: "4px", margin: "4px" }}>
                  {item.w}
                </td>
                <td style={{ color: "white", padding: "4px", margin: "4px" }}>
                  {item.l}
                </td>
                <td style={{ color: "white", padding: "4px", margin: "4px" }}>
                  {item.apg}
                </td>
                <td style={{ color: "white", padding: "4px", margin: "4px" }}>
                  {item.cs}
                </td>

                <td
                  className="nr-details"
                  style={{
                    opacity: showGames.game1 ? 1 : 0,
                    border: "2px solid white",
                    margin: "4px",
                  }}
                >
                  {showGames.game1 ? item.game1 : ""}
                </td>
                <td
                  className="nr-details-2"
                  style={{
                    opacity: showGames.game2 ? 1 : 0,
                    border: "2px solid #C1931B",
                    margin: "4px",
                  }}
                >
                  {showGames.game2 ? item.game2 : ""}
                </td>
                <td
                  className="nr-details-3"
                  style={{
                    opacity: showGames.game3 ? 1 : 0,
                    border: "2px solid white",
                    margin: "4px",
                    background: "red",
                  }}
                >
                  {showGames.game3 ? item.game3 : ""}
                </td>
                <td
                  className="nr-details-4"
                  style={{
                    opacity: showGames.game4 ? 1 : 0,
                    border: "2px solid white",
                    margin: "4px",
                  }}
                >
                  {showGames.game4 ? item.game4 : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SvgIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={39}
    height={39}
    viewBox="0 0 39 39"
    fill="none"
  >
    <circle
      cx="19.1313"
      cy="19.1875"
      r="14.2617"
      stroke="black"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.8853 16.0181L17.5467 22.3566L14.3774 19.1873"
      stroke="black"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NightResult;
