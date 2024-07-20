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
  Switch,
  FormControlLabel,
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
const defaultDisabledLeagues = ["WNBA", "CFL", "NCAAF", "UFL", "NCCA", "NCAAB"];
const glowingLeagues = ["NHL", "NFL", "MLB"];

const LeagueSelect = () => {
  const { selectedLeague, setSelectedLeague } = useLeagueContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState("left");
  const [disabledLeagues, setDisabledLeagues] = useState(
    defaultDisabledLeagues
  );
  const [enableAll, setEnableAll] = useState(false);
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

  const handleEnableAllChange = (event) => {
    setEnableAll(event.target.checked);
    if (event.target.checked) {
      setDisabledLeagues([]);
    } else {
      setDisabledLeagues(defaultDisabledLeagues);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1B1C21",
          height: isSmallScreen ? "auto" : "10%",
          marginLeft: isSmallScreen ? "0" : "-13%",
          width: isSmallScreen ? "100%" : "125%",
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Logo Grid */}
            <Grid item xs={isSmallScreen ? 2 : 1}>
              <a href="/games">
                <img
                  src={logoImage}
                  alt="Logo"
                  style={{
                    marginRight: 8,
                    width: isSmallScreen ? "30px" : "50px",
                    height: "auto",
                  }}
                />
              </a>
            </Grid>

            {/* League Grid */}
            <Grid item xs={isSmallScreen ? 8 : 9}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: isSmallScreen ? "auto" : "60px",
                }}
              >
                <IconButton
                  sx={{ color: "white" }}
                  onClick={prevPage}
                  size={isSmallScreen ? "small" : "medium"}
                >
                  <ArrowBackIos
                    sx={{ fontSize: isSmallScreen ? "10px" : "24px" }}
                  />
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
                      margin: isSmallScreen ? "0 8px" : "0 20px",
                      "& .MuiTab-root": {
                        minWidth: "auto",
                        padding: isSmallScreen ? "0 6px" : "0 20px",
                        fontSize: isSmallScreen ? "0.5rem" : "0.8rem",
                        transition: "transform 0.5s ease-in-out",
                        "&.Mui-selected": {
                          color: "#FFC107",
                          fontWeight: "bold",
                          backgroundColor: "rgba(255, 193, 7, 0.2)",
                          boxShadow: "0px 0px 22px #ff0000",
                          transform: "scale(1)",
                        },
                      },
                    }}
                    variant={isSmallScreen ? "scrollable" : "standard"}
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
                            ? "drop-shadow(0px 10px 10px #ff0000)"
                            : "inherit",
                          borderBottom: selectedLeague.includes(item)
                            ? "2px solid #ff0000"
                            : "inherit",
                          color: selectedLeague.includes(item)
                            ? "#ff0000"
                            : "white",
                          fontWeight: selectedLeague === item ? "bold" : "bold",
                          position: "relative",
                          ...(glowingLeagues.includes(item) && {
                            "&.Mui-selected": {
                              textShadow: "0 0 4px #ffd700",
                              backgroundColor: "rgba(255, 215, 0, 0.2)",
                              borderBottom: "2px solid #ffd700",
                            },
                          }),
                          "&.Mui-selected": item === selectedLeague && {
                            filter: "drop-shadow(0 0 6px #fff)",
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
                                top: isSmallScreen ? "5px" : "8px",
                                left: isSmallScreen ? "16%" : "34%",
                                transform: "translateX(-50%)",
                                width: isSmallScreen ? "25px" : "30px",
                                height: isSmallScreen ? "10px" : "13px",
                              }}
                            />
                          )
                        }
                        iconPosition="end"
                      />
                    ))}
                  </Tabs>
                </Slide>
                <IconButton
                  sx={{ color: "white" }}
                  onClick={nextPage}
                  size={isSmallScreen ? "small" : "medium"}
                >
                  <ArrowForwardIos
                    sx={{ fontSize: isSmallScreen ? "16px" : "24px" }}
                  />
                </IconButton>
              </Box>
            </Grid>

            {/* Buttons Grid */}
            <Grid item xs={isSmallScreen ? 2 : 2}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                {userEmail ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{
                      borderColor: "#FFC107",
                      color: "#FFC107",
                      marginRight: isSmallScreen ? "4px" : "8px",
                      padding: isSmallScreen ? "2px 4px" : "6px 12px",
                      fontSize: isSmallScreen ? "0.5rem" : "0.8rem",
                    }}
                  >
                    Logout
                  </Button>
                ) : null}
                <FormControlLabel
                  control={
                    <Switch
                      checked={enableAll}
                      onChange={handleEnableAllChange}
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  sx={{
                    marginRight: isSmallScreen ? "4px" : "8px",
                    color: "#FFC107",
                    ".MuiSwitch-switchBase.Mui-checked": {
                      color: "#FFC107",
                    },
                    ".MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#FFC107",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LeagueSelect;
