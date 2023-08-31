import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import banner_results from "../src/assets/banner_result.png";

const Results = () => {
  return (
    <div className="container-fluid">
      <img className="banner_results" src={banner_results} />{" "}
    </div>
  );
};

export default Results;
