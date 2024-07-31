import React, { useState } from "react";
import Modal from "react-modal"; // Import the modal library
import "../GameCard.css";
import displayToast from "../../Alert/Alert";
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
import { addPrediction } from "../../../Apis/predictions";
import { useMediaQuery } from "@material-ui/core";
import TimeFormat from "../../../services/TimeFormat.js";
import Switches from "../../Switches";
import { useMutation } from "react-query";
import { useLeagueContext } from "../../LeagueContext";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Swal from "sweetalert2"; // Import SweetAlert
import MobileSwitches from "../../Switchmobile.js";
import { teamNameMappings } from "../data.js";

const GamerCardRight = ({ gameData, isOpen, onToggle }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

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
      league: selectedLeague,
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
      <div>
        {isMobile ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: "0.60rem",
                      textAlign: "left",
                      marginLeft: "10px",
                      padding: "0",
                      fontWeight: "bold",
                      lineHeight: "1.5",
                      position: "relative",
                      height: "80px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <label
                      className="visitor"
                      style={{
                        color: "gold",
                        // fontWeight: "bolder",
                      }}
                    >
                      {teamNameMappings[gameData?.visitor] || gameData?.visitor}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          backgroundColor: "white",
                          width: "70px",
                          height: "30px",
                        }}
                        className={`score-input card-input m-1 ${
                          invalidFields.includes("pick_visitor")
                            ? "glowing-border"
                            : ""
                        }`}
                        value={pick_visitor}
                        onChange={(e) => setPickVisitor(e.target.value)}
                      />
                    </div>
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px",
                      flex: 1,
                    }}
                  >
                    <label
                      style={{
                        color: "gold",
                        fontWeight: "bolder",
                      }}
                    >
                      {TimeFormat(gameData?.time)}
                    </label>
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: "0.60rem",
                      textAlign: "right",
                      marginRight: "10px",
                      padding: "0",
                      fontWeight: "bold",
                      lineHeight: "1.5",
                      position: "relative",
                      height: "80px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <label
                      className="visitor"
                      style={{
                        color: "gold",
                        // fontWeight: "bolder",
                      }}
                    >
                      {teamNameMappings[gameData?.home] || gameData?.home}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          backgroundColor: "white",
                          width: "70px",
                          height: "30px",
                        }}
                        className={`score-input card-input m-1 ${
                          invalidFields.includes("pick_home")
                            ? "glowing-border"
                            : ""
                        }`}
                        value={pick_home}
                        onChange={(e) => setPickHome(e.target.value)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableHead>
                <TableRow
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: "0.60rem",
                      margin: "0",
                      padding: "0",
                      display: "flex",
                      flexDirection: "column",
                      border: "hidden",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      flex: "1",
                      // height: "100px", // Adjust height as needed
                    }}
                  >
                    <div style={{ marginTop: "auto", marginBottom: "auto" }}>
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
                          setGameEnding={setGameEnding}
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
                          setGameEnding={setGameEnding}
                        />
                      )}
                    </div>
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: "1",
                      border: "hidden",
                    }}
                  >
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={onToggle}
                      sx={{
                        fontSize: "0.60rem",
                        color: "gold",
                        fontWeight: "bolder",
                      }}
                    >
                      {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flex: "1",
                      fontSize: "0.60rem",
                      border: "hidden",
                    }}
                  >
                    <button
                      className="card-btn-outline m-1"
                      style={{
                        fontSize: isMobile ? "8px" : "16px",
                        padding: "2px 10px",
                      }}
                      onClick={handleEnterPick}
                    >
                      ENTER PICK
                    </button>
                    <button
                      className="card-btn-outline m-1"
                      style={{
                        fontSize: isMobile ? "8px" : "16px",
                        padding: "2px 10px",
                      }}
                      onClick={handleLockIn}
                    >
                      LOCK IT IN
                    </button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{ fontSize: "0.60rem", textAlign: "center" }}
                            >
                              <label style={labelStyles}>
                                {gameData?.["v-ml"]}
                              </label>
                              <br />
                              <label>{gameData?.["v-ml-points"]} Pts</label>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "0.60rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              <label>Money Line</label>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "0.60rem", textAlign: "center" }}
                            >
                              <label style={labelStyles}>
                                {gameData?.["h-ml"]}
                              </label>
                              <br />
                              <label>{gameData?.["h-ml-points"]} Pts</label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{ fontSize: "0.60rem", textAlign: "center" }}
                            >
                              <label style={labelStyles}>
                                {gameData?.["v-sprd"]}
                              </label>
                              <br />
                              <label>{gameData?.["v-sprd-points"]} Pts</label>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "0.60rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              <label>Spread</label>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "0.60rem", textAlign: "center" }}
                            >
                              <label style={labelStyles}>
                                {gameData?.["h-sprd"]}
                              </label>
                              <br />
                              <label>{gameData?.["h-sprd-points"]} Pts</label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{ fontSize: "0.60rem", textAlign: "center" }}
                            >
                              <label style={labelStyles}>
                                {gameData?.["v-ou"]}
                              </label>
                              <br />
                              <label>{gameData?.["v-ou-points"]} Pts</label>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "0.60rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              <label>Over/Under</label>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "0.60rem", textAlign: "center" }}
                            >
                              <label style={labelStyles}>
                                {gameData?.["h-ou"]}
                              </label>
                              <br />
                              <label>{gameData?.["h-ou-points"]} Pts</label>
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
        ) : (
          <div className="game-card grid col-span-2 xl:col-span-1">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div
                  className="game-time test-size"
                  style={{
                    WebkitTextStroke: "0.3px black",
                    textStroke: "0.3px black",
                    textShadow: "4px 7px 7px rgba(255, 0, 0, 0.25)",
                    fontSize: isMobile ? "9px" : "14px",
                  }}
                >
                  {TimeFormat(gameData?.time)}
                </div>
                <div className="game-date">{gameData.gamedate}</div> &nbsp;
                <input
                  type="text"
                  className={`score-input card-input mb-3 ${
                    invalidFields.includes("pick_visitor")
                      ? "glowing-border"
                      : ""
                  }`}
                  value={pick_visitor}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <div
                  className="game-time test-size font-inter mb-3"
                  style={{
                    WebkitTextStroke: "0.3px black",
                    fontSize: isMobile ? "10px" : "16px",
                  }}
                >
                  Team
                </div>
                <div className="box px-7 h-12">
                  <label
                    className="upside-down"
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                  >
                      {teamNameMappings[gameData?.visitor] || gameData?.visitor}
                    {/* {gameData?.visitor} */}
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <div
                  className="game-time test-size font-inter mb-3"
                  style={{
                    WebkitTextStroke: "0.3px black",
                    fontSize: isMobile ? "10px" : "16px",
                  }}
                >
                  Money Line
                </div>
                <div className="box px-7 h-12">
                  <label style={labelStyles}>{gameData?.["v-ml"]}</label>

                  <label
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                  >
                    {gameData?.["v-ml-points"]} Pts
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <div
                  className="game-time test-size font-inter mb-3"
                  style={{
                    WebkitTextStroke: "0.3px black",
                    fontSize: isMobile ? "10px" : "16px",
                  }}
                >
                  Spread
                </div>
                <div className="box px-7 h-12">
                  <label style={labelStyles}>{gameData?.["v-sprd"]}</label>

                  <label
                    className="text-white"
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                  >
                    {gameData?.["v-sprd-points"]} Pts
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <div
                  className="game-time test-size font-inter mb-3"
                  style={{
                    WebkitTextStroke: "0.3px black",
                    fontSize: isMobile ? "10px" : "16px",
                  }}
                >
                  Over/Under
                </div>

                <div className="box px-7 h-12">
                  <label style={labelStyles}>{gameData?.["v-ou"]}</label>
                  <label
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                  >
                    {gameData?.["v-ou-points"]} Pts
                  </label>
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
              <div className="flex flex-col" style={{ paddingRight: "6%" }}>
                <input
                  type="text"
                  id="pick-home"
                  className={`score-input card-input mb-3 mt-auto ${
                    invalidFields.includes("pick_home") ? "glowing-border" : ""
                  }`}
                  value={pick_home}
                  onChange={handleHomeChange}
                />
              </div>

              <div className="flex flex-col justify-start">
                <div className="box px-7 h-12">
                  <label
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                    className="upside-down"
                  >
                    {/* {gameData?.home} */}
                    {teamNameMappings[gameData?.home] || gameData?.home}

                  </label>
                </div>
              </div>
              <div
                className="flex flex-col justify-start"
                style={{
                  WebkitTextStroke: "0.3px black",
                  fontSize: isMobile ? "10px" : "16px",
                }}
              >
                <div className="box px-7 h-12">
                  <label style={labelStyles}>{gameData?.["h-ml"]}</label>
                  <label
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                  >
                    {gameData?.["h-ml-points"]} Pts
                  </label>
                </div>
              </div>
              <div
                className="flex flex-col justify-start"
                style={{
                  WebkitTextStroke: "0.3px black",
                  fontSize: isMobile ? "10px" : "16px",
                }}
              >
                <div className="box px-7 h-12">
                  <label style={labelStyles}>{gameData?.["h-sprd"]}</label>
                  <label
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                  >
                    {gameData?.["h-sprd-points"]} Pts
                  </label>
                </div>
              </div>
              <div
                className="flex flex-col justify-start"
                style={{
                  WebkitTextStroke: "0.3px black",
                  fontSize: isMobile ? "10px" : "16px",
                }}
              >
                <div className="box px-7 h-12">
                  <label style={labelStyles}>{gameData?.["h-ou"]}</label>
                  <label
                    style={{
                      fontSize: isMobile ? "10px" : "16px",
                    }}
                  >
                    {gameData?.["h-ou-points"]} Pts
                  </label>
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
                <button
                  className="card-btn-outline mt-4"
                  style={{
                    fontSize: isMobile ? "10px" : "16px",
                  }}
                  onClick={handleEnterPick}
                >
                  ENTER PICK
                </button>
                <button
                  className="card-btn mt-4"
                  style={{
                    fontSize: isMobile ? "10px" : "16px",
                  }}
                  onClick={handleLockIn}
                >
                  LOCK IT IN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GamerCardRight;
