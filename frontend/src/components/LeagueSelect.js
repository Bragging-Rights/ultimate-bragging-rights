import React, { useState, useEffect } from "react";
import { useLeagueContext } from "./LeagueContext";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
  Grid,
  Slide,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import arrowImage from "../assets/arr.png";
import logoImage from "../assets/logonav.png";
import { useNavigate } from "react-router-dom";

const totLeagues = [
  "NHL",
  "NBA",
  "MLB",
  "NFL",
  "WNBA",
  "CFL",
  "NCAAF",
  "UFL",
  "NCCA",
  "NCAAB",
];
const disabledLeagues = ["WNBA", "CFL", "NCAAF", "UFL", "NCCA", "NCAAB"];
const glowingLeagues = ["NHL", "NFL", "MLB"];

const LeagueSelect = () => {
  const { selectedLeague, setSelectedLeague } = useLeagueContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState("left");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Fetch user's preferred league from local storage or API
  useEffect(() => {
    const preferredLeague = localStorage.getItem("preferredLeague");
    if (preferredLeague) {
      setSelectedLeague(preferredLeague);
    }
  }, [setSelectedLeague]);

  const handleLeagueSelect = (item) => {
    setSelectedLeague(item);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totLeagues.length / 5) - 1) {
      setDirection("left");
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection("right");
      setCurrentPage(currentPage - 1);
    }
  };

  const leaguesToShow = totLeagues.slice(currentPage * 5, currentPage * 5 + 5);

  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1B1C21",
          height: isMobile ? "15%" : "10%", // Adjusted height
          marginLeft: isMobile ? "0" : "-13%",
          width: isMobile ? "100%" : "125%",
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Logo Grid */}
            <Grid item xs={1}>
              <img
                src={logoImage}
                alt="Logo"
                style={{
                  marginRight: 16,
                  width: isSmallScreen ? "30px" : "50px",
                  height: "auto",
                }}
              />
            </Grid>

            {/* League Grid */}
            <Grid item xs>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: "60px" }} // Fixed height
              >
                <IconButton sx={{ color: "white" }} onClick={prevPage}>
                  <ArrowBackIos />
                </IconButton>
                <Slide
                  direction={direction}
                  in={true}
                  mountOnEnter
                  unmountOnExit
                >
                  <Tabs
                    value={false}
                    aria-label="sports tabs"
                    textColor="inherit"
                    TabIndicatorProps={{
                      style: { backgroundColor: "#FFC107" },
                    }}
                    sx={{
                      margin: "0 20px",

                      "& .MuiTab-root": {
                        minWidth: "auto",
                        padding: isSmallScreen ? "0 10px" : "0 20px",
                        transition: "transform 0.5s ease-in-out",
                        "&.Mui-selected": {
                          color: "#FFC107",
                          fontWeight: "bold",
                          backgroundColor: "rgba(255, 193, 7, 0.2)",
                          boxShadow: "0px 0px 12px #fff",
                          transform: "scale(1)",
                        },
                      },
                    }}
                    variant="scrollable"
                    scrollButtons={false}
                  >
                    {leaguesToShow.map((item) => (
                      <Tab
                        key={item}
                        label={item}
                        onClick={() => handleLeagueSelect(item)}
                        disabled={disabledLeagues.includes(item)}
                        sx={{
                          filter: selectedLeague.includes(item)
                            ? "drop-shadow(0px 20px 10px #fff)"
                            : "inherit",

                          borderBottom: selectedLeague.includes(item)
                            ? "2px solid #ff0000"
                            : "inherit",

                          color: selectedLeague.includes(item)
                            ? "#ff0000"
                            : "white",
                          position: "relative",
                          ...(glowingLeagues.includes(item) && {
                            "&.Mui-selected": {
                              textShadow: "0 0 8px #ffd700",
                              backgroundColor: "rgba(255, 215, 0, 0.2)",
                              borderBottom: "2px solid #ffd700",
                            },
                          }),
                          "&.Mui-selected": item === selectedLeague && {
                            filter: "drop-shadow(0 0 10px #fff)",
                          },
                        }}
                        icon={
                          item === selectedLeague && (
                            <Box
                              component="img"
                              src={arrowImage}
                              alt="Selected League Arrow"
                              sx={{
                                position: "absolute",
                                top: "10px",
                                left: "35%",
                                transform: "translateX(-50%)",
                                width: "30px",
                                height: "10px",
                              }}
                            />
                          )
                        }
                        iconPosition="end"
                      />
                    ))}
                  </Tabs>
                </Slide>
                <IconButton sx={{ color: "white" }} onClick={nextPage}>
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            </Grid>

            {/* Buttons Grid */}
            <Grid item>
              <Box display="flex" alignItems="center">
                {userEmail ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{
                      borderColor: "#FFC107",
                      color: "#FFC107",
                      marginRight: 2,
                    }}
                  >
                    Logout
                  </Button>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LeagueSelect;
