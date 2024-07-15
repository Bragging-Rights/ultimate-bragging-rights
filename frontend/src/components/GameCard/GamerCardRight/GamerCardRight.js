import React, { useState } from "react";
import Modal from "react-modal"; // Import the modal library
import "../GameCard.css";
import displayToast from "../../Alert/Alert";
import { addPrediction } from "../../../Apis/predictions";
import TimeFormat from "../../../services/TimeFormat.js";
import Switches from "../../Switches";
import { useMutation } from "react-query";
import { useLeagueContext } from "../../LeagueContext";

const GamerCardRight = ({ gameData }) => {
  const labelStyles = {
    borderBottom: "2px solid #BE8200",
    width: "90%",
    textAlign: "center",
  };
  const [pick_visitor, setPickVisitor] = useState("");
  const [pick_home, setPickHome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedGameData, setEditedGameData] = useState({ ...gameData });
  const [Pick_Reg, setPick_Reg] = useState(false);
  const [Pick_ot, setPick_ot] = useState(false);
  const [Pick_so, setPick_so] = useState(false);
  const [Pick_num_ot, setPick_num_ot] = useState("");
  const { selectedLeague } = useLeagueContext();

  const handleInputChange = (e) => {
    setPickVisitor(e.target.value);
  };
  const handleHomeChange = (e) => {
    setPickHome(e.target.value);
  };
  const userId = localStorage.getItem("_id");

  let gameEnding = ""; // Change const to let

  const handleEnterPick = () => {
    const dataToSave = {
      gameData: gameData._id,
      pick_visitor,
      pick_home,
      gameEnding,
      userId,
      Pick_num_ot,
      Pick_so,
      Pick_ot,
      Pick_Reg,
    };
    localStorage.setItem(gameData._id, JSON.stringify(dataToSave));
    displayToast("Saved successfully!");
  };

  const handleLockIn = () => {
    const timestamp = new Date().toISOString();
    console.log("User ID in GameCard:", userId);

    if (!gameEnding) {
      gameEnding = "null";
    }

    const dataToSave = {
      gameData: gameData._id,
      pick_visitor,
      pick_home,
      gameEnding,
      userId,
      Pick_num_ot,
      Pick_so,
      Pick_ot,
      Pick_Reg,
    };

    // Send the data to the database using an HTTP request
    // mutate(dataToSave); error msg
  };

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (data) => addPrediction(data),
    {
      onSuccess: (data) => {
        displayToast("Preduction added successfully", "success");
      },
      onError: (error) => {
        displayToast("Error while adding the preduction", "error");
      },
    }
  );

  const handleEdit = () => {
    // Open the edit modal
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Save the edited game data
    // Implement your logic to save the editedGameData
    // You can make an HTTP request to update the data in your backend
    // or use a state management library like Redux to update the data
    // After saving, close the modal
    setIsModalOpen(false);
    console.log("Saved data:", editedGameData);
  };

  const handleModalClose = () => {
    // Close the modal without saving
    setIsModalOpen(false);
  };

  const date = new Date(gameData?.gamedate);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="game-card grid col-span-2 xl:col-span-1">
        <div className="flex justify-between">
          <div className=" flex flex-col ">
            <div
              className="game-time font-inter mb-3"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "4px 7px 7px rgba(255, 0, 0, 0.25)",
                fontSize: "14px",
              }}
            >
              {TimeFormat(gameData?.time)}
            </div>
            <div className=" game-date">{gameData.gamedate}</div> &nbsp;
            <input
              type="text"
              className="card-input mb-3"
              value={pick_visitor}
              onChange={handleInputChange}
            />
          </div>

          <div className=" flex flex-col  ">
            <div
              className=" game-time font-inter mb-3"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Team
            </div>
            <div className=" box  px-7 h-12">
              <label className="upside-down ">{gameData?.visitor}</label>
            </div>
          </div>
          <div className=" flex flex-col  ">
            <div
              className=" game-time font-inter mb-3"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Money Line
            </div>
            <div className=" box px-7 h-12">
              <label style={labelStyles}>{gameData?.["v-ml"]}</label>

              <label>{gameData?.["v-ml-points"]} Pts</label>
            </div>
          </div>
          <div className=" flex flex-col  ">
            <div
              className=" game-time"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Spread
            </div>
            <div className=" box px-7 h-12">
              <label style={labelStyles}>{gameData?.["v-sprd"]}</label>

              <label className=" text-white">
                {gameData?.["v-sprd-points"]} Pts
              </label>
            </div>
          </div>
          <div className=" flex flex-col  ">
            <div
              className=" game-time"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Over/Under
            </div>

            <div className=" box px-7 h-12">
              <label style={labelStyles}>{gameData?.["v-ou"]}</label>
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

        <div className=" flex justify-between ">
          <div className=" flex flex-col " style={{ paddingRight: "4.54%" }}>
            <input
              type="text"
              id="pick-home"
              className="card-input mb-3"
              value={pick_home}
              onChange={handleHomeChange}
            />
          </div>

          <div className="flex flex-col justify-start">
            <div className=" box px-7 h-12">
              <label className="upside-down">{gameData?.home}</label>
            </div>
          </div>
          <div
            className=" flex flex-col justify-start "
            style={{
              WebkitTextStroke: "0.3px black",
              textStroke: "0.3px black",
              textShadow: "0px 1px 4px 0px #2CDD14",
              fontSize: "16px",
            }}
          >
            <div className=" box px-7 h-12">
              <label style={labelStyles}>{gameData?.["h-ml"]}</label>
              <label>{gameData?.["h-ml-points"]} Pts</label>
            </div>
          </div>
          <div
            className=" flex flex-col justify-start "
            style={{
              WebkitTextStroke: "0.3px black",
              textStroke: "0.3px black",
              textShadow: "0px 1px 4px 0px #2CDD14",
              fontSize: "16px",
            }}
          >
            <div className=" box px-7 h-12">
              <label style={labelStyles}>{gameData?.["h-sprd"]}</label>
              <label>{gameData?.["h-sprd-points"]} Pts</label>
            </div>
          </div>
          <div
            className=" flex flex-col justify-start"
            style={{
              WebkitTextStroke: "0.3px black",
              textStroke: "0.3px black",
              textShadow: "0px 1px 4px 0px #2CDD14",
              fontSize: "16px",
            }}
          >
            <div className=" box  px-7 h-12">
              <label style={labelStyles}>{gameData?.["h-ou"]}</label>
              <label>{gameData?.["h-ou-points"]} Pts</label>
            </div>
          </div>
        </div>

        <div className=" flex justify-between items-center">
          <div className="card-id"></div>
          <Switches
            league={gameData?.league}
            season={gameData?.seasonflag}
            setPick_num_ot={setPick_num_ot}
            setPick_so={setPick_so}
            setPick_ot={setPick_ot}
            setPick_Reg={setPick_Reg}
          />
          {/* {isAdmin && (
            <button className="card-btn-outline mt-4" onClick={handleEdit}>
              EDIT
            </button>
          )} */}
          <div
            className="button-pick"
            style={{ display: "flex", columnGap: "3vh" }}
          >
            <button className="card-btn-outline mt-4" onClick={handleEnterPick}>
              ENTER PICK
            </button>{" "}
            <button className="card-btn mt-4" onClick={handleLockIn}>
              LOCK IT IN
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamerCardRight;
