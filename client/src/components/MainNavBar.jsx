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
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import GreenTopBanner from "../assets/GreenTopBanner.png";

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
    setIsuserAdmin(JSON.parse(isAdmin));
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        className="bg-1E1E1E"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${GreenTopBanner})`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center", // Center the tabs horizontally
          }}
        >
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
            sx={{ display: { xs: "none", md: "flex" } }}
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
                      backgroundColor: "#FF0000", // Red color for the active tab
                      color: "white",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              );
            })}
          </List>
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
                    backgroundColor: "#FF0000", // Red color for the active tab
                    color: "white",
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
