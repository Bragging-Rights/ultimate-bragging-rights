import React from "react";
import logo from "../assets/logo.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import "./CSS/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const isMobileView = useMediaQuery("(max-width:600px)");

  return (
    <Container
      className="footer-container"
      style={{
        background: "#1B1C21",
        padding: "10px",
        margin: "0px",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Grid item xs={12} sm="auto" style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="logo"
            width={isMobileView ? 50 : 70}
            height={isMobileView ? 30 : 45}
          />
        </Grid>

        <Grid item xs={12} sm="auto" sx={{ textAlign: "center" }}>
          <Typography
            className="footer-text"
            style={{
              color: "#FFF",
              fontSize: isMobileView ? "0.45rem" : "10px",
              opacity: "0.5",
              marginTop: "10px",
            }}
          >
            ©2020 Sports Fans Challenges Inc . A Global Sports Network with a
            Conscience.<br/>
            All Rights Reserved. Terms of Use / New Privacy Policy.<br/>
            We never sell your information!
          </Typography>

          <Typography
            className="footer-text"
            style={{
              color: "#FFF",
              fontSize: isMobileView ? "0.25rem" : "10px",
              opacity: "0.5",
              marginTop: "20px",
            }}
          >
            DISCLAIMER: This site is 100% for entertainment purposes only and
            does not involve real money betting. Play responsibly.
          </Typography>
          <Typography
            className="footer-text"
            style={{
              color: "#FFF",
              fontSize: isMobileView ? "0.25rem" : "10px",
              opacity: "0.5",
            }}
          >
            If you or someone you know has a gambling problem, seek confidential
            support: USA 1-800 GAMBLER, Canada 1-800 463-1554.
          </Typography>
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          display: "flex",
          width: "70%",
          gap: "10px",
          marginX: "auto",
          justifyContent: "space-between", // Change this line
          marginTop: "10px",
          color: "#FFFFFF",
          "@media screen and (max-width: 1050px)": {
            width: "100%",
          },
          "& a": {
            textDecoration: "none",
            color: "#FFFFFF",
            transition: "color 0.3s",
            fontSize: isMobileView ? "0.30rem" : "12px",
            "&:hover": {
              textDecoration: "underline",
              color: "#FFD700",
            },
          },
        }}
      >
        <Typography>
          <Link to={"/privacy-policy"}>Campaigns</Link>
        </Typography>
        <Typography>
          <Link to={"/terms-of-service"}>Email Marketing</Link>
        </Typography>
        <Typography>
          <Link to={"/cookie-policy"}>Branding</Link>
        </Typography>
        <Typography>
          <Link to={"/acceptable-use-policy"}>Offline</Link>
        </Typography>
        <Typography>
          <Link to={"/acceptable-use-policy"}>Contact</Link>
        </Typography>
        <Typography>
          <Link to={"/acceptable-use-policy"}>FAQs</Link>
        </Typography>
      </Box> */}

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "20px",
          gap: "40px",
        }}
      >
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FFF" }}>
          <FaFacebookF size={24} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FFF" }}>
          <FaTwitter size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FFF" }}>
          <FaInstagram size={24} />
        </a>
      </Box> */}
    </Container>
  );
};

export default Footer;
