import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";

const ResultTabs = ({ changeTab, CurrentTab }) => {
  const tabs = [
    { label: "GAME BREAKDOWN", options: ["MINE", "BUDDIES", "LEAGUE"] },
    { label: "NIGHTLY LEADERBOARD", options: ["MINE2", "FRIENDS", "TEAM"] },
  ];

  const [selectedTab, setSelectedTab] = useState(CurrentTab || 0);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    changeTab(index);
  };

  return (
    <Container>
      <Box>
        <List
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: isMobileView ? "30vh" : "57%",
            height: isMobileView ? "8vh" : "10vh",
            backgroundColor: "black",
            borderRadius: "5vh",
            position: "relative",
            overflow: "hidden",
            marginLeft: isMobileView ? "15%" : "21%",
          }}
        >
          {tabs.map((tab, index) => (
            <ListItem
              key={index}
              onClick={() => handleTabClick(index)}
              sx={{
                cursor: "pointer",

                textAlign: "center",
                padding: "8px",
                borderRadius: "3px",
                transition: "transform 0.3s ease, background-color 0.3s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  selectedTab === index ? "transparent" : "transparent",
                transform: selectedTab === index ? "scale(1.1)" : "scale(1)",
                position: "relative",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: selectedTab === index ? "#FF0000" : "white",
                  fontWeight: selectedTab === index ? "bold" : "normal",
                  transition: "color 0.3s ease",
                }}
              >
                {tab.label}
              </Typography>
              {selectedTab === index && (
                <Box
                  sx={{
                    position: "absolute",
                    marginTop: "5vh",
                    marginleft: "4%",
                    width: "60%",
                    height: "2px",
                    background: "#FF0000",
                    transition: "width 0.3s ease",
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ResultTabs;
