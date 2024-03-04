import React, { useState, useEffect } from "react";
import MainNavBar from "../components/MainNavBar";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import HeroSection from "../components/HeroSection";
import Line from "../components/Line";
import Banner from "../components/Banner";
import img1 from "../assets/card.png";
import img2 from "../assets/card2.png";
import pf from "../assets/pf.png";
import flag from "../assets/download.png";

const Stats = () => {
  const [mainNavTab, setMainNavTab] = React.useState(0);
  const [cardNavTab, setCardNavTab] = React.useState(0);
  const [cardWinTab, setCardWinTab] = React.useState(0);
  const [cardMLTab, setCardMLTab] = React.useState(0);
  const [cardFTab, setCardFTab] = React.useState(0);

  const changeMainNavTab = (val, event) => {
    event.preventDefault();
    setMainNavTab(val);
  };

  const changeCardNavTab = (val, event) => {
    event.preventDefault();
    setCardNavTab(val);
  };

  const changeCardWinTab = (val, event) => {
    event.preventDefault();
    setCardWinTab(val);
  };

  const changeCardMLTab = (val, event) => {
    event.preventDefault();
    setCardMLTab(val);
  };

  const changeCardFTab = (val, event) => {
    event.preventDefault();
    setCardFTab(val);
  };
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  const cardContent = [
    {
      title: "Card Title 1",
      image: img1,
      text: "This is the content for card 1.",
    },
    {
      title: "Card Title 2",
      image: img2,
      text: "This is the content for card 2.",
    },
  ];

  return (
    <div className="w-full">
      <HeroSection />

      <MainNavBar
        currentTab={mainNavTab}
        changeTab={changeMainNavTab}
        style={{ marginBottom: "20px" }}
      />
      <Line />

      <Banner date={formattedDate} label={"Game Breakdowns"} />

      <Line />
      <nav className="navbar-stats">
        <ul className="ul-stats">
          <li
            className={`li-stats ${mainNavTab === 0 ? "active" : ""}`}
            onClick={() => changeMainNavTab(0)}
            style={{ marginRight: "20px" }}
          >
            <a className="a-stats" href="#">
              GAME
            </a>
          </li>
          <li
            className={`li-stats ${mainNavTab === 1 ? "active" : ""}`}
            onClick={() => changeMainNavTab(1)}
            style={{ marginRight: "20px" }}
          >
            <a className="a-stats" href="#">
              TEAMS
            </a>
          </li>
          <li
            className={`li-stats ${mainNavTab === 2 ? "active" : ""}`}
            onClick={() => changeMainNavTab(2)}
          >
            <a className="a-stats" href="#">
              Decide Later
            </a>
          </li>
        </ul>
      </nav>
      <br />

      <div className="container py-5 h-100">
        <div className="row ">
          <div className="col col-lg-6 mb-4 mb-lg-0 card-line">
            <div
              className="card mb-3"
              style={{ borderRadius: "0.5rem", border: "#ffb800 solid" }}
            >
               <nav className="navbar-stats">
        <ul className="ul-stats">
          <li
            className={`li-stats ${cardNavTab === 0 ? "active" : ""}`}
            onClick={(event) => changeCardNavTab(0, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">TP</button>
          </li>
          <li
            className={`li-stats ${cardNavTab === 1 ? "active" : ""}`}
            onClick={(event) => changeCardNavTab(1, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">BR</button>
          </li>
          <li
            className={`li-stats ${cardNavTab === 2 ? "active" : ""}`}
            onClick={(event) => changeCardNavTab(2, event)}
          >
            <button className="a-stats">ASSISTS</button>
          </li>
        </ul>
      </nav>
              <div className="row">
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
                  <div className="points-stat">
                  <h5>Points</h5>
                  <h4>153</h4>

                  </div>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8 card-data">
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
          <div className="col col-lg-6 mb-4 mb-lg-0 card-line">
            <div
              className="card mb-3"
              style={{ borderRadius: "0.5rem", border: "#ffb800 solid" }}
            >
               <nav className="navbar-stats">
        <ul className="ul-stats">
          <li
            className={`li-stats ${cardWinTab === 0 ? "active" : ""}`}
            onClick={(event) => changeCardWinTab(0, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">Win %</button>
          </li>
          <li
            className={`li-stats ${cardWinTab === 1 ? "active" : ""}`}
            onClick={(event) => changeCardWinTab(1, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">W</button>
          </li>
          <li
            className={`li-stats ${cardWinTab === 2 ? "active" : ""}`}
            onClick={(event) => changeCardWinTab(2, event)}
          >
            <button className="a-stats">L</button>
          </li>
        </ul>
      </nav>
              <div className="row">
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
                     <div className="points-stat">
                  <h5>Points</h5>
                  <h4>153</h4>

                  </div>
                  
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8 card-data">
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
                  </ul>
                  <div style={{ color: "#2CDD14" }}>All Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8 my-4">
        <div>
          <img src={img1} alt="img1" className="w-full" />
        </div>
        <div>
          <img src={img2} alt="img2" className="w-full" />
        </div>
      </div>
      <div className="container py-5 h-100">
        <div className="row ">
          <div className="col col-lg-6 mb-4 mb-lg-0 card-line">
            <div
              className="card mb-3"
              style={{ borderRadius: "0.5rem", border: "#ffb800 solid" }}
            >
             <nav className="navbar-stats">
        <ul className="ul-stats">
          <li
            className={`li-stats ${cardMLTab === 0 ? "active" : ""}`}
            onClick={(event) => changeCardMLTab(0, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">ML</button>
          </li>
          <li
            className={`li-stats ${cardMLTab === 1 ? "active" : ""}`}
            onClick={(event) => changeCardMLTab(1, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">SPRD</button>
          </li>
          <li
            className={`li-stats ${cardMLTab === 2 ? "active" : ""}`}
            onClick={(event) => changeCardMLTab(2, event)}
          >
            <button className="a-stats">O/U</button>
          </li>
        </ul>
      </nav>
              <div className="row">
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
                     <div className="points-stat">
                  <h5>Points</h5>
                  <h4>153</h4>

                  </div>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8 card-data">
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
          <div className="col col-lg-6 mb-4 mb-lg-0 card-line">
            <div
              className="card mb-3"
              style={{ borderRadius: "0.5rem", border: "#ffb800 solid" }}
            >
              <nav className="navbar-stats">
        <ul className="ul-stats">
          <li
            className={`li-stats ${cardFTab === 0 ? "active" : ""}`}
            onClick={(event) => changeCardFTab(0, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">F</button>
          </li>
          <li
            className={`li-stats ${cardFTab === 1 ? "active" : ""}`}
            onClick={(event) => changeCardFTab(1, event)}
            style={{ marginRight: "20px" }}
          >
            <button className="a-stats">UD</button>
          </li>
          <li
            className={`li-stats ${cardFTab === 2 ? "active" : ""}`}
            onClick={(event) => changeCardFTab(2, event)}
          >
            <button className="a-stats">ASSISTS</button>
          </li>
        </ul>
      </nav>
              <div className="row">
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
                     <div className="points-stat">
                  <h5>Points</h5>
                  <h4>153</h4>

                  </div>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8 card-data">
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

export default Stats;
