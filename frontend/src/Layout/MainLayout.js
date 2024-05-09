import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar/SearchBar";
import resultHero from "../assets/bgpic.png";
import HeroSection from "../components/HeroSection";
import MainNavBar from "../components/MainNavBar";
import { Box, Typography } from "@mui/material";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const shouldHideFooter = () => {
    return location.pathname === "/admin";
  };

  const pathName = window.location.pathname;
  const showsearchBar =
    pathName === "/results" ||
    pathName === "/standings" ||
    pathName === "/stats";

  return (
    <>
      <Navbar />
      <br />
      <HeroSection imgUrl={resultHero} alt="img" />
      <br />
      <MainNavBar />
      <br />
      <Box sx={{ border: "2px solid red", height: "50px" }}>
        <Typography
          sx={{
            fontSize: "2rem",
            color: "white",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <marquee className="marq" direction="left" loop="">
            Results are updated hourly until we find a better solution
          </marquee>
        </Typography>
      </Box>

      {showsearchBar && <SearchBar />}

      <div className="flex justify-content">
        <div className="w-full ml-5 mt-4">
          <Outlet />
        </div>
      </div>
      {!shouldHideFooter() && <Footer />}
    </>
  );
};

export default MainLayout;
