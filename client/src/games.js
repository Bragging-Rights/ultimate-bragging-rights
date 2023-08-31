import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import banner from "../src/assets/banner_prediction.png";

const Games = () => {
  return (
    <div className="container-fluid">
      <img className="banner" src={banner} />{" "}
    </div>
  );
};

export default Games;
