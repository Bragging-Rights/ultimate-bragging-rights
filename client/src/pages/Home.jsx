import React from "react";
import logo from "../assets/logo.png";
import img1 from "../assets/homeh1.png";
import img2 from "../assets/homeh2.png";
import MainNavbar from "../components/MainNavBar";
import Navbar from "../components/Navbar";
import ReactModal from "../components/Modal/ReactModal";
import Signup from "../components/SignUp";

const Home = () => {
  return (
    <div className=" w-full">
      <Navbar></Navbar>
      <MainNavbar></MainNavbar>

      <div className=" h-40 flex justify-center items-center text-white">
        Here section when completed
      </div>
      <div className=" bg-[#ff0000] w-full flex justify-center items-center flex-col py-7">
        <div className=" flex gap-3">
          <span
            className=" text-white text-6xl font-extrabold"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            WE GIVE
          </span>
          <span
            className=" text-[#F8FA13] text-6xl font-extrabold"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            SPORTS FANS
          </span>
          <span
            className=" text-white text-6xl font-extrabold"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            SOMETHING
          </span>
        </div>
        <div className=" flex gap-3">
          <span
            className=" text-white text-6xl font-extrabold"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            THEY
          </span>
          <span
            className=" text-[#F8FA13] text-6xl font-extrabold"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            NEVER HAD BEFORE!
          </span>
        </div>
      </div>
      <div className=" flex justify-center items-center h-60 text-white">
        VIDO SECTION
      </div>

      <div
        className=" w-11/12 mx-auto  border-[0.902px] border-[#FFB800] flex justify-center
        bg-[rgba(2, 5, 1, 0.8)]
        flex-col
        items-center
        py-6
      "
      >
        <div className=" flex gap-36 items-center">
          <p className=" text-[#F8FA13] text-5xl font-extrabold">WE ALL KNOW</p>
          <p className=" text-5xl text-center font-extrabold italic text-[#f4c953]">
            SPORTS <br />
            FANS <br />
            LOVE!!
          </p>
        </div>
        <div className=" w-1/2">
          <div className=" flex  items-center gap-5 mt-2">
            <div className=" rounded-xl bg-[#FFB800] ">
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="check">
                  <path
                    id="Icon"
                    d="M35.8469 10.7358L16.5377 30.045L7.76074 21.2681"
                    stroke="white"
                    stroke-width="5.85104"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>
            <p className=" text-white font-normal text-4xl">
              Predicting Who Wins
            </p>
          </div>
          <div className=" flex  items-center gap-5 mt-5">
            <div className=" rounded-xl bg-[#FFB800] ">
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="check">
                  <path
                    id="Icon"
                    d="M35.8469 10.7358L16.5377 30.045L7.76074 21.2681"
                    stroke="white"
                    stroke-width="5.85104"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>
            <p className=" text-white font-normal text-4xl">
              Saying ‘I Told You So”
            </p>
          </div>
          <div className=" flex  items-center gap-5 mt-5">
            <div className=" rounded-xl bg-[#FFB800] ">
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="check">
                  <path
                    id="Icon"
                    d="M35.8469 10.7358L16.5377 30.045L7.76074 21.2681"
                    stroke="white"
                    stroke-width="5.85104"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>
            <p className=" text-white font-normal text-4xl">
              Telling Others What They Think
            </p>
          </div>
          <div className=" flex  items-center gap-5 mt-5">
            <div className=" rounded-xl bg-[#FFB800] ">
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="check">
                  <path
                    id="Icon"
                    d="M35.8469 10.7358L16.5377 30.045L7.76074 21.2681"
                    stroke="white"
                    stroke-width="5.85104"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>
            <p className=" text-white font-normal text-4xl">
              BRAGGING When they are RIGHT
            </p>
          </div>
        </div>
      </div>

      <div
        className=" w-11/12 mx-auto  flex 
        bg-[rgba(2, 5, 1, 0.8)]
        flex-col
        py-6
      "
      >
        <span className=" text-5xl font-semibold text-white">TIME TO </span>{" "}
        <br />
        <span className=" text-5xl font-semibold text-white">CENTRALIZE</span>
        <span className=" text-5xl font-semibold text-[#F8FA13]">SPORTS</span>
        <br />
        <span className=" text-7xl font-semibold text-[#F8FA13]">
          PREDICTIONS
        </span>
        <p className=" bg-white text-4xl font-medium py-4 px-5">
          AND START KEEPING TRACK ‘OFFICIALLY’
        </p>
      </div>
    </div>
  );
};

export default Home;
