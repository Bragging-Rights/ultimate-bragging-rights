import React from "react";
import "aos/dist/aos.css";
import "../pages/HomePage/HomePage.css";
import MainNavBar from "../components/MainNavBar";
import line from "../assets/GoldDividerLine.png";
import Helmet from "react-helmet";
const Test = () => {
  const iframeHTML = `
    <div class="iv-player_responsive_padding" style="padding:56.25% 0 0 0;position:relative;" data-hash="6570dd3125e25">
      <div class="iv-player_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
        <div class="iv-player_embed iv-player_async_p2z7746nud videoFoam=true" style="height:100%;position:relative;width:100%">
          <iframe
            src="https://videosuite-player.vercel.app/?hash=6570dd3125e25&amp;apiUrl=https://videosuite.app&amp;analyticsUrl=https://api.vidanalytics.io&amp;appEnv=live"
            width="100px"
            height="100px"
            frameborder="none"
            class="_vs_ictr_player"
            id="6570dd3125e25"
          ></iframe>
        </div>
      </div>
    </div>
  `;
  return (
    <div className="w-full">
      <MainNavBar />
      <div
        id="home"
        className="homepage-content-section homepage-home-content relative"
      >
        <div className="homepage-container">
          <div className="row">
            <div
              className="col-xs-12 video"
              dangerouslySetInnerHTML={{ __html: iframeHTML }}
            ></div>
          </div>
        </div>
      </div>
      {/* Green */}
      <div
        id="intro"
        className="homepage-content-section homepage-green relative"
      >
        <div className="homepage-container">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <h1 className="text-2xl font-bold text-center mb-8 golden-text italic">
              T<span className="mr-2"></span>H<span className="mr-2"></span>I
              <span className="mr-2"></span>S<span className="mr-2"></span> S
              <span className="mr-2"></span>I<span className="mr-2"></span>T
              <span className="mr-2"></span>E<span className="mr-2"></span> I
              <span className="mr-2"></span>S<span className="mr-2"></span> B
              <span className="mr-2"></span>U<span className="mr-2"></span>I
              <span className="mr-2"></span>L<span className="mr-2"></span>T
              <span className="mr-2"></span> F<span className="mr-2"></span>O
              <span className="mr-2"></span>R<span className="mr-2"></span> S
              <span className="mr-2"></span>P<span className="mr-2"></span>O
              <span className="mr-2"></span>R<span className="mr-2"></span>T
              <span className="mr-2"></span>S<span className="mr-2"></span> F
              <span className="mr-2"></span>A<span className="mr-2"></span>N
              <span className="mr-2"></span>S<span className="mr-2"></span> W
              <span className="mr-2"></span>H<span className="mr-2"></span>O
              <span className="mr-2"></span> L<span className="mr-2"></span>O
              <span className="mr-2"></span>V<span className="mr-2"></span>E
            </h1>
            <img
              src={line}
              alt="Image"
              className="mx-auto"
              style={{ width: "135vh" }}
            />
            <br />
            <br />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
              <div className="space-y-4 text-left">
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font1",
                    color: "white",
                  }}
                >
                  <i className="fa fa-futbol-o mr-2 text-blue-500"></i> Watching
                  Pre-Game Shows
                </p>
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font2",
                    color: "white",
                  }}
                >
                  <i className="fa fa-tv mr-2 text-blue-500"></i> Watching
                  Post-Game Shows
                </p>
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font3",
                    color: "white",
                  }}
                >
                  <i className="fa fa-tv mr-2 text-blue-500"></i> And All The
                  Games They Can
                </p>
              </div>
              <div
                className="space-y-4 text-left"
                style={{ marginLeft: "6vh" }}
              >
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font4",
                    color: "white",
                  }}
                >
                  <i className="fa fa-bar-chart mr-2 text-blue-500"></i>{" "}
                  Checking Stats
                </p>
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font5",
                    color: "white",
                  }}
                >
                  <i className="fa fa-share-alt mr-2 text-blue-500"></i> Sharing
                  Stats
                </p>
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font6",
                    color: "white",
                  }}
                >
                  <i className="fa fa-tv mr-2 text-blue-500"></i> Predicting
                  Stats
                </p>
              </div>
              <div className="space-y-4 text-left">
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font7",
                    color: "white",
                  }}
                >
                  <i className="fa fa-trophy mr-2 text-blue-500"></i> Telling
                  You Whose Gonna Win
                </p>
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font8",
                    color: "white",
                  }}
                >
                  <i className="fa fa-headphones mr-2 text-blue-500"></i>{" "}
                  Listening To Friends Predictions
                </p>
                <p
                  style={{
                    marginBottom: "1rem",
                    fontFamily: "Font9",
                    color: "white",
                  }}
                >
                  <i className="fa fa-tv mr-2 text-blue-500"></i> Predicting Who
                  Is Going To Win
                </p>
              </div>
              <div className="space-y-4 text-left">
                <p style={{ marginBottom: "1rem", color: "#ffff00" }}>
                  <i className="fa fa-microphone mr-2 text-blue-500"></i> SAYING
                  'I TOLD YOU SO!!'
                </p>
                <p style={{ marginBottom: "1rem", color: "#ffff00" }}>
                  <i className="fa fa-heart mr-2 text-blue-500"></i> AND LOVE
                  HAVING
                </p>
                <p style={{ marginBottom: "1rem", color: "#ffff00" }}>
                  <i className="fa fa-tv mr-2 text-blue-500"></i> Ultimate
                  Bragging Rights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* <div
        id="about"
        className="homepage-content-section homepage-about relative"
      >
        <div className="homepage-container">
          <div className="row">
            <p className="text-center text-lg-copyright  text-golden-copyright">
              ©2023 Sports Fans Challenges - A Global Sports Network
              <br />
              All Rights Reserved.{" "}
              <span className="text-golden-copyright">Terms of Use</span> / New{" "}
              <span className="text-golden">Privacy Policy</span>
            </p>
            <p className="text-center text-lg-copyright text-golden-copyright">
              We do not sell your personal information
            </p>
          </div>
        </div>
      </div> */}
      {/* Info */}
      {/* <div
        id="info"
        className="homepage-content-section homepage-info relative"
      >
        <div className="homepage-container">
          <div className="row">
            <p>
              Disclaimer: This site is 100% for entertainment purposes only and
              does not involve real money betting. - Play responsibly.
            </p>
            <p>
              If you or someone you know has a gambling problem, seek
              confidential support. USA 1-800 Gambler (426-2537) Canada
              1-800-463-1554
            </p>
          </div>
        </div>
      </div> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Test;
