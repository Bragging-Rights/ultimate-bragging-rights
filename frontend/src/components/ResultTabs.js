import React, { useState } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";

const ResultTabs = ({ changeTab, CurrentTab }) => {
  const tabs = [
    { label: "Game Breakdown", options: ["MINE", "BUDDIES", "LEAGUE"] },
    { label: "Nightly Results", options: ["MINE2", "FRIENDS", "TEAM"] },
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    changeTab(index);
  };

  return (
    <Box style={{ marginRight: "68vh" }}>
      <List
        sx={{
          display: "flex",
          height: "12vh",
          alignItems: "center",
          borderBottom: "1px solid #393939",
          marginBottom: "2vh",
        }}
      >
        {tabs.map((tab, index) => (
          <ListItem
            key={index}
            onClick={() => handleTabClick(index)}
            sx={{
              cursor: "pointer",
              flex: "0 0 19vh",
              textAlign: "center",
              padding: "8px",
              color: "white", // Set text color to white
              backgroundColor:
                selectedTab === index ? "#FF0000" : "transparent",
              border: selectedTab === index ? "1px solid #BE8200" : "none",
              borderRadius: "3px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{tab.label}</Typography>
          </ListItem>
        ))}
      </List>
      <List
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
      </List>
    </Box>
  );
};

export default ResultTabs;
