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
      style={{ background: "#1B1C21", padding: "20px" }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <img
            src={logo}
            alt="logo"
            width={isMobileView ? 52 : 72}
            height={isMobileView ? 40 : 55}
          />
        </Grid>
        <Grid item>
          <Typography
            className="footer-text"
            style={{
              color: "#FFF",
              fontSize: isMobileView ? "10px" : "12px",
              opacity: "0.5",
              marginTop: "10px",
            }}
          >
            ©2020 Sports Fans Challenges Inc . A Global Sports Network with a
            Conscience.
          </Typography>
          <Typography
            className="footer-text"
            style={{
              color: "#FFF",
              fontSize: isMobileView ? "10px" : "12px",
              opacity: "0.5",
            }}
          >
            All Rights Reserved. Terms of Use / New Privacy Policy
          </Typography>
          <Typography
            className="footer-text"
            style={{
              color: "#FFF",
              fontSize: isMobileView ? "10px" : "12px",
              opacity: "0.5",
            }}
          >
            We never sell your information!
          </Typography>
          <Typography
            className="footer-text"
            style={{
              color: "#FFF",
              fontSize: isMobileView ? "10px" : "12px",
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
              fontSize: isMobileView ? "10px" : "12px",
              opacity: "0.5",
            }}
          >
            If you or someone you know has a gambling problem, seek confidential
            support: USA 1-800 GAMBLER, Canada 1-800 463-1554.
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          gap: "10px",
          marginX: "auto",
          justifyContent: "center",
          marginTop: "10px",
          color: "#FFFFFF",
          "@media screen and (max-width: 1050px)": {
            width: "100%",
          },
          "& a": {
            textDecoration: "none",
            color: "#FFFFFF",
            transition: "color 0.3s",
            fontSize: "14px",
            "&:hover": {
              textDecoration: "underline",
              color: "#FFD700",
            },
          },
        }}
      >
        <Link to={"/privacy-policy"}>Privacy Policy</Link>
        <Link to={"/terms-of-service"}>Terms of Service</Link>
        <Link to={"/cookie-policy"}>Cookies Policy</Link>
        <Link to={"/acceptable-use-policy"}>Acceptable Policy</Link>
      </Box>
    </Container>
  );
};

export default Footer;
