import React from "react";
import "./home.css";
import videoBG from "../assets/3People_watchGoal.mp4";
import video from "../assets/ComparingScores .mp4";
import third from "../assets/thirdcontainerimg.png";
import logo from "../assets/logo.png";
import table from "../assets/fifthcontainerimg.png";
import timeshadow from "../assets/TIME shadow.png";
import abstract from "../assets/abstract05.png";
import logosmall from "../assets/BRCircleTrophyLogoo.png";
import stats from "../assets/StatsBadgeMaster.png";
import star from "../assets/star.png";
import mainLogo from "../assets/BR-LogoCenterBlack.png";

const Home = () => {
  return (
    <div className="full-screen-div">
      <div className="homepage col-md-4 col-lg-12 gradient-custom-home">
        <div className="main">
          <video className="video" src={videoBG} autoPlay loop muted />
          <div className="content">
            <p>
              WE GIVE <span style={{ color: "#ffb300" }}>SPORTS FANS</span>{" "}
              SOMETHING THEY <span style={{ color: "#ffb300" }}>NEVER HAD</span>{" "}
              BEFORE!
            </p>

            <div className="content-bottom">
              <h3>
                <span style={{ color: "#ffb300" }}>ATHLETES HAVE STATS</span>
              </h3>
              <h3>
                <span style={{ color: "#ffb300" }}>TEAMS HAVE STATS</span>
              </h3>
              <h1>WHY NOT FANS?</h1>
              <div
                className="barone"
                style={{ margin: "20px", color: "#ffb300" }}
              ></div>
              <br />
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        {/* <div
          className="bar1"
          style={{ margin: "20px", color: "#ffb300" }}
        ></div> */}

        <div className="container-fluid col-md-4 col-lg-12">
          <div className="text-heading">
            <h1>
              IMAGINE KEEPING <span style={{ color: "#ffb300" }}>TRACK </span>{" "}
              <br></br>
              OF <span style={{ color: "#ffb300" }}>ALL </span>YOUR{" "}
              <span style={{ color: "#ffb300" }}>PREDICTIONS </span>{" "}
            </h1>
            <br></br>
            <div className="secondcontainerimg">
              <img src={require("../assets/secondcontainerimg.png")} alt="" />
            </div>
            <br></br>
            <h1>
              AND <span style={{ color: "#ffb300" }}>CONVERTING</span> THEM{" "}
              <span style={{ color: "#ffb300" }}>INTO STATS</span>
              <div
                className="bar"
                style={{ margin: "20px", color: "#ffb300" }}
              ></div>
            </h1>
          </div>
        </div>
        <br></br>

        <div className="container-fluid3 col-md-4 col-lg-12">
          <video className="video" src={video} autoPlay loop muted />
          <div className="content1">
            <p>
              <span style={{ color: "#ffb300", textsize: "x-small" }}>
                BASEBALL - HOCKEY - BASKETBALL - FOOTBALL
              </span>
            </p>
            <br></br>
            <h1>
              <span style={{ color: "#ffb300", textsize: "x-small" }}>
                BRAGGING RIGHTS
              </span>
            </h1>
            <br></br>
            <div className="border-box">
              <br></br>
              <h2>
                <span style={{ color: "white", textsize: "x-small" }}>
                  THE OFFICIAL DATABASE OF SPORTS PREDICTONS{" "}
                </span>
              </h2>
              <span style={{ color: "GREY", textsize: "x-small" }}>
                <p>VERIFED - TIME STAMPED - AUTHENTICATED</p>{" "}
              </span>
            </div>
            <br></br>
            <div className="thirdcontainerimg">
              <img className="image" src={logo} />
            </div>
            <br></br>

            <div className="con col-md-4 col-lg-12">
              <p>
                <p>
                  CANADA and
                  USA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Professional
                  and College League
                </p>
                <div
                  className="barone"
                  style={{ margin: "2px", color: "#ffb300" }}
                ></div>
                <span style={{ color: "#ffb300" }}>
                  NHL - NBA - NFL - MLB - NCAAF - NCAAB - WNCAAB - CFL - WNBA
                </span>
                <div
                  className="barone"
                  style={{ margin: "2px", color: "#ffb300" }}
                ></div>
              </p>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container-fluid col-md-4 col-lg-12">
          <h1>WE DO IT ALL FOR YOU</h1>
          <br></br>
          <p>
            <span style={{ color: "#ffb300" }}>
              -WE CODED THE WEBSITE
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              -WE ENTER ALL THE GAMES AND SCORES
            </span>
          </p>
          <p>
            <span style={{ color: "#ffb300" }}>
              -WE SECURED THE DATABASE
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              -WE PROVIDE ALL THE STATS
            </span>
          </p>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container-fluid col-md-4 col-lg-12">
          <h1>ALL YOU HAVE TO DO IS</h1>
          <div className="fifthcontainerimg">
            <img className="image" src={table} />
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="container-fluid4 col-md-4 col-lg-12">
          <div className="sixthcontainerimg">
            <img className="abstract" src={timeshadow} alt="" />
            <div className="text-overlay">
              <h1>
                LOCKING IN YOUR PREDICTIONS WITH US <br />
                <span style={{ color: "#ffb300" }}>
                  UNLOCKS A BRAND NEW WORLD
                </span>
              </h1>
            </div>
          </div>
          <div className="border-box2">
            <h1>
              <span style={{ color: "#ffb300" }}>
                A FANS STATISTICS WEBSITE
              </span>
            </h1>
          </div>
          <br></br>
          <h1>THAT DETERMINES WHO HAS BRAGGING RIGHTS</h1>
        </div>

        <div className="container-fluid4 col-md-4 col-lg-12">
          <div className="seventhcontainerimg">
            <img className="abstract" src={abstract} alt="" />
            <div className="text-overlay1">
              <h1 style={{ fontSize: "80px", textAlign: "center" }}>
                <span
                  style={{
                    color: "#ffb300",
                    textShadow:
                      "2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.3), 0px 0px 6px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  BRAGGING RIGHTS
                </span>
              </h1>
              <br></br>
              <br></br>
              <br></br>
              <div
                className="border-box"
                style={{
                  height: "110px",
                  width: "750px",
                  display: "inline-block",
                }}
              >
                <h2 style={{ fontSize: "45px" }}>
                  <span style={{ color: "#ffb300" }}>
                    <img
                      className="logosmall"
                      src={logosmall}
                      alt=""
                      style={{
                        position: "absolute",
                        top: "2%",
                        left: "-40px" /* Adjust as needed */,
                        transform: "translateY(-50%)",
                        zIndex: "-1",
                        display: "inline-text",
                      }}
                    />
                    THE OFFICIAL DATABASE OF SPORTS PREDICTIONS
                  </span>
                </h2>
              </div>
              <br></br>
              <br></br>
              <h2 style={{ fontFamily: "Rubik" }}>SEE HOW YOU RANK!</h2>
              <br></br>
              <br></br>

              <div className="stats">
                <div className="stats-list">
                  <div className="stats-left">
                    <h5>
                      <span style={{ color: "#ffb300" }}>Accuracy Rate</span>
                      <div
                        className="bar-stats"
                        style={{
                          margin: "2px",
                          color: "#ffb300",
                          width: "calc(100% - 0px)",
                        }}
                      ></div>
                    </h5>
                    <p>
                      GETTING ONE SCORE RIGHT<br></br>WINNING PERCENTAGE
                      <br></br>LOSING PERCENTAGE
                    </p>

                    <h5>
                      <span style={{ color: "#ffb300" }}>Team Records</span>
                      <div
                        className="bar-stats"
                        style={{
                          margin: "2px",
                          color: "#ffb300",
                          width: "calc(100% - 0px)",
                        }}
                      ></div>
                    </h5>
                    <p>
                      AWAY RECORD<br></br>HOME RECORD
                    </p>

                    <h5>
                      <span style={{ color: "#ffb300" }}>League Records</span>
                      <div
                        className="bar-stats"
                        style={{
                          margin: "2px",
                          color: "#ffb300",
                          width: "calc(100% - 0px)",
                        }}
                      ></div>
                    </h5>
                    <p>
                      DIVISION RECORD<br></br>CONFERENCE RECORD
                    </p>
                  </div>
                  <div className="stats-image">
                    <img className="stats" src={stats} alt="" />
                  </div>
                  <div className="stats-right">
                    <h5>
                      <span style={{ color: "#ffb300" }}>Gambling Odds</span>
                      <div
                        className="bar-stats"
                        style={{
                          margin: "2px",
                          color: "#ffb300",
                          width: "calc(100% - 0px)",
                        }}
                      ></div>
                    </h5>
                    <p style={{ alignItems: "left" }}>
                      MONEY LINE<br></br>AGAINST THE SPREAD<br></br>OVER/UNDER
                    </p>

                    <h5>
                      <span style={{ color: "#ffb300" }}>Streaks</span>
                      <div
                        className="bar-stats"
                        style={{
                          margin: "2px",
                          color: "#ffb300",
                          width: "calc(100% - 0px)",
                        }}
                      ></div>
                    </h5>
                    <p style={{ alignItems: "left" }}>
                      LONGEST WINNING STREAK<br></br>LONGEST LOSING STREAK
                    </p>

                    <h5 style={{}}>
                      <span style={{ color: "#ffb300", marginRight: "8px" }}>
                        Football - Basketball
                      </span>
                      <div
                        className="bar-stats"
                        style={{
                          margin: "2px",
                          color: "#ffb300",
                          width: "calc(100% - 0px)",
                        }}
                      ></div>
                    </h5>
                    <p style={{ alignItems: "left" }}>
                      Scores within 3 points<br></br>Scores within 7 points
                    </p>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>

              <div className="border-box3">
                <h1>
                  EVERY{" "}
                  <span style={{ color: "#ffb300" }}>
                    PERFECT SCORE PREDICTION
                  </span>{" "}
                  <br></br>
                  GIVES YOU
                  <br></br>
                  <span
                    style={{
                      color: "#e1ff00",
                      textShadow: "0px 0px 10px #ffb300, 0px 0px 10px #ffb300",
                      textOutline: "2px solid black",
                    }}
                  >
                    <img
                      className="star"
                      src={star}
                      alt=""
                      style={{
                        position: "absolute",
                        top: "95%",
                        left: "190px" /* Adjust as needed */,
                        transform: "translateY(-50%)",
                        zIndex: "-1",
                      }}
                    />
                    INSTANT BRAGGING RIGHTS
                  </span>
                </h1>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
