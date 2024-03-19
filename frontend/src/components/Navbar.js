import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeagueSelect from "./LeagueSelect";
import SignInModal from "./Modal/SignInModal";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import img from "../assets/green.png";

const Navbar = () => {
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const isHomepage = location.pathname === "/";

  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSignIn = () => {
    setSignInModalIsOpen(false);
    navigate("/games");
  };

  return (
    <AppBar
      position="static"
      className="Navbar-Header"
      style={{ backgroundColor: "transparent", backgroundImage: `url(${img})` }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              display: "flex",
              flexWrap: isMobileView ? "nowrap" : "0",
            }}
          >
            <Grid item xs={12} sm={4}>
              {isHomepage && (
                <Typography
                  variant="body1"
                  color="inherit"
                  sx={{
                    fontSize: isMobileView ? "0.4rem" : "0.7rem",
                    textAlign: "left",
                  }}
                >
                  LIMITED FREE LIFETIME MEMBERSHIP AVAILABLE{" "}
                  <span
                    style={{
                      color: "red",
                      textDecoration: "line-through white",
                      fontSize: isMobileView ? "0.4rem" : "0.7rem",
                    }}
                  >
                    $250
                  </span>
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} sm={4} style={{ textAlign: "center" }}>
              {!isHomepage && <LeagueSelect />}
            </Grid>
            <Grid item xs={6} sm={4} style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {isHomepage && (
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{
                      marginLeft: "auto",
                      fontSize: isMobileView ? "0.4rem" : "0.6rem",
                    }}
                  >
                    ALREADY MEMBER
                  </Typography>
                )}
                <SignInModal
                  modalIsOpen={signInModalIsOpen}
                  closeModal={() => setSignInModalIsOpen(false)}
                  onSignIn={handleSignIn}
                />
                {userEmail ? (
                  <Button
                    className="logout-button"
                    onClick={handleLogout}
                    size="small"
                    sx={{
                      border: "2px solid #f6e05e",
                      color: "#f0e68c",
                      fontWeight: 800,
                      borderRadius: "0.375rem",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      fontSize: isMobileView ? "0.4rem" : "0.6rem",
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  isHomepage && (
                    <React.Fragment>
                      <Button
                        className="sign-in-button"
                        onClick={() => setSignInModalIsOpen(true)}
                        size="small"
                        sx={{
                          border: "2px solid #f6e05e",
                          color: "#f0e68c",
                          fontWeight: 800,
                          borderRadius: "0.375rem",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          fontSize: isMobileView ? "0.4rem" : "0.6rem",
                          marginLeft: isMobileView ? "10%" : 0,
                        }}
                      >
                        SignIn
                      </Button>
                    </React.Fragment>
                  )
                )}
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
