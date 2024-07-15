import React, { useState } from "react";
import Modal from "react-modal"; // Import the modal library
import "../GameCard.css";
import displayToast from "../../Alert/Alert";
import { addPrediction } from "../../../Apis/predictions";
import TimeFormat from "../../../services/TimeFormat.js";
import Switches from "../../Switches";
import { useMutation } from "react-query";
import { useLeagueContext } from "../../LeagueContext";
import Swal from "sweetalert2"; // Import SweetAlert

const GamerCardRight = ({ gameData }) => {
  const [Pick_Ei, setPick_Ei] = useState(false); // Example of setting Pick_Ei

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
  const [invalidFields, setInvalidFields] = useState([]);

  const handleInputChange = (e) => {
    setPickVisitor(e.target.value);
  };
  const handleHomeChange = (e) => {
    setPickHome(e.target.value);
  };
  const userId = localStorage.getItem("_id");

  const [gameEnding, setGameEnding] = useState(""); // State for gameEnding
  const handleEnterPick = () => {
    const invalidFields = [];
    if (!pick_visitor) invalidFields.push("pick_visitor");
    if (!pick_home) invalidFields.push("pick_home");
    if (!Pick_Reg && !Pick_ot && !Pick_so) invalidFields.push("pick_switch");

    if (invalidFields.length > 0) {
      setInvalidFields(invalidFields);
      Swal.fire({
        title: "Error",
        text: "Both pick_visitor, pick_home, and at least one switch are required fields.",
        icon: "error",
        background: "#212121",
        color: "white",
      });
      return;
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
    localStorage.setItem(gameData._id, JSON.stringify(dataToSave));
    displayToast("Saved successfully!", "success");
  };

  const handleLockIn = () => {
    const invalidFields = [];
    const visitorScore = parseInt(pick_visitor);
    const homeScore = parseInt(pick_home);

    if (!pick_visitor || isNaN(visitorScore))
      invalidFields.push("pick_visitor");
    if (!pick_home || isNaN(homeScore)) invalidFields.push("pick_home");

    // Ensure at least one of the options is selected
    if (!Pick_Reg && !Pick_ot && !Pick_so && !Pick_Ei)
      invalidFields.push("pick_switch");

    console.log("Pick_Reg:", Pick_Reg);
    console.log("Pick_ot:", Pick_ot);
    console.log("Pick_so:", Pick_so);
    console.log("Pick_Ei:", Pick_Ei);

    setInvalidFields(invalidFields);

    if (invalidFields.length > 0) {
      Swal.fire({
        title: "Error",
        text: "Select one of the options.",
        icon: "error",
        background: "#212121",
        color: "white",
      });
      return;
    }

    let showAlert = false;
    let alertMessage = "";
    let showError = false;
    let errorMessage = "";

    if (selectedLeague === "NHL") {
      if (visitorScore > 10 || homeScore > 10) {
        showAlert = true;
        alertMessage =
          "The scores you entered are unusual. Do you want to lock in your prediction?";
      }
      if (visitorScore === homeScore) {
        showError = true;
        errorMessage = "Scores cannot be the same.";
      }
      if (visitorScore === 0 || homeScore === 0) {
        showAlert = true;
        alertMessage = "Score cannot be zero. Are you sure?";
      }
    } else if (selectedLeague === "NBA") {
      if (
        visitorScore < 60 ||
        visitorScore > 150 ||
        homeScore < 60 ||
        homeScore > 150
      ) {
        showAlert = true;
        alertMessage =
          "The scores you entered are unusual. Do you want to lock in your prediction?";
      }
      if (visitorScore === homeScore) {
        showError = true;
        errorMessage = "Scores cannot be the same.";
      }
      if (visitorScore === 0 || homeScore === 0) {
        showError = true;
        errorMessage = "Score cannot be zero.";
      }
    } else if (selectedLeague === "MLB") {
      if (visitorScore > 10 || homeScore > 10) {
        showAlert = true;
        alertMessage =
          "The scores you entered are unusual. Do you want to lock in your prediction?";
      }
      if (visitorScore === homeScore) {
        showError = true;
        errorMessage = "Scores cannot be the same.";
      }
      if (visitorScore === 0 || homeScore === 0) {
        showAlert = true;
        alertMessage = "Score cannot be zero. Are you sure?";
      }
    } else if (selectedLeague === "NFL") {
      if (visitorScore > 35 || homeScore > 35) {
        showAlert = true;
        alertMessage =
          "The scores you entered are unusual. Do you want to lock in your prediction?";
      }
      if (visitorScore === homeScore) {
        showAlert = true;
        alertMessage = "Scores are the same. Are you sure?";
      }
      if (visitorScore === 0 || homeScore === 0) {
        showAlert = true;
        alertMessage = "Score cannot be zero. Are you sure?";
      }
    }

    if (showError) {
      displayToast(errorMessage, "error");
    } else if (showAlert) {
      Swal.fire({
        title: "Are you sure?",
        text: alertMessage,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        background: "#212121",
        color: "white",
        customClass: {
          popup: "swal2-popup",
          confirmButton: "swal2-confirm",
          cancelButton: "swal2-cancel",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          lockInPrediction();
        }
      });
    } else {
      lockInPrediction();
    }
  };

  const lockInPrediction = () => {
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
    mutate(dataToSave);
  };

  // In the JSX, ensure the switches component is included

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (data) => addPrediction(data),
    {
      onSuccess: (data) => {
        displayToast("Prediction added successfully", "success");
      },
      onError: (error) => {
        displayToast("Error while adding the prediction", "error");
      },
    }
  );

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    setIsModalOpen(false);
    console.log("Saved data:", editedGameData);
  };

  const handleModalClose = () => {
    // Close the modal without saving
    setIsModalOpen(false);
  };

  const renderSwitches = (team) => (
    <Switches
      league={gameData?.league}
      season={gameData?.seasonflag}
      setPick_num_ot={setPick_num_ot}
      setPick_so={setPick_so}
      setPick_ot={setPick_ot}
      setPick_Reg={setPick_Reg}
      setPick_Ei={setPick_Ei}
      uniqueId={gameData._id}
      glowing={invalidFields.includes("pick_switch")}
      setGameEnding={setGameEnding} // Pass the function to update gameEnding
    />
  );

  const date = new Date(gameData?.gamedate);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="game-card grid col-span-2 xl:col-span-1">
        <div className="flex justify-between">
          <div className="flex flex-col">
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
            <div className="game-date">{gameData.gamedate}</div> &nbsp;
            <input
              type="text"
              className={`score-input card-input mb-3 ${
                invalidFields.includes("pick_visitor") ? "glowing-border" : ""
              }`}
              value={pick_visitor}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
            <div
              className="game-time font-inter mb-3"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Team
            </div>
            <div className="box px-7 h-12">
              <label className="upside-down">{gameData?.visitor}</label>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="game-time font-inter mb-3"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Money Line
            </div>
            <div className="box px-7 h-12">
              <label style={labelStyles}>{gameData?.["v-ml"]}</label>

              <label>{gameData?.["v-ml-points"]} Pts</label>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="game-time"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Spread
            </div>
            <div className="box px-7 h-12">
              <label style={labelStyles}>{gameData?.["v-sprd"]}</label>

              <label className="text-white">
                {gameData?.["v-sprd-points"]} Pts
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="game-time"
              style={{
                WebkitTextStroke: "0.3px black",
                textStroke: "0.3px black",
                textShadow: "0px 1px 4px 0px #2CDD14",
                fontSize: "16px",
              }}
            >
              Over/Under
            </div>

            <div className="box px-7 h-12">
              <label style={labelStyles}>{gameData?.["v-ou"]}</label>
              <label>{gameData?.["v-ou-points"]} Pts</label>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-1">
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

        <div className="flex justify-between">
          <div className="flex flex-col" style={{ paddingRight: "4.54%" }}>
            <input
              type="text"
              id="pick-home"
              className={`score-input card-input mb-3 ${
                invalidFields.includes("pick_home") ? "glowing-border" : ""
              }`}
              value={pick_home}
              onChange={handleHomeChange}
            />
          </div>

          <div className="flex flex-col justify-start">
            <div className="box px-7 h-12">
              <label className="upside-down">{gameData?.home}</label>
            </div>
          </div>
          <div
            className="flex flex-col justify-start"
            style={{
              WebkitTextStroke: "0.3px black",
              textStroke: "0.3px black",
              textShadow: "0px 1px 4px 0px #2CDD14",
              fontSize: "16px",
            }}
          >
            <div className="box px-7 h-12">
              <label style={labelStyles}>{gameData?.["h-ml"]}</label>
              <label>{gameData?.["h-ml-points"]} Pts</label>
            </div>
          </div>
          <div
            className="flex flex-col justify-start"
            style={{
              WebkitTextStroke: "0.3px black",
              textStroke: "0.3px black",
              textShadow: "0px 1px 4px 0px #2CDD14",
              fontSize: "16px",
            }}
          >
            <div className="box px-7 h-12">
              <label style={labelStyles}>{gameData?.["h-sprd"]}</label>
              <label>{gameData?.["h-sprd-points"]} Pts</label>
            </div>
          </div>
          <div
            className="flex flex-col justify-start"
            style={{
              WebkitTextStroke: "0.3px black",
              textStroke: "0.3px black",
              textShadow: "0px 1px 4px 0px #2CDD14",
              fontSize: "16px",
            }}
          >
            <div className="box px-7 h-12">
              <label style={labelStyles}>{gameData?.["h-ou"]}</label>
              <label>{gameData?.["h-ou-points"]} Pts</label>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="card-id"></div>
          <Switches
            league={gameData?.league}
            season={gameData?.seasonflag}
            setPick_num_ot={setPick_num_ot}
            setPick_so={setPick_so}
            setPick_ot={setPick_ot}
            setPick_Reg={setPick_Reg}
            setPick_Ei={setPick_Ei}
            uniqueId={gameData._id}
            glowing={invalidFields.includes("pick_switch")}
            setGameEnding={setGameEnding} // Pass the function to update gameEnding
          />
          <div
            className="button-pick"
            style={{ display: "flex", columnGap: "3vh" }}
          >
            <button className="card-btn-outline mt-4" onClick={handleEnterPick}>
              ENTER PICK
            </button>
            <button className="card-btn mt-4" onClick={handleLockIn}>
              LOCK IT IN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamerCardRight;
