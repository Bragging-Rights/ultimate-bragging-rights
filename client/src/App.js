import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "react-phone-input-2/lib/style.css";
import "./index.css";
import "./custom.css"; // Import the custom CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import { LeagueProvider } from "./services/LeagueContext";
import CheckSlots from "./components/checkSlots";
import SearchBar from "./components/SearchBar";
import Home from "./components/home";
import Games from "./components/games";
import SignUp from "./components/signup";
import Privacy from "./components/PrivacyPolicy"; // Import Privacy component
import TermsOfUse from "./components/TermsOfUse"; // Import TermsOfUse component
import NavigationBar from "./components/navigationbar";
import Results from "./components/results";
import LeagueSelector from "./components/leagueSelector";
import Footer from "./components/Footer";

const App = () => {
  const [users, setUsers] = useState([]);

  const handleSignUp = (formData) => {
    setUsers([...users, formData]);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <LeagueProvider>
          <LeagueSelector></LeagueSelector>
          <NavigationBar></NavigationBar>
          {/* <CheckSlots></CheckSlots> */}

          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/results" element={<Results />} />

              <Route
                path="/signup"
                element={<SignUp onSignUp={handleSignUp} />}
              />
              {/* Add routes for Privacy and Terms of Use pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<TermsOfUse />} />
            </Routes>
          </div>
          <Footer />
        </LeagueProvider>
      </div>
    </Router>
  );
};

export default App;
