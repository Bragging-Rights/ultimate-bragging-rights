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

  Modal.setAppElement("#root"); // Set the app element

  const userName = localStorage.getItem("username");
  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("_id");
  };

  return (
    <nav
      className="flex flex-col md:flex-row items-center bg-[#1B1C21] border border-[#313131] w-full relative
       overflow-x-hidden
      "
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="flex justify-between w-full mx-2 md:mx-14">
        <div className="text-center md:text-left">
          <Link to="/">
            <img src={logo} alt="bragging-rights" width={80} height={60} />
          </Link>
        </div>
        <div className="flex items-center">
          {isHomepage ? (
            <div className="hidden md:flex-center items-center">
              <img src={img1} alt="img1" />
              <p className="text-[#BE8200] text-lg font-extrabold">
                Players Wanted For Weekly Sports Prediction Competition
              </p>
              <img src={img2} alt="img2" />
            </div>
          ) : (
            <LeageSelect />
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
          {!isHomepage && (
            <button
              className="rounded h-8 px-4 text-[#1B1C21] font-extrabold mt-2 md:mt-0 md:ml-2"
              style={{
                background:
                  "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
                boxShadow: "0px 4px 40px 0px #000",
              }}
            >
              Add League
            </button>
          )}

          {userEmail ? (
            <Link className="custom-button" onClick={handleLogout}>
              <button
                className="rounded h-8 px-4 border border-[#BE8200] text-[#EFD261] font-extrabold mt-2 md:mt-0 md:ml-2"
                style={{
                  boxShadow: "0px 4px 40px 0px #000",
                }}
              >
                Logout
              </button>
            </Link>
          ) : (
            <Link className="custom-button" onClick={openSignInModal}>
              <button
                className="rounded h-8 px-4 border border-[#BE8200] text-[#EFD261] font-extrabold mt-2 md:mt-0 md:ml-2"
                style={{
                  boxShadow: "0px 4px 40px 0px #000",
                }}
              >
                Sign In
              </button>
            </Link>
          )}

          <SignInModal
            modalIsOpen={signInModalIsOpen}
            closeModal={() => setSignInModalIsOpen(false)}
          />

          <Link className="custom-button" onClick={openModal}>
            <button
              className="rounded h-8 px-4 border border-[#BE8200] text-[#EFD261] font-extrabold mt-2 md:mt-0 md:ml-2"
              style={{
                boxShadow: "0px 4px 40px 0px #000",
              }}
            >
              REGISTER
            </button>
          </Link>

          <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
            {/* <Signup /> */}
          </ReactModal>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
