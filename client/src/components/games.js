import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "./games.css"; // Import your custom CSS file
import NavigationBar from "./navigationbar";

import banner from "../assets/ad1.png";

const Games = () => {
  return (
    <div className="container-fluid">
      <img className="banner" src={banner} />
    </div>
  );
};

export default Games;
