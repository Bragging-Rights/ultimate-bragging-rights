import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeagueSelect from "./LeageSelect";
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
    <AppBar position="static" className="Navbar-Header">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              {isHomepage && (
                <Typography
                  variant="body1"
                  color="inherit"
                  sx={{
                    fontSize: isMobileView ? "0.4rem" : "0.8rem",
                  }}
                >
                  LIMITED FREE LIFETIME MEMBERSHIP AVAILABLE{" "}
                  <span
                    style={{
                      color: "red",
                      textDecoration: "line-through white",
                      fontSize: isMobileView ? "0.4rem" : "0.8rem",
                    }}
                  >
                    $250
                  </span>
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              style={{
                textAlign: "center",
                marginTop: isHomepage && isMobileView ? "-3vh" : 0,
              }}
            >
              {!isHomepage && <LeagueSelect />}
            </Grid>
            <Grid item xs={6} sm={4} style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {isHomepage && (
                  <Typography
                    variant="body1"
                    color="inherit"
                    sx={{
                      marginLeft: isMobileView ? "20%" : "40%",
                      fontSize: isMobileView ? "0.4rem" : "0.8rem",
                    }}
                  >
                    ALREADY A MEMBER
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
                      fontSize: isMobileView ? "0.4rem" : "0.8rem",
                      marginRight: isMobileView ? "-20%" : "-10px",
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
                          marginLeft: "auto",
                          fontSize: isMobileView ? "0.4rem" : "0.8rem",
                          marginRight: isMobileView ? "-20%" : "-10px",
                        }}
                      >
                        SignIn
                      </Button>

                      {/* Uncomment the following lines if you have a registration route */}
                      {/* <Link to="/registration" style={{ textDecoration: "none" }}>
                          <Button
                            className="register-button"
                            onClick={() => setModalIsOpen(true)}
                            style={{
                              border: "2px solid #f6e05e",
                              color: "#f0e68c",
                              fontWeight: 800,
                              borderRadius: "0.375rem",
                              boxShadow:
                                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }}
                          >
                            REGISTER
                          </Button>
                        </Link> */}
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
