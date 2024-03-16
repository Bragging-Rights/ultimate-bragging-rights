import React, { useState, useEffect } from "react";
import flag from "../assets/download.png";
import "./stats.css";

const CardStats = () => {
  const [cardNavTab, setCardNavTab] = useState(0);

  const changeCardNavTab = (val) => {
    setCardNavTab(val);
  };

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div
              className="card mb-3"
              style={{ borderRadius: "1rem", border: "#ffb800 solid" }}
            >
              <nav className="navbar-stats">
                <ul className="ul-stats">
                  <li
                    className={`li-stats ${cardNavTab === 0 ? "active" : ""}`}
                    onClick={() => changeCardNavTab(0)}
                    style={{ marginRight: "20px" }}
                  >
                    <a className="a-stats" href="#">
                      TP
                    </a>
                  </li>
                  <li
                    className={`li-stats ${cardNavTab === 1 ? "active" : ""}`}
                    onClick={() => changeCardNavTab(1)}
                    style={{ marginRight: "20px" }}
                  >
                    <a className="a-stats" href="#">
                      BR
                    </a>
                  </li>
                  <li
                    className={`li-stats ${cardNavTab === 2 ? "active" : ""}`}
                    onClick={() => changeCardNavTab(2)}
                  >
                    <a className="a-stats" href="#">
                      ASSISTS
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "160px",
                    }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <img
                      src={flag}
                      alt="Flag"
                      style={{
                        position: "absolute",
                        top: "6vh",
                        left: "-70px",
                        width: "100%", // Set width to 100%
                        objectFit: "cover",
                        zIndex: -1,
                      }}
                    />
                  </div>

                  <h5>Marie Horwitz</h5>
                  <p>Web Designer</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <ul style={{ color: "#fff" }}>
                    <li
                      style={{
                        color: "#2CDD14",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <strong>Connor McDavid</strong>
                      <span>153</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Leon Draisaitl</span>
                      <span>128</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>David Pastrnak</span>
                      <span>113</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>David Pastrnak</span>
                      <span>113</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>David Pastrnak</span>
                      <span>113</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>David Pastrnak</span>
                      <span>113</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>David Pastrnak</span>
                      <span>113</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>David Pastrnak</span>
                      <span>113</span>
                    </li>
                  </ul>
                  <div style={{ color: "#2CDD14" }}>All Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
