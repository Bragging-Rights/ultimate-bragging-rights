import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeageSelect from "./LeageSelect";
import SignInModal from "../Modal/SignInModal";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";

const Navbar = () => {
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomepage = location.pathname === "/";

  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
            <Grid item xs={4}>
              {isHomepage && (
                <Typography
                  variant="body1"
                  color="inherit"
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.8rem" },
                  }}
                >
                  LIMITED FREE LIFETIME MEMBERSHIP AVAILABLE{" "}
                  <span
                    style={{
                      color: "red",
                      textDecoration: "line-through white",
                    }}
                  >
                    $250
                  </span>
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={4}
              style={{ textAlign: "center", marginTop: "-3vh" }}
            >
              {!isHomepage && <LeageSelect />}
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  color="inherit"
                  sx={{
                    marginLeft: "40%",
                    fontSize: "0.7rem",
                    float: "",
                  }}
                >
                  ALREADY A MEMBER
                </Typography>
                <SignInModal
                  modalIsOpen={signInModalIsOpen}
                  closeModal={() => setSignInModalIsOpen(false)}
                />

                {userEmail ? (
                  <Button
                    className="logout-button"
                    onClick={handleLogout}
                    style={{
                      border: "2px solid #f6e05e",
                      color: "#f0e68c",
                      fontWeight: 800,
                      borderRadius: "0.375rem",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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
                        style={{
                          border: "2px solid #f6e05e",
                          color: "#f0e68c",
                          fontWeight: 800,
                          borderRadius: "0.375rem",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          marginLeft: "auto", // Add this line to push the button to the right
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
