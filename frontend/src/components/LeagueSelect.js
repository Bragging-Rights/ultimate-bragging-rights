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
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={1}
      wrap="nowrap"
    >
      <Grid item >
        <IconButton onClick={prevPage} color="inherit"  style={{
                     width: "100px",
                     marginLeft: "10px",
                  }}>
          <ChevronLeft style={{ color: "white" }} />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container justify="center" spacing={1} wrap="nowrap">
          {totLeagues
            .slice(
              currentPage * buttonsPerPage,
              (currentPage + 1) * buttonsPerPage
            )
            .map((item) => (
              <Grid item key={item}>
                <Button
                  variant={item === selectedLeague ? "contained" : "outlined"}
                  color={item === selectedLeague ? "primary" : "default"}
                  onClick={() => handleLeagueSelect(item)}
                  style={{
                    color: "white",
                    backgroundColor:
                      item === selectedLeague ? "#ff0000" : "transparent",
                    padding: 0,
                    width: isSmallScreen ? "10px" : "0px", 
                    fontSize: isSmallScreen ? "0.6rem" : "1rem",
                    marginLeft: isSmallScreen ? "-20px" : "0",
                    border: 0,
                    backgroundSize: "cover",
                  }}
                >
                  {item}
                </Button>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={nextPage} color="inherit">
          <ChevronRight style={{ color: "white" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default LeagueSelect;