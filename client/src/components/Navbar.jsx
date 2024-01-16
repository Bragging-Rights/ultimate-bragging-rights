import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const naviagte = useNavigate();

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
    localStorage.clear();
    naviagte("/");
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* <Link to="/">
              <img className="h-8 w-8" src={logo} alt="Bragging Rights" />
            </Link> */}
          </div>
          <div className="md:flex-grow md:flex space-x-4">
            {isHomepage ? (
              <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl">
                LIMITED FREE LIFE TIME MEMBERSHIPS AVAILABLE{" "}
                <span
                  style={{
                    color: "red",
                    textDecoration: "line-through white",
                    marginLeft: "2vh",
                    fontSize: "1.3rem",
                  }}
                >
                  $250
                </span>
              </div>
            ) : (
              <LeageSelect />
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isHomepage ? (
              <>
                <div
                  className="text-white text-sm sm:text-base md:text-lg lg:text-xl"
                  style={{ margin: "0px 12px 0px 0px" }}
                >
                  ALREADY A MEMBER?
                </div>
                <Link
                  to="/"
                  className="custom-button"
                  onClick={openSignInModal}
                >
                  <button className="py-1 px-2 border border-yellow-500 text-yellow-300 font-extrabold rounded-md shadow-md text-sm">
                    Sign In
                  </button>
                </Link>
              </>
            ) : (
              <>
                {userEmail ? (
                  <button
                    className="py-2 px-4 border border-yellow-500 text-yellow-300 font-extrabold rounded-md shadow-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="custom-button"
                    onClick={openSignInModal}
                  >
                    <button className="py-2 px-4 border border-yellow-500 text-yellow-300 font-extrabold rounded-md shadow-md">
                      Sign In
                    </button>
                  </Link>
                )}
              </>
            )}

            <SignInModal
              modalIsOpen={signInModalIsOpen}
              closeModal={() => setSignInModalIsOpen(false)}
            />

            {!isHomepage && (
              <Link to="/" className="custom-button" onClick={openModal}>
                <button className="py-2 px-4 border border-yellow-500 text-yellow-300 font-extrabold rounded-md shadow-md">
                  REGISTER
                </button>
              </Link>
            )}

            <Registration
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
            ></Registration>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
