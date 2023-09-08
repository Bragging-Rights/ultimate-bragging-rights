import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "react-phone-input-2/lib/style.css";
import "./index.css";
import "./custom.css"; // Import the custom CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import Navbar from "./navbar"; 
import Navbar2 from "./checkSlots";
import Navbar3 from "./navigation";
import Home from "./home";
import Games from "./games";
import SignUp from "./signup";
import Privacy from "./PrivacyPolicy"; // Import Privacy component
import TermsOfUse from "./TermsOfUse"; // Import TermsOfUse component
import NavigationBar from "./navigationbar";
import Results from "./results";

const App = () => {
  const [users, setUsers] = useState([]);

  const handleSignUp = (formData) => {
    setUsers([...users, formData]);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <NavigationBar></NavigationBar>
        <Navbar2 />
        <Navbar3></Navbar3>
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
      </div>
    </Router>
  );
};

export default App;
