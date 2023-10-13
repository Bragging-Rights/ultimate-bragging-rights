import React, { useState } from "react";
import TimeFormat from "../../services/TimeFormat";
import "./GameCard.css";

const GameCard = ({ gameData }) => {
  const [pick_visitor, setPickVisitor] = useState("");
  const [pick_home, setPickHome] = useState("");

  const handleInputChange = (e) => {
    setPickVisitor(e.target.value);
  };
  const handleHomeChange = (e) => {
    setPickHome(e.target.value);
  };

  let gameEnding = ""; // Change const to let

  const handleRadioChange = (e) => {
    gameEnding = e.target.value;
  };

  const [userSelections, setUserSelections] = useState({
    pick_visitor: "",
    pick_home: "",
    gameEnding: "",
  });

  const handleEnterPick = () => {
    setUserSelections({
      pick_visitor,
      pick_home,
      gameEnding,
    });
  };

  const handleLockIn = () => {
    const timestamp = new Date().toISOString();

    if (!gameEnding) {
      gameEnding = "null";
    }

    const dataToSave = {
      gameData,
      pick_visitor,
      pick_home,
      gameEnding,
      timestamp,
    };
    console.log(dataToSave);

    // Send the data to the database using an HTTP request
    axios
      .post("your_api_endpoint", dataToSave)
      .then((response) => {
        // Handle the response if needed
        console.log("Data successfully saved to the database:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error saving data to the database:", error);
      });
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
                fontSize: "16px",
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
            <div className=" box">
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
            <div className=" box ">
              <label>{gameData?.["v-ml"]}</label> <label> Pts</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Spread</span>
            <div className=" box ">
              <label>{gameData?.["v-sprd"]}</label> <label>12 Pts</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Over/Under</span>

            <div className=" box ">
              <label>{gameData?.["v-ou"]}</label> <label>12 Pts</label>
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
              className=" box"
              style={{
                marginLeft: "25px",
              }}
            >
              <label>{gameData?.home}</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box ">
              <label>{gameData?.["h-ml"]}</label> <label> Pts</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box ">
              <label>{gameData?.["h-sprd"]}</label> <label> Pts</label>
            </div>
          </div>
          <div className=" flex flex-col">
            <div className=" box ">
              <label>{gameData?.["h-ou"]}</label> <label> Pts</label>
            </div>
          </div>
        </div>

        <div className=" flex justify-between items-center">
          <div className="card-id">ID: 625</div>
          <div classname="flex gap-2">
            <div className="flex mt-4 gap-1 items-center">
              <input
                type="radio"
                name="radio-group"
                value="Regular"
                onChange={handleRadioChange}
                checked={gameEnding === "Regular"}
              />
              <label className="card-label">REG</label>
            </div>

            <div className="flex mt-4 gap-1 items-center">
              <input
                type="radio"
                name="radio-group"
                value="OverTime"
                onChange={handleRadioChange}
                checked={gameEnding === "OverTime"}
              />
              <label className="card-label">OT</label>
            </div>

            <div className="flex mt-4 gap-1 items-center">
              <input
                type="radio"
                name="radio-group"
                value="ShootOut"
                onChange={handleRadioChange}
                checked={gameEnding === "ShootOut"}
              />
              <label className="card-label">S/O</label>
            </div>

            <div className="flex mt-4 gap-1 items-center">
              <input
                type="radio"
                name="radio-group"
                value="ExtraInnings"
                onChange={handleRadioChange}
                checked={gameEnding === "ExtraInnings"}
              />
              <label className="card-label">E/I</label>
            </div>
          </div>
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

export default GameCard;
