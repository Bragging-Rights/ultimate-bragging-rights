import React, { useState } from "react";
import { useLeagueContext } from "./LeagueContext";
import {
  Grid,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import arrowImage from "../assets/arrow.png";
import logoImage from "../assets/logonav.png";

const totLeagues = ["NHL", "NBA", "MLB", "NFL", "WNBA", "CFL"];

const LeagueSelect = () => {
  const { selectedLeague, setSelectedLeague } = useLeagueContext();
  const buttonsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLeagueSelect = (item) => {
    setSelectedLeague(item);
  };

  const nextPage = () => {
    if (currentPage < totLeagues.length / buttonsPerPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={1}>
      {/* Logo on the left corner */}
      <Grid item xs={2}>
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "100%", height: "auto", marginLeft:"-1300%" }} // Adjust width and height as needed
        />
      </Grid>

      <Grid item xs={10} container justify="center" spacing={1} wrap="nowrap">
        {totLeagues
          .slice(currentPage * buttonsPerPage, (currentPage + 1) * buttonsPerPage)
          .map((item) => (
            <Grid item key={item}>
  <Button
    variant={item === selectedLeague ? "contained" : "outlined"}
    color={item === selectedLeague ? "primary" : "default"}
    onClick={() => handleLeagueSelect(item)}
    style={{
      color: item === selectedLeague ? "red" : "white", // Set text color to red for selected league
      backgroundColor: item === selectedLeague ? "transparent" : "",
      padding: 0,
      width: isSmallScreen ? "10px" : "0px",
      fontSize: isSmallScreen ? "0.6rem" : "1rem",
      marginLeft: isSmallScreen ? "-20px" : "0",
      border: 0,
      backgroundSize: "cover",
      position: "relative", // Added for arrow positioning
    }}
  >
    {item}
    {item === selectedLeague && ( // Render arrow only for selected league
      <img
        src={arrowImage}
        alt="Selected League Arrow"
        style={{
          position: "absolute",
          top: "-15px", // Adjust positioning as needed
          left: "50%",
          transform: "translateX(-50%)",
          width: "20px",
          height: "20px",
        }}
      />
    )}
  </Button>
</Grid>
          ))}
      </Grid>
      
    </Grid>
  );
};

export default LeagueSelect;
