import React, { useState } from "react";
import TimeFormat from "../../../services/TimeFormat";
import Switches from "../../Switches";
import { userId } from "../../../Modal/SignInModal"; // Replace with the correct path to SignInModal.jsx

const GamerCardRight = ({ gameData }) => {
  const [pick_visitor, setPickVisitor] = useState("");
  const [pick_home, setPickHome] = useState("");

  const handleInputChange = (e) => {
    setPickVisitor(e.target.value);
  };
  const handleHomeChange = (e) => {
    setPickHome(e.target.value);
  };

  let gameEnding = ""; // Change const to let

  const handleEnterPick = () => {};

  const handleLockIn = () => {
    const timestamp = new Date().toISOString();
    console.log("User ID in GameCard:", userId);

    if (!gameEnding) {
      gameEnding = "null";
    }

    const dataToSave = {
      gameData,
      pick_visitor,
      pick_home,
      gameEnding,
      timestamp,
      userId,
    };
    console.log("UserDatatoGamesPlayed", dataToSave);

    // Send the data to the database using an HTTP request
    // axios
    //   .post("your_api_endpoint", dataToSave)
    //   .then((response) => {
    //     // Handle the response if needed
    //     console.log("Data successfully saved to the database:", response.data);
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error("Error saving data to the database:", error);
    //   });
  };

  return (
    <>
      <div
        className="game-card grid col-span-2 xl:col-span-1 "
        style={{
          boxShadow: "0px 4px 4px 0px #A2EB38",
        }}
      >
        <div className="flex justify-between">
          <div className=" flex flex-col ">
            <span
              className="game-time font-inter mb-3"
              style={{
                WebkitTextStroke: "0.3px black",
                textShadow: "4px 7px 7px rgba(255, 0, 0, 0.25)",
                fontSize: "14px",
              }}
            >
              {TimeFormat(gameData?.time)}
            </span>
            <input
              type="text"
              className="card-input mb-3"
              value={pick_visitor}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex flex-col justify-start ">
            <span className=" game-date">{gameData?.gamedate}</span>
            <div className=" box box px-7 h-12">
              <label>{gameData?.visitor}</label>
            </div>
          </div>
          <div
            className=" flex flex-col justify-start "
            style={{
              WebkitTextStroke: "0.3px black",

              textShadow: "0px 1px 4px 0px #2CDD14",
              fontSize: "16px",
            }}
          >
            <span className=" game-time font-inter mb-3">Money Line</span>
            <div className=" box px-7 h-12">
              <label className=" border-b-2 border-[#BE8200] w-[50%] text-center">
                {gameData?.["v-ml"]}
              </label>

              <label>{gameData?.["v-ml-points"]} Pts</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Spread</span>
            <div className=" box px-7 h-12">
              <label className=" border-b-2 border-[#BE8200] w-[50%] text-center">
                {gameData?.["v-sprd"]}
              </label>

              <label className=" text-white">
                {gameData?.["v-sprd-points"]} Pts
              </label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Over/Under</span>

            <div className=" box px-7 h-12">
              <label className=" border-b-2 border-[#BE8200] w-[50%] text-center">
                {gameData?.["v-ou"]}
              </label>
              <label>{gameData?.["v-ou-points"]} Pts</label>
            </div>
          </div>
        </div>

        <div className=" flex justify-between gap-1">
          <div
            className="line"
            style={{
              width: "10%",
            }}
          ></div>
          <div
            className="line"
            style={{
              width: "80%",
            }}
          ></div>
        </div>

        <div className=" w-full flex justify-between mt-3 ">
          <div className=" flex flex-col ">
            <input
              type="text"
              id="pick-home"
              className="card-input mb-3"
              value={pick_home}
              onChange={handleHomeChange}
            />
          </div>

          <div className="flex flex-col">
            <div
              className=" box px-7 h-12"
              style={{
                marginLeft: "60px",
              }}
            >
              <label>{gameData?.home}</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box px-7 h-12">
              <label className=" border-b-2 border-[#BE8200] w-[50%] text-center">
                {gameData?.["h-ml"]}
              </label>
              <label>{gameData?.["h-ml-points"]} Pts</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box px-7 h-12">
              <label className=" border-b-2 border-[#BE8200] w-[50%] text-center">
                {gameData?.["h-sprd"]}
              </label>
              <label>{gameData?.["h-sprd-points"]} Pts</label>
            </div>
          </div>
          <div className=" flex flex-col">
            <div className=" box  px-7 h-12">
              <label className=" border-b-2 border-[#BE8200] w-[50%] text-center">
                {gameData?.["h-ou"]}
              </label>
              <label>{gameData?.["h-ou-points"]} Pts</label>
            </div>
          </div>
        </div>

        <div className=" flex justify-between items-center">
          <div className="card-id"></div>
          <Switches league={gameData?.league} season={gameData?.seasonflag} />
          {/* {isAdmin && (
            <button className="card-btn-outline mt-4" onClick={handleEdit}>
              EDIT
            </button>
          )} */}
          <button className="card-btn-outline mt-4" onClick={handleEnterPick}>
            ENTER PICK
          </button>{" "}
          <button className="card-btn mt-4" onClick={handleLockIn}>
            LOCK IT IN
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default GamerCardRight;
