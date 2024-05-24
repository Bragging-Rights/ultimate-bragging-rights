import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Box, // Import Box for layout control
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import GreenTopBanner from "../assets/GreenTopBanner.png";
import LeftImage from "../assets/pngwing.com.png"; // Import your left image
import RightImage from "../assets/pngwing.com.png"; // Import your right image
import navbg from "../assets/navbg.png"; // Import your right image

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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserAdmin, setIsuserAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    try {
      setIsuserAdmin(JSON.parse(isAdmin));
    } catch (error) {
      console.error("Error parsing isAdmin:", error);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
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
            justifyContent: "space-between", // Adjust layout to space items evenly
            alignItems: "center", // Align items vertically
          }}
        >
          <Box sx={{ width: "60vh" }}>
            <img src={LeftImage} alt="Left Image" /> {/* Display left image */}
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleNav}
            sx={{ display: { md: "none" } }}
          >
            {isNavOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            sx={{
              display: { xs: "none", md: "flex" },
              borderColor: "gray",
              borderWidth: "1px",
              borderStyle: "solid",
              width: "150vh",
              backgroundImage: `url(${navbg})`,
            }}
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
                    "&.Mui-selected": {
                      color: "#FF0000 !important",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              );
            })}
          </List>
          <Box sx={{ width: "60vh" }}>
            <img src={RightImage} alt="Right Image" />{" "}
            {/* Display right image */}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isNavOpen}
        onClose={toggleNav}
        ModalProps={{ keepMounted: true }}
      >
        <List>
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
                onClick={toggleNav}
                selected={location.pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    color: "white ",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default MainNavBar;
