import React, { useEffect } from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";
import { Helmet } from "react-helmet";
import MainNavBar from "../../components/MainNavBar";
import ReactPlayer from "react-player";

const HomePage = () => {
  useEffect(() => {
    // Embed script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://videosuite-player-wrapper.vercel.app/assets";
    script.async = true;

    // Function to initialize video player
    const initializeVideoPlayer = () => {
      // Replace this with the actual function provided by the script
      window.initializeVideoPlayer();
    };

    script.addEventListener("load", initializeVideoPlayer);

    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      script.removeEventListener("load", initializeVideoPlayer);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <MainNavBar />
      {/* HOME */}
      <div
        id="home"
        className="homepage-content-section homepage-home-content relative"
      >
        <div className="homepage-container">
          <div className="row">
            <div className="col-xs-12 ">
              {/* <div
                className="iv-player_responsive_padding"
                style={{ padding: "56.25% 0 0 0", position: "relative" }}
                data-hash="6570dd3125e25"
              >
                <div
                  className="iv-player_responsive_wrapper"
                  style={{
                    height: "100%",
                    left: 0,
                    position: "absolute",
                    top: 0,
                    width: "100%",
                  }}
                >
                  <div
                    className="iv-player_embed iv-player_async_p2z7746nud videoFoam=true"
                    style={{
                      height: "100%",
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <div
                      className="iv-player_swatch"
                      style={{
                        height: "100%",
                        left: 0,
                        opacity: 0,
                        overflow: "hidden",
                        position: "absolute",
                        top: 0,
                        width: "100%",
                      }}
                    >
                      <img
                        src="https://i-fast.b-cdn.net/live/21872_65708a4a7ee21.png"
                        style={{
                          filter: "blur(5px)",
                          height: "100%",
                          objectFit: "contain",
                          width: "100%",
                        }}
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              <div class="SharePage_container__iSQmi">
                <div class="SharePage_playerWrapper__05snD">
                  <div
                    class="iv-player_responsive_padding"
                    style="padding:56.25% 0 0 0;position:relative"
                    data-hash="6570dd3125e25"
                  >
                    <div
                      class="iv-player_responsive_wrapper"
                      style="height:100%;left:0;position:absolute;top:0;width:100%"
                    >
                      <div
                        class="iv-player_embed iv-player_async_p2z7746nud videoFoam=true"
                        style="height:100%;position:relative;width:100%"
                      >
                        <iframe
                          src={`https://videosuite-player.vercel.app/?hash=6570dd3125e25&amp;apiUrl=https://videosuite.app&amp;analyticsUrl=https://api.vidanalytics.io&amp;appEnv=live`}
                          width="100%"
                          height="100%"
                          frameborder="none"
                          class="_vs_ictr_player"
                          id="ikIYCziIYL"
                        ></iframe>
                        <div
                          class="iv-player_swatch"
                          style="height: 100%; left: 0px; opacity: 0; overflow: hidden; position: absolute; top: 0px; width: 100%; transition: opacity 0.5s ease 0s; z-index: -1;"
                        >
                          <img
                            src="https://i-fast.b-cdn.net/live/21872_65708a4a7ee21.png"
                            style="filter:blur(5px);height:100%;object-fit:contain;width:100%"
                            alt=""
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTRODUCTION */}
      <div
        id="intro"
        className="homepage-content-section homepage-green relative"
      >
        <div className="homepage-container">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <h1 className="text-3xl font-bold text-center mb-8">
              THIS SITE IS BUILT FOR SPORTS FANS WHO LOVE
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-4 sm:order-2">
                <p>
                  <i className="fa fa-futbol-o mr-2 text-blue-500"></i> Watching
                  Pre-Game shows
                </p>
                <p>
                  <i className="fa fa-bar-chart mr-2 text-blue-500"></i> Looking
                  Up Stats
                </p>
                <p>
                  <i className="fa fa-trophy mr-2 text-blue-500"></i> Predicting
                  who is going to win
                </p>
                <p>
                  <i className="fa fa-microphone mr-2 text-blue-500"></i> Saying
                  'I Told You So!!'
                </p>
              </div>
              <div className="space-y-4 sm:order-1">
                <p>
                  <i className="fa fa-tv mr-2 text-blue-500"></i> Watching
                  Post-Game shows
                </p>
                <p>
                  <i className="fa fa-share-alt mr-2 text-blue-500"></i> Sharing
                  Stats
                </p>
                <p>
                  <i className="fa fa-headphones mr-2 text-blue-500"></i>{" "}
                  Listening to others predictions
                </p>
                <p>
                  <i className="fa fa-heart mr-2 text-blue-500"></i> and they
                  Love Having
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="about"
        className="homepage-content-section homepage-about relative"
      >
        <div className="homepage-container">
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
