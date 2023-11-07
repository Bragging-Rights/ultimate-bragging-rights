import React, { useState } from "react";
import TimeFormat from "../../services/TimeFormat";
import "./GameCard.css";
import Switches from "../Switches";
import Modal from "react-modal"; // Import the modal library
import { userId } from "../../Modal/SignInModal"; // Replace with the correct path to SignInModal.jsx
import { addPrediction } from "../../services/predictions";

const GameCard = ({ gameData }) => {
  const [pick_visitor, setPickVisitor] = useState("");
  const [pick_home, setPickHome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedGameData, setEditedGameData] = useState({ ...gameData });

  const handleInputChange = (e) => {
    setPickVisitor(e.target.value);
  };
  const handleHomeChange = (e) => {
    setPickHome(e.target.value);
  };

  let gameEnding = ""; // Change const to let

  const handleEnterPick = () => {
    setUserSelections({
      pick_visitor,
      pick_home,
      gameEnding,
      userId,
    });
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
    };
    console.log("UserDatatoGamesPlayed", "data to save ", dataToSave);

    // Send the data to the database using an HTTP request
    addPrediction(dataToSave);
  };

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

  return (
    <>
      <div className="game-card">
        <div className="flex justify-between">
          <div className=" flex flex-col ">
            <span
              className="game-time font-inter mb-3"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
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
            <div className=" box box h-12 w-24">
              <label>{gameData?.visitor}</label>
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
            <span className=" game-time font-inter mb-3">Money Line</span>
            <div className=" box h-12 w-24">
              <label>{gameData?.["v-ml"]}</label> <label></label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Spread</span>
            <div className=" box h-12 w-24">
              <label>{gameData?.["v-sprd"]}</label>
              {/* <label> Pts</label> */}
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Over/Under</span>

            <div className=" box h-12 w-24">
              <label>{gameData?.["v-ou"]}</label>
              {/* <label> Pts</label> */}
            </div>
          </div>
        </div>

        <div className=" flex justify-between gap-1">
          <div
            className=" line "
            style={{
              width: "10%",
            }}
          ></div>
          <div
            className=" line "
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
            />{" "}
          </div>

          <div className=" flex flex-col ">
            <div
              className=" box h-12 w-24"
              style={{
                marginLeft: "60px",
              }}
            >
              <label>{gameData?.home}</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box h-12 w-24">
              <label>{gameData?.["h-ml"]}</label> <label></label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box h-12 w-24">
              <label>{gameData?.["h-sprd"]}</label> <label></label>
            </div>
          </div>
          <div className=" flex flex-col">
            <div className=" box  h-12 w-24">
              <label>{gameData?.["h-ou"]}</label> <label></label>
            </div>
          </div>
        </div>

        <div className=" flex justify-between items-center">
          <div className="card-id">ID: 625</div>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Edit Game Data"
      >
        <h2>Edit Game Data</h2>
        <form>
          {/* Render editable fields for editedGameData */}
          {/* Example: */}
          <input
            type="text"
            value={editedGameData?.visitor}
            onChange={(e) =>
              setEditedGameData({ ...editedGameData, visitor: e.target.value })
            }
          />
          {/* Add more fields for other properties of editedGameData */}
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleModalClose}>Cancel</button>
        </form>
      </Modal>
    </>
  );
};

export default GameCard;
