import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "./games.css"; // Import your custom CSS file
import NavigationBar from "./navigationbar";

import banner from "../assets/ad1.png";
import GamesBanner from "./GamesBanner/GamesBanner";

const Games = () => {
  return (
    <div className="container-fluid">
      <img className="banner" src={banner} />
      <GamesBanner/>
    </div>
  );
};

export default Games;
