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
              <div
                className="col-xs-12 video"
                dangerouslySetInnerHTML={{ __html: iframeHTML }}
              ></div>
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

