import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, Container } from "@mui/material";

const NightlyBoardTabs = ({ changeTab, CurrentTab }) => {
  const tabs = [
    // { label: "NIGHTLY ", options: ["MINE2", "FRIENDS", "TEAM"] },
    { label: "WEEKLY ", options: ["MINE", "BUDDIES", "LEAGUE"] },
    { label: "SEASON ", options: ["MINE2", "FRIENDS", "TEAM"] },
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
            width: isMobileView ? "35vh" : "60%",
            height: isMobileView ? "6vh" : "10vh",
            backgroundColor: "black",
            borderRadius: "5vh",
            position: "relative",
            overflow: "hidden",
            marginLeft: isMobileView ? "10%" : "20%",
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
                className={
                  isMobileView ? "fontSizeImportantMobile" : "fontSizeImportant"
                }
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
                    marginTop: isMobileView ? "2vh" : "5vh",
                    marginleft: "4%",
                    width: "70%",
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

export default NightlyBoardTabs;
