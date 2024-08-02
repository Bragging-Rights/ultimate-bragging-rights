import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, List, ListItem, ListItemText, Box } from "@mui/material";
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
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    try {
      setIsUserAdmin(JSON.parse(isAdmin));
    } catch (error) {
      console.error("Error parsing isAdmin:", error);
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBar
      position="static"
      style={{
        backgroundSize: "cover",
        backgroundColor: "transparent",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1B1C21",
          padding: "2%",
        }}
      >
        <Box
          sx={{
            width: isMobileView ? "100%" : "auto",
            display: "flex",
            justifyContent: "center",
            backgroundColor : 'black',
            padding : '1% 3%',
            borderRadius : '40vh',
            overflow: 'hidden', // Ensure that any overflow is hidden
            padding: isMobileView ? '2% 3%' : '1% 3%', // Dynamic padding based on screen size

          }}
        >
          <List
            component="nav"
            aria-labelledby="main navigation"
            sx={{ display: "flex", flexDirection: "row", padding: 0 }}
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
                  sx={{
                    position: "relative",
                    padding: "0 16px",
                    '&.Mui-selected': {
                      backgroundColor: "transparent",
                      '&::after': {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        backgroundColor: "white",
                      },
                      '.nav-text': {
                        color: "red", // Keep text color red
                      },
                    },
                    '.nav-text': {
                      fontSize: isMobileView ? "10px" : "16px",
                      color: location.pathname === item.path ? "red" : "inherit",
                    },
                  }}
                >
                  <ListItemText primary={item.label} className="nav-text" />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;