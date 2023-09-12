import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "./games.css"; // Import your custom CSS file
import { useLeagueContext } from "../services/LeagueContext";

import banner from "../assets/ad1.png";

const Games = () => {
  const { selectedLeague, gameData } = useLeagueContext();

  return (
    <div className="container-fluid">
      <img className="banner" src={banner} />
    </div>
  );
};

export default Games;
