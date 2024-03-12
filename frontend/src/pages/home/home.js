import React, { useEffect } from "react";
import { Grid, Container, Typography } from "@mui/material";
import homepage from "../../assets/TopSectionFrame.png";
import image2 from "../../assets/BottomSection.png"; // Replace with your image 2 URL
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const styles = {
  introContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    width: "100%",
  },
  contentContainer: {
    padding: "20px",
  },
  header: {
    fontWeight: "italic",

    marginBottom: "-40px",
    color: "#FFFF00",
  },
  column: {
    marginBottom: "20px",
  },
  textContainer: {
    padding: "10px",
    borderRadius: "5px",
  },
};
const iframeHTML = `
  <div class="iv-player_responsive_padding" style="padding:56.25% 0 0 0;position:relative; width:130%;" data-hash="65cd2c70a107e">
    <div class="iv-player_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
      <div class="iv-player_embed iv-player_async_p2z7746nud videoFoam=true" style="height:100%;position:relative;width:100%">
        <iframe
          src="https://videosuite-player.vercel.app/?hash=65cd2c70a107e&amp;apiUrl=https://videosuite.app&amp;analyticsUrl=https://api.vidanalytics.io&amp;appEnv=live"
          width="100%"
          height="100%"
          frameborder="none"
          class="_vs_ictr_player"
          id="65cd2c70a107e"
        ></iframe>
      </div>
    </div>
  </div>
  <script type="text/javascript" src="https://videosuite-player-wrapper.vercel.app/assets" async></script>
`;

const inMobileView = window.innerWidth <= 767;

const homepageContainerStyles = {
  position: "relative",
  marginTop: inMobileView ? "-20px" : "0",
};

const videoContainerStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: inMobileView ? "90%" : "50%", // Adjust the width as needed
  maxWidth: "600px", // Set a maximum width if necessary
};

const HomePage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.amazonaws.com/press-play-v2/2135671/2168572/outer.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Container>
        <Navbar />
        <Grid container spacing={2} direction="column" alignItems="center">
          {/* Image 1 with centered iframe */}
          <Grid item xs={12}>
            <div style={{ position: "relative" }}>
              <img src={homepage} alt="Image 1" width="100%" />
              <div
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "46%",
                  transform: "translate(-55%, -50%)",
                  width: "35%", // Adjust as needed
                  height: "38%", // Automatically adjust height based on width
                }}
                dangerouslySetInnerHTML={{ __html: iframeHTML }}
              />
            </div>
          </Grid>
          {/* Image 2 */}
          <Grid item xs={12} style={{ position: "relative" }}>
            <img src={image2} alt="Image 2" style={{ width: "100%" }} />
            <div style={styles.introContainer}>
              <div style={styles.contentContainer}>
                {/* <Typography variant="h4" component="h1" sx={styles.header}>
                  THIS SITE IS BUILT FOR SPORTS FANS WHO LOVE
                </Typography>
                <br />
                <br />
                <Grid container spacing={1}> */}
                {/* First Column */}
                {/* <Grid item xs={12} sm={6} md={3} style={styles.column}>
                    <div style={styles.textContainer}>
                      <Typography variant="body1">
                        <i className="fa fa-futbol-o mr-2 text-blue-500"></i>{" "}
                        Watching Pre-Game Shows
                      </Typography>
                      <Typography variant="body1">
                        <i className="fa fa-tv mr-2 text-blue-500"></i> Watching
                        Post-Game Shows
                      </Typography>
                      <Typography variant="body1">
                        <i className="fa fa-tv mr-2 text-blue-500"></i> And All
                        The Games They Can
                      </Typography>
                    </div>
                  </Grid> */}

                {/* Second Column */}
                {/* <Grid item xs={12} sm={6} md={3} style={styles.column}>
                    <div style={styles.textContainer}>
                      <Typography variant="body1">
                        <i className="fa fa-bar-chart mr-2 text-blue-500"></i>{" "}
                        Checking Stats
                      </Typography>
                      <Typography variant="body1">
                        <i className="fa fa-share-alt mr-2 text-blue-500"></i>{" "}
                        Sharing Stats
                      </Typography>
                      <Typography variant="body1">
                        <i className="fa fa-tv mr-2 text-blue-500"></i>{" "}
                        Predicting Stats
                      </Typography>
                    </div>
                  </Grid> */}

                {/* Third Column */}
                {/* <Grid item xs={12} sm={6} md={3} style={styles.column}>
                    <div style={styles.textContainer}>
                      <Typography variant="body1">
                        <i className="fa fa-trophy mr-2 text-blue-500"></i>{" "}
                        Telling You Whose Gonna Win
                      </Typography>
                      <Typography variant="body1">
                        <i className="fa fa-headphones mr-2 text-blue-500"></i>{" "}
                        Listening To Friends Predictions
                      </Typography>
                      <Typography variant="body1">
                        <i className="fa fa-tv mr-2 text-blue-500"></i>{" "}
                        Predicting Who Is Going To Win
                      </Typography>
                    </div>
                  </Grid> */}

                {/* Fourth Column */}
                {/* <Grid item xs={12} sm={6} md={3} style={styles.column}>
                    <div style={styles.textContainer}>
                      <Typography variant="body1" style={{ color: "#ffff00" }}>
                        <i className="fa fa-microphone mr-2 text-blue-500"></i>{" "}
                        SAYING 'I TOLD YOU SO!!'
                      </Typography>
                      <Typography variant="body1" style={{ color: "#ffff00" }}>
                        <i className="fa fa-heart mr-2 text-blue-500"></i> AND
                        LOVE HAVING
                      </Typography>
                      <Typography variant="body1" style={{ color: "#ffff00" }}>
                        <i className="fa fa-tv mr-2 text-blue-500"></i> Ultimate
                        Bragging Rights
                      </Typography>
                    </div>
                  </Grid>
                </Grid> */}
              </div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </>
  );
};

export default HomePage;
