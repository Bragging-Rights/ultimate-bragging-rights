import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import navbg from "../assets/navbg.png"; // Import your right image

const ResultTabs = ({ changeTab, CurrentTab }) => {
  const tabs = [
    { label: "GAME BREAKDOWN", options: ["MINE", "BUDDIES", "LEAGUE"] },
    { label: "NIGHTLY LEADERBOARD", options: ["MINE2", "FRIENDS", "TEAM"] },
  ];

  const [selectedTab, setSelectedTab] = useState(CurrentTab || 0); // Use CurrentTab if provided, otherwise default to 0
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600); // Adjust the threshold according to your design
    };

    handleResize(); // Call it initially
    window.addEventListener("resize", handleResize); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up on unmount
    };
  }, []);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    changeTab(index);
  };

  return (
    <Box>
      <List
        sx={{
          display: "flex",
          justifyContent: "space-around",
          borderColor: "gray",
          borderWidth: "1px",
          borderStyle: "solid",
          width: isMobileView ? "50vh" : "100vh",
          height:isMobileView ? "10vh" : "10vh",
          backgroundImage: `url(${navbg})`,
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
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isMobileView && selectedTab === index ? "rgba(255, 0, 0, 0.1)" : "transparent", // Change the background color if it's mobile view and selected
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: selectedTab === index ? "#FF0000" : "white",
              }}
            >
              {tab.label}
            </Typography>
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
  );
};

export default ResultTabs;
