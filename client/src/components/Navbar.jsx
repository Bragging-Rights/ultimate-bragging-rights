import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeageSelect from "./LeageSelect";
import logo from "../assets/logo.png";
import ReactModal from "./Modal/ReactModal";
import Signup from "./SignUp";

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    console.log("close modal");
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <nav
      className=" flex items-center bg-[#1B1C21] h-18 border border-[#313131] w-full"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className=" flex items-center justify-between w-full mx-14">
        <div>
          <img src={logo} alt="bragging-rigths" width={80} height={60} />
        </div>
        <div className="flex items-center">
          <LeageSelect />
        </div>{" "}
        <div className=" flex gap-8">
          <button
            className=" rounded h-8 px-4 text-[#1B1C21] font-extrabold"
            style={{
              background:
                "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
              boxShadow: " 0px 4px 40px 0px #000",
            }}
          >
            Add League
          </button>

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
