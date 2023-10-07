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

const Navbar = () => {
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation(); // Get the current route location

  const closeModal = () => {
    console.log("close modal");
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const openSignInModal = () => {
    setSignInModalIsOpen(true);
    console.log("sign in modal");
  };

  const isHomepage = location.pathname === "/";

  Modal.setAppElement("#root"); // Set the app element

  return (
    <nav
      className=" flex items-center bg-[#1B1C21] h-18 border border-[#313131] w-full"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className=" flex items-center justify-between w-full mx-14">
        <div>
          <Link to="/">
            <img src={logo} alt="bragging-rigths" width={80} height={60} />
          </Link>{" "}
        </div>
        <div className="flex items-center">
          {isHomepage ? (
            /* Render the content for the homepage */
            <div className="flex items-center">
              <img src={img1} alt="img1" />
              <p className="text-[#BE8200] text-lg font-extrabold">
                Players Wanted For Weekly Sports Prediction Competition
              </p>
              <img src={img2} alt="img2" />
            </div>
          ) : (
            /* Render the LeagueSelect component for other routes */
            <LeageSelect />
          )}
        </div>
        <div className=" flex gap-1.5">
          {!isHomepage && (
            /* Conditionally render the "Add League" button for non-homepage routes */
            <button
              className="rounded h-8 px-4 text-[#1B1C21] font-extrabold"
              style={{
                background:
                  "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
                boxShadow: "0px 4px 40px 0px #000",
              }}
            >
              Add League
            </button>
          )}

          <Link className="custom-button" onClick={openSignInModal}>
            <button
              className=" rounded h-8 px-4 border border-[#BE8200] text-[#EFD261] font-extrabold"
              style={{
                boxShadow: " 0px 4px 40px 0px #000",
              }}
            >
              Sign In
            </button>
          </Link>

          <SignInModal
            modalIsOpen={signInModalIsOpen}
            closeModal={() => setSignInModalIsOpen(false)}
          />

          <Link className="custom-button" onClick={openModal}>
            <button
              className=" rounded h-8 px-4 border border-[#BE8200] text-[#EFD261] font-extrabold"
              style={{
                boxShadow: " 0px 4px 40px 0px #000",
              }}
            >
              REGISTER
            </button>
          </Link>

          <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <Signup />
          </ReactModal>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
