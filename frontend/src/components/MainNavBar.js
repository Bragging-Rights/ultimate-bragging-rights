import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import "./MainNavBar.css"; // Import the CSS file

const navItem = [
  { label: "Games", path: "/games" },
  { label: "Results", path: "/results" },
  { label: "Standings", path: "/standings" },
  { label: "Stats", path: "/stats" },
  { label: "Shares", path: "/share" },
  { label: "Admin", path: "/admin" },
  // { label: "Teams", path: "/teams" },
  // { label: "Pools", path: "/pools" },
  // { label: "FB Challenge", path: "/fb-challenges" },
  // { label: "Records", path: "/records" },
];

const MainNavBar = () => {
  const location = useLocation();
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    try {
      setIsUserAdmin(JSON.parse(isAdmin));
    } catch (error) {
      console.error("Error parsing isAdmin:", error);
    }
  }, []);

  return (
    <AppBar
      position="static"
      className="bg-1E1E1E"
      style={{
        backgroundSize: "cover",
        backgroundColor: "transparent",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1B1C21",
          padding: "2%",
        }}
      >
        {/* <Box sx={{ width: "60vh" }}> */}
          {/* <img src={LeftImage} alt="Left Image" /> */}
        {/* </Box> */}
        <div className="nav-list-container">

        <List
          component="nav"
          aria-labelledby="main navigation"
          className="nav-list"
          >
          {navItem.map((item, index) => {
            if (item.label === "Admin" && !isUserAdmin) {
              return null;
            }
            return (
              <ListItem
              key={index}
                button
                component={NavLink}
                to={item.path}
                selected={location.pathname === item.path}
                className={`nav-item ${
                  location.pathname === item.path ? "nav-item-selected" : ""
                }`}
              >
                <ListItemText
                  primary={item.label}
                  className="nav-text"
                />
              </ListItem>
            );
          })}
        </List>
          </div>
        {/* <Box sx={{ width: "60vh" }}> */}
          {/* <img src={RightImage} alt="Right Image" /> */}
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;
