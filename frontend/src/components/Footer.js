import React from "react";
import logo from "../assets/logo.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import "./CSS/Footer.css";

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
    </Container>
  );
};

export default Footer;
