import React, { useState } from "react";
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
import { LeagueProvider, useLeagueContext } from "../components/LeagueContext";
import Baseball from "./Leaderboard/Baseball"
import Basketball from "./Leaderboard/Basketball"
import Football from './Leaderboard/Football'
import Hockey from './Leaderboard/Hockey'

const Stats = () => {
  const [mainNavTab, setMainNavTab] = useState(0);
  const [cardNavTabs, setCardNavTabs] = useState([0, 0]);

  const changeMainNavTab = (val, event) => {
    event.preventDefault();
    setMainNavTab(val);
  };

  const changeCardNavTab = (val, index, event) => {
    event.preventDefault();
    setCardNavTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      newTabs[index] = val;
      return newTabs;
    });
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
      image: pf,
      text: "This is the content for card 1.",
    },
    {
      title: "Card Title 2",
      image: pf,
      text: "This is the content for card 2.",
    },
  ];
  const { selectedLeague } = useLeagueContext();

  return (
    <LeagueProvider>

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
          {[0, 1, 2].map((index) => (
            <li
              key={index}
              className={`li-stats ${mainNavTab === index ? "active" : ""}`}
              onClick={() => changeMainNavTab(index)}
              style={{ marginRight: "20px" }}
            >
              <a className="a-stats" href="#">
                {index === 0 ? "GAME" : index === 1 ? "TEAMS" : "Decide Later"}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <br />



      <div className="w-full">
     
     {selectedLeague === "NBA" && <Basketball />}
     {selectedLeague === "NFL" && <Football />}
     {selectedLeague === "NHL" && <Hockey />}
     {selectedLeague === "MLB" && <Baseball />}
   </div>









      <div className="container py-5 h-100">
        <div className="row">
          {cardContent.map((card, index) => (
            <div key={index} className="col col-lg-6 mb-4 mb-lg-0 card-line">
              <div
                className="card mb-3"
                style={{ borderRadius: "0.5rem", border: "#ffb800 solid" }}
              >
                <nav className="navbar-stats">
                  <ul className="ul-stats">
                    {[0, 1, 2].map((tabIndex) => (
                      <li
                        key={tabIndex}
                        className={`li-stats ${
                          cardNavTabs[index] === tabIndex ? "active" : ""
                        }`}
                        onClick={(event) =>
                          changeCardNavTab(tabIndex, index, event)
                        }
                        style={{ marginRight: "20px" }}
                      >
                        <button className="a-stats">
                          {tabIndex === 0
                            ? "TP"
                            : tabIndex === 1
                            ? "BR"
                            : "ASSISTS"}
                        </button>
                      </li>
                    ))}
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
                        src={card.image} // Image source from card object
                        alt="Avatar"
                        className="img-fluid my-5"
                        style={{ width: "80px", borderRadius: "50px" }}
                      />
                      <img
                        src={flag}
                        alt="Flag"
                        style={{
                          position: "absolute",
                          top: "6vh",
                          left: "-50px",
                          width: "70%", // Set width to 100%
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
          ))}
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
    </div>
    </LeagueProvider>

  );
};

export default Stats;
