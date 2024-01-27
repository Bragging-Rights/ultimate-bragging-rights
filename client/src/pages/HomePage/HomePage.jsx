import React, { useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import line from "../../assets/GoldDividerLine.png";

const styles = {
  introContainer: {
    backgroundImage: "url(/src/assets/bglow.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign: "center",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    maxWidth: "90%",
    margin: "0 auto",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
    color: "#FFD700",
    fontStyle: "italic",
  },
  image: {
    width: "100%",
    maxWidth: "135vh",
    margin: "0 auto",
  },
  textContainer: {
    maxWidth: "100%",
  },
  column: {
    marginBottom: "2rem",
  },
  introContainer: {
    padding: "50px 0",
    backgroundImage: "url(/src/assets/bglow.png)",
    backgroundSize: "cover",
  },
  contentContainer: {
    textAlign: "center",
  },

  image: {
    width: "100%",
    maxWidth: "150px",
    margin: "20px 0",
  },
  column: {
    padding: "0 15px",
  },
  textContainer: {
    margin: "20px 0",
  },
  
};

const HomePage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.amazonaws.com/press-play-v2/2135671/2168572/outer.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container>
      <Navbar />
      {/* <MainNavBar /> */}
      {/* HOME */}
      <Grid>
        <div
          id="home"
          className="homepage-content-section homepage-home-content relative"
          style={{
            backgroundImage: `url(/src/assets/homepage.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            textAlign: "center",
            minHeight: "45vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="homepage-container">
            <div className="row">
              <div className="col-xs-12 video">
                <div
                  className="video-page"
                  title="Embedded Video"
                  allowFullScreen
                >
                  <div
                    id="ppdiv-wrapper-2168572"
                    style={{ width: "100%", height: "auto", margin: "-76px 0 0 4vh"  }}
                  >
                    <div
                      id="ppdiv_2168572"
                      style={{ width: "100%", height: "360px", margin:"-60px 0 0 1vh" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <br />
      <br />
      {/* Green */}

      <Grid container>
        <Grid item xs={12} sx={styles.introContainer}>
          <div style={styles.contentContainer}>
            <Typography variant="h4" component="h1" sx={styles.header}>
              THIS SITE IS BUILT FOR SPORTS FANS WHO LOVE
            </Typography>
            <br />
            <br />
            <Grid container spacing={1}>
              {/* First Column */}
              <Grid item xs={12} sm={6} md={3} style={styles.column}>
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
                    <i className="fa fa-tv mr-2 text-blue-500"></i> And All The
                    Games They Can
                  </Typography>
                </div>
              </Grid>

              {/* Second Column */}
              <Grid item xs={12} sm={6} md={3} style={styles.column}>
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
                    <i className="fa fa-tv mr-2 text-blue-500"></i> Predicting
                    Stats
                  </Typography>
                </div>
              </Grid>

              {/* Third Column */}
              <Grid item xs={12} sm={6} md={3} style={styles.column}>
                <div style={styles.textContainer}>
                  <Typography variant="body1">
                    <i className="fa fa-trophy mr-2 text-blue-500"></i> Telling
                    You Whose Gonna Win
                  </Typography>
                  <Typography variant="body1">
                    <i className="fa fa-headphones mr-2 text-blue-500"></i>{" "}
                    Listening To Friends Predictions
                  </Typography>
                  <Typography variant="body1">
                    <i className="fa fa-tv mr-2 text-blue-500"></i> Predicting
                    Who Is Going To Win
                  </Typography>
                </div>
              </Grid>

              {/* Fourth Column */}
              <Grid item xs={12} sm={6} md={3} style={styles.column}>
                <div style={styles.textContainer}>
                  <Typography variant="body1" style={{ color: "#ffff00" }}>
                    <i className="fa fa-microphone mr-2 text-blue-500"></i>{" "}
                    SAYING 'I TOLD YOU SO!!'
                  </Typography>
                  <Typography variant="body1" style={{ color: "#ffff00" }}>
                    <i className="fa fa-heart mr-2 text-blue-500"></i> AND LOVE
                    HAVING
                  </Typography>
                  <Typography variant="body1" style={{ color: "#ffff00" }}>
                    <i className="fa fa-tv mr-2 text-blue-500"></i> Ultimate
                    Bragging Rights
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />

      <Footer />
    </Container>
  );
};

export default HomePage;
