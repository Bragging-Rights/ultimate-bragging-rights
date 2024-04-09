import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import homepage from "../../assets/TopSectionFrame.png";
import image2 from "../../assets/bgloww.png"; // Replace with your image 2 URL
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Adjust breakpoint for tablet view
  const [isTabletView, setIsTabletView] = useState(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint for tablet view
      setIsTabletView(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const styles = {
    introContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      color: "white",
      marginTop: isMobileView ? "30px" : "0",
      width: "100%",
    },
    contentContainer: {
      padding: "20px",
    },
    header: {
      fontWeight: "normal",
      marginBottom: "-40px",
      color: "#FFFF00",
      fontSize: isMobileView ? "0.7rem" : "1.4rem",
      fontStyle: "italic",
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
            <img
              src={image2}
              alt="Image 2"
              style={{
                width: "100%",
                height: isMobileView ? "15vh" : isTabletView ? "20vh" : "",
              }} // Adjust height for tablet view
            />
            <div style={styles.introContainer}>
              <div style={styles.contentContainer}>
                <Typography variant="h4" component="h1" sx={styles.header}>
                  THIS SITE IS BUILT FOR SPORTS FANS WHO LOVE
                </Typography>
                <br />
                <br />
                <Grid
                  container
                  spacing={1}
                  sx={{
                    display: isMobileView || isTabletView ? "flex" : "0",
                    flexWrap: isMobileView || isTabletView ? "nowrap" : "0",
                  }}
                >
                  {/* Your Grid items code */}
                  {/* First Column */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ ...styles.column, textAlign: "left" }}
                  >
                    <div style={styles.textContainer}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize:
                            isMobileView || isTabletView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-futbol-o mr-2 text-blue-500"></i>{" "}
                        Watching Pre-Game Shows
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-tv mr-2 text-blue-500"></i> Watching
                        Post-Game Shows
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-tv mr-2 text-blue-500"></i> And All
                        The Games They Can
                      </Typography>
                    </div>
                  </Grid>

                  {/* Second Column */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ ...styles.column, textAlign: "left" }}
                  >
                    <div style={styles.textContainer}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-bar-chart mr-2 text-blue-500"></i>{" "}
                        Checking Stats
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-share-alt mr-2 text-blue-500"></i>{" "}
                        Sharing Stats
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-tv mr-2 text-blue-500"></i>{" "}
                        Predicting Stats
                      </Typography>
                    </div>
                  </Grid>

                  {/* Third Column */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ ...styles.column, textAlign: "left" }}
                  >
                    <div style={styles.textContainer}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-trophy mr-2 text-blue-500"></i>{" "}
                        Telling You Whose Gonna Win
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-headphones mr-2 text-blue-500"></i>{" "}
                        Listening To Friends Predictions
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-tv mr-2 text-blue-500"></i>{" "}
                        Predicting Who Is Going To Win
                      </Typography>
                    </div>
                  </Grid>

                  {/* Fourth Column */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ ...styles.column, textAlign: "center" }}
                  >
                    <div style={styles.textContainer}>
                      <Typography
                        variant="body1"
                        style={{
                          color: "#ffff00",
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                        }}
                      >
                        <i className="fa fa-microphone mr-2 text-blue-500"></i>{" "}
                        SAYING 'I TOLD YOU SO!!'
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          color: "#ffff00",
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                        }}
                      >
                        <i className="fa fa-heart mr-2 text-blue-500"></i> AND
                        LOVE HAVING
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          color: "#ffff00",
                          fontSize: isMobileView ? "0.3rem" : "1rem",
                        }}
                      >
                        <i className="fa fa-tv mr-2 text-blue-500"></i> Ultimate
                        Bragging Rights
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
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
