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
            width: isMobileView ? "40vh" : "57%",
            height: isMobileView ? "8vh" : "10vh",
            backgroundColor: "black",
            borderRadius: "5vh",
            position: "relative",
            overflow: "hidden",
            margin: "auto",
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
        {/* <List
        sx={{
          display: "flex",
          height: "12vh",
          alignItems: "center",
          borderBottom: "1px solid #393939",
          marginBottom: "2vh",
        }}
      >
        {tabs[selectedTab].options.map((option, index) => (
          <ListItem
            key={index + tabs.length}
            onClick={() => changeTab(index + tabs.length)}
            sx={{
              cursor: "pointer",
              flex: "0 0 13vh",
              textAlign: "center",
              padding: "8px",
              color: "white", // Set text color to white
              backgroundColor:
                CurrentTab === index + tabs.length ? "#FF0000" : "transparent",
              border:
                CurrentTab === index + tabs.length
                  ? "1px solid #BE8200"
                  : "none",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{option}</Typography>
          </ListItem>
        ))}
      </List> */}
      </Box>
    </Container>
  );
};

export default ResultTabs;
