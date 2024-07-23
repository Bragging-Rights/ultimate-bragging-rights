import React, { useState, useEffect } from "react";
import TimeFormat from "../../services/TimeFormat";
import { useMediaQuery } from "@material-ui/core";
import "./GameCard.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Collapse,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Switches from "../Switches.js";
import MobileSwitches from "../Switchmobile.js";
import Modal from "react-modal";
import { addPrediction } from "../../Apis/predictions";
import displayToast from "../Alert/Alert";
import { useMutation } from "react-query";
import { useLeagueContext } from "../LeagueContext";
import Swal from "sweetalert2";

const MobileCard = ({ gameData }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);

  const [Pick_Ei, setPick_Ei] = useState(false);

  const labelStyles = {
    borderBottom: "2px solid #BE8200",
    width: "100%",
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
  const [inputChanged, setInputChanged] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  const [previousValues, setPreviousValues] = useState({
    pick_visitor: "",
    pick_home: "",
  });

  const { selectedLeague } = useLeagueContext();

  const userId = localStorage.getItem("_id");

  const [gameEnding, setGameEnding] = useState(""); // State for gameEnding

  const handleEnterPick = () => {
    const invalidFields = [];
    if (!pick_visitor) invalidFields.push("pick_visitor");
    if (!pick_home) invalidFields.push("pick_home");
    if (!Pick_Reg && !Pick_ot && !Pick_so) invalidFields.push("pick_switch");

    setInvalidFields(invalidFields);

    if (invalidFields.length > 0) {
      Swal.fire({
        title: "Error",
        text: "Select one of the radio button.",
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
    const timestamp = new Date().toISOString();
    console.log("User ID in GameCard:", userId);

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
      league: selectedLeague,
    };
    // console.log("Data to save:", dataToSave);
    mutate(dataToSave);
  };

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

  useEffect(() => {
    const date = new Date(gameData?.gamedate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
  }, [gameData]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value !== previousValues.pick_visitor) {
      setInputChanged(true);
    }
    setPickVisitor(value);
  };

  const handleHomeChange = (e) => {
    const value = e.target.value;
    if (value !== previousValues.pick_home) {
      setInputChanged(true);
    }
    setPickHome(value);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (inputChanged) {
        const message =
          "You have unsaved changes, are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [inputChanged]);

  const handleSaveEdit = () => {
    setIsModalOpen(false);
    setInputChanged(false);
    setPreviousValues({ pick_visitor, pick_home });
    console.log("Saved data:", editedGameData);
  };

  const handleModalClose = () => {
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

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.90rem", textAlign: "center" }}>
                {TimeFormat(gameData?.time)}
              </TableCell>
              <TableCell sx={{ fontSize: "0.90rem", textAlign: "center" }}>
                Team
              </TableCell>
              <TableCell sx={{ fontSize: "0.90rem", textAlign: "center" }}>
                Money Line
              </TableCell>
              <TableCell sx={{ fontSize: "0.90rem", textAlign: "center" }}>
                Spread
              </TableCell>
              <TableCell sx={{ fontSize: "0.90rem", textAlign: "center" }}>
                Over/Under
              </TableCell>
              <TableCell sx={{ fontSize: "0.90rem", textAlign: "center" }}>
                Show More
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontSize: "0.80rem" }}>
                <TextField>
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
                </TextField>
              </TableCell>
              <TableCell sx={{ fontSize: "0.80rem" }}>
                {gameData?.visitor}
              </TableCell>
              <TableCell sx={{ fontSize: "0.80rem" }}>
                {gameData?.["v-ml-points"]} Pts
              </TableCell>
              <TableCell sx={{ fontSize: "0.80rem" }}>
                {gameData?.["v-sprd-points"]} Pts
              </TableCell>
              <TableCell sx={{ fontSize: "0.80rem" }}>
                {gameData?.["v-ou-points"]} Pts
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                  sx={{ ml: 1 }}
                >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontSize: "1rem" }} colSpan={3}>
                          {isMobile ? (
                            <MobileSwitches
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
                          ) : (
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
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.80rem" }}>
                          <button
                            style={{
                              fontSize: isMobile ? "10px" : "16px",
                            }}
                            onClick={handleEnterPick}
                          >
                            ENTER PICK
                          </button>{" "}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.80rem" }}>
                          <button
                            style={{
                              fontSize: isMobile ? "10px" : "16px",
                            }}
                            onClick={handleLockIn}
                          >
                            LOCK IT IN
                          </button>{" "}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Edit Game Data"
      >
        <h2>Edit Game Data</h2>
        <form>
          <input
            type="text"
            value={editedGameData?.visitor}
            onChange={(e) =>
              setEditedGameData({ ...editedGameData, visitor: e.target.value })
            }
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleModalClose}>Cancel</button>
        </form>
      </Modal>
    </>
  );
};

export default MobileCard;
