import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LeageSelect from "./LeageSelect";
import logo from "../assets/logo.png";
import Modal from "react-modal";
import ReactModal from "./Modal/ReactModal";
import Signup from "./SignUp";
import SignInModal from "../Modal/SignInModal";
import img1 from "../assets/homeh1.png";
import img2 from "../assets/homeh2.png";
import Registration from "./Registration/Registration";

const Navbar = () => {
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const openSignInModal = () => {
    setSignInModalIsOpen(true);
  };

  const isHomepage = location.pathname === "/";

  Modal.setAppElement("#root");

  const userName = localStorage.getItem("username");
  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("_id");
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-8 w-8" src={logo} alt="Bragging Rights" />
            </Link>
          </div>
          <div className="hidden md:flex-grow md:flex items-center space-x-4">
            {isHomepage ? (
              <div className="flex items-center space-x-4">
                <img src={img1} alt="img1" className="h-6" />
                <p className="text-yellow-500 text-sm font-extrabold">
                  Players Wanted For Weekly Sports Prediction Competition
                </p>
                <img src={img2} alt="img2" className="h-6" />
              </div>
            ) : (
              <LeageSelect />
            )}
          </div>
          <div className="flex items-center space-x-4">
            {!isHomepage && (
              <button className="py-2 px-4 text-gray-800 font-extrabold bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 rounded-md shadow-md">
                Add League
              </button>
            )}

            {userEmail ? (
              <Link to="/" className="custom-button" onClick={handleLogout}>
                <button className="py-2 px-4 border border-yellow-500 text-yellow-300 font-extrabold rounded-md shadow-md">
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/" className="custom-button" onClick={openSignInModal}>
                <button className="py-2 px-4 border border-yellow-500 text-yellow-300 font-extrabold rounded-md shadow-md">
                  Sign In
                </button>
              </Link>
            )}

            <SignInModal
              modalIsOpen={signInModalIsOpen}
              closeModal={() => setSignInModalIsOpen(false)}
            />

            <Link to="/" className="custom-button" onClick={openModal}>
              <button className="py-2 px-4 border border-yellow-500 text-yellow-300 font-extrabold rounded-md shadow-md">
                REGISTER
              </button>
            </Link>

            <Registration isOpen={modalIsOpen} onRequestClose={closeModal}>
              {/* <Signup /> */}
            </Registration>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
