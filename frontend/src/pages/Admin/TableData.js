import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getGamesByDate, updateGameFields } from "../../Apis/games";
import { cloneDeep } from "lodash";
import { useMutation } from "react-query";
import displayToast from "../../components/Alert/Alert";
import { headerOptions } from "./data"; // Import headerOptions

import "./TableData.css";

const reasonsOptions = [
  "Weather",
  "Field/Stadium Issues",
  "Schedule/Travel Issue",
  "Health/Safety",
  "Lockout",
  "Other",
];

const ScoreEntry = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [gameData, setGameData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [dropdownValues, setDropdownValues] = useState({});
  const [reasonPopupOpen, setReasonPopupOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonData, setReasonData] = useState({});
  const [selectedReason, setSelectedReason] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabClick = (league) => {
    setSelectedLeague(league);
  };

  const handleDateChange = (date) => {
    const month = (Number(date.$M) + 1).toString().padStart(2, "0");
    const day = date.$D.toString().padStart(2, "0");
    const year = date.$y;
    const formattedDate = `${month}-${day}-${year}`;

    getGamesByDate(formattedDate)
      .then((response) => {
        const initialSelectedValues = {};
        const initialDropdownValues = {};
        response.data.forEach((game) => {
          initialSelectedValues[game._id] = "";
          initialDropdownValues[game._id] = "";
        });
        setSelectedValues(initialSelectedValues);
        setDropdownValues(initialDropdownValues);
        setGameData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRadioChange = (event, gameId) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [gameId]: event.target.value,
    }));
  };

  const isReasonButtonDisabled = (gameId) =>
    !selectedValues[gameId] && !dropdownValues[gameId];

  const handleReasonButtonClick = (gameId) => {
    setReasonPopupOpen(true);
    setReasonData((prevReasonData) => ({
      ...prevReasonData,
      [gameId]: "",
    }));
  };

  const { mutate, reset } = useMutation((data) => updateGameFields(data), {
    onError: (err) => {
      console.error("Error updating game fields:", err);
      displayToast(
        "An error occurred while updating the game fields.",
        "error"
      );
    },
    onSuccess: (rec) => {
      console.log("Update response:", rec); // Log the response from the API
      displayToast("Game fields updated successfully.", "success");
      reset();
      // Refresh the page or reset the form data here
      // window.location.reload(); // You can use this or a more graceful way to reset the form data
    },
  });

  const handleReasonSubmit = (gameId) => {
    if (reason.trim() !== "") {
      setReasonData((prevReasonData) => ({
        ...prevReasonData,
        [gameId]: reason,
      }));
    }
    setReasonPopupOpen(false);
    setReason("");
    alert("Data saved");
  };

  const filteredGameData = selectedLeague
    ? gameData.filter((game) => game.league === selectedLeague)
    : [];

  const handleInputChange = (id, field, value) => {
    const updatedGameData = cloneDeep(gameData);
    const gameIndex = updatedGameData.findIndex((game) => game._id === id);
    if (gameIndex !== -1) {
      updatedGameData[gameIndex][field] = value;
      setGameData(updatedGameData);
    }
  };

  const handleButtonClick = () => {
    const updatedGameData = gameData.map((game) => {
      const selectedOption = selectedValues[game._id];
      const selectedDropdown = dropdownValues[game._id];
      let optionId;
      switch (selectedOption) {
        case "REG":
          optionId = "REG";
          break;
        case "OT":
          optionId = "OT";
          break;
        case "SO":
          optionId = "SO";
          break;
        case "EI":
          optionId = "EI";
          break;
        case "Suspended":
          optionId = "Suspended";
          break;
        default:
          optionId = null;
      }
      if (optionId !== null) {
        return {
          ...game,
          table: selectedLeague,
          optionId: optionId,
          selectedOption: selectedOption,
          selectedDropdown: selectedDropdown, // Include dropdown value
          reason: reasonData[game._id] || "",
        };
      } else {
        return game;
      }
    });

    updatedGameData.forEach((game) => {
      if (game.vScore != null && game.hScore != null) {
        mutate(game); // Save the game data using mutate
      }
    });

    // Log the updated game data
    updatedGameData.forEach((game) => {
      console.log("Game Data:", {
        gameId: game._id,
        vScore: game.vScore,
        hScore: game.hScore,
        selectedOption: game.selectedOption,
        selectedDropdown: game.selectedDropdown, // Log the dropdown value
        reason: game.reason,
      });
    });

    // Log the reason for each game
    updatedGameData.forEach((game) => {
      console.log(`Reason for Game ${game._id}:`, game.reason);
    });
  };
  const handleDropdownChange = (event, gameId) => {
    const { value } = event.target;
    setDropdownValues((prevDropdownValues) => ({
      ...prevDropdownValues,
      [gameId]: value,
    }));
  };
  const handleReasonCancel = () => {
    setReasonPopupOpen(false);
    setReason("");
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            sx={{ borderRadius: "15px" }}
            onChange={handleDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>
      <br />
      <Paper className="score-entry-container" elevation={3}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab
            className="league-select"
            label="NHL"
            onClick={() => handleTabClick("NHL")}
          />
          <Tab
            className="league-select"
            label="NBA"
            onClick={() => handleTabClick("NBA")}
          />
          <Tab
            className="league-select"
            label="WNBA"
            onClick={() => handleTabClick("WNBA")}
          />
          <Tab
            className="league-select"
            label="NCAAB"
            onClick={() => handleTabClick("NCAAB")}
          />
          <Tab
            className="league-select"
            label="NFL"
            onClick={() => handleTabClick("NFL")}
          />
          <Tab
            className="league-select"
            label="CFL"
            onClick={() => handleTabClick("CFL")}
          />
          <Tab
            className="league-select"
            label="NCAAF"
            onClick={() => handleTabClick("NCAAF")}
          />
          <Tab
            className="league-select"
            label="UFL"
            onClick={() => handleTabClick("UFL")}
          />
          <Tab
            className="league-select"
            label="MLB"
            onClick={() => handleTabClick("MLB")}
          />
          <Tab
            className="league-select"
            label="NCAA"
            onClick={() => handleTabClick("NCAA")}
          />
        </Tabs>

        {selectedLeague && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="table-header-row">
                  <TableCell>VISITING TEAM</TableCell>
                  <TableCell>HOME TEAM</TableCell>
                  <TableCell>V-SCORE</TableCell>
                  <TableCell>H-SCORE</TableCell>
                  <TableCell>REG</TableCell>
                  <TableCell>
                    {selectedLeague === "MLB" || selectedLeague === "NCAA"
                      ? "EI"
                      : "OT"}
                  </TableCell>

                  {selectedLeague !== "NBA" &&
                    selectedLeague !== "WNBA" &&
                    selectedLeague !== "NCAAB" &&
                    selectedLeague !== "CFL" &&
                    selectedLeague !== "NCAAF" &&
                    selectedLeague !== "MLB" &&
                    selectedLeague !== "NCAA" &&
                    selectedLeague !== "UFL" &&
                    selectedLeague !== "NFL" && <TableCell>SO</TableCell>}
                  {<TableCell></TableCell>}
                  <TableCell>Not Completed</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGameData.map((game) => (
                  <TableRow key={game._id} className="table-row">
                    <TableCell>
                    {headerOptions[game.visitor] || game.visitor}
                      {/* {game.visitor} */}
                      </TableCell>
                    <TableCell>
                    {headerOptions[game.home] || game.home}

                      {/* {game.home} */}
                      </TableCell>

                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={game.vScore}
                        onChange={(e) =>
                          handleInputChange(game._id, "vScore", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={game.hScore}
                        onChange={(e) =>
                          handleInputChange(game._id, "hScore", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        value={selectedValues[game._id]}
                        onChange={(event) => handleRadioChange(event, game._id)}
                      >
                        <FormControlLabel
                          value="REG"
                          control={<Radio size="small" />}
                          label=""
                        />
                      </RadioGroup>
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        value={selectedValues[game._id]}
                        onChange={(event) => handleRadioChange(event, game._id)}
                      >
                        <FormControlLabel
                          value="OT"
                          control={<Radio size="small" />}
                          label=""
                        />
                      </RadioGroup>
                    </TableCell>
                    <TableCell>
                      {selectedLeague !== "NBA" &&
                        selectedLeague !== "WNBA" &&
                        selectedLeague !== "NCAAB" &&
                        selectedLeague !== "CFL" &&
                        selectedLeague !== "NCAAF" &&
                        selectedLeague !== "MLB" &&
                        selectedLeague !== "NCAA" &&
                        selectedLeague !== "UFL" &&
                        selectedLeague !== "NFL" && (
                          <RadioGroup
                            value={selectedValues[game._id]}
                            onChange={(event) =>
                              handleRadioChange(event, game._id)
                            }
                          >
                            <FormControlLabel
                              value="SO"
                              control={<Radio size="small" />}
                              label=""
                            />
                          </RadioGroup>
                        )}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={dropdownValues[game._id] || ""}
                        onChange={(event) =>
                          handleDropdownChange(event, game._id)
                        }
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          marginLeft: "-30%",
                        }}
                        displayEmpty
                        size="small"
                        disabled={
                          selectedValues[game._id] !== "OT" &&
                          selectedValues[game._id] !== "SO"
                        }
                      >
                        <MenuItem value="">
                          <em>0</em>
                        </MenuItem>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(
                          (option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        value={selectedValues[game._id]}
                        onChange={(event) => handleRadioChange(event, game._id)}
                      >
                        <FormControlLabel
                          value="Suspended"
                          control={<Radio size="small" />}
                          label=""
                        />
                      </RadioGroup>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        disabled={selectedValues[game._id] !== "Suspended"} // Enable button when "Suspended" is selected
                        onClick={() => handleReasonButtonClick(game._id)}
                      >
                        ADD REASON
                      </Button>

                      <div className="popup" style={{ width: "100%" }}>
                        <Dialog
                          open={reasonPopupOpen}
                          onClose={handleReasonCancel}
                          fullWidth
                          maxWidth="lg"
                        >
                          <DialogTitle>Enter Reason</DialogTitle>
                          <br />
                          <DialogContent>
                            {/* Dropdown menu for selecting reason */}
                            <TextField
                              select
                              fullWidth
                              value={selectedReason[game._id] || ""}
                              onChange={(e) =>
                                setSelectedReason((prevSelectedReason) => ({
                                  ...prevSelectedReason,
                                  [game._id]: e.target.value,
                                }))
                              }
                              label="Reason"
                              variant="outlined"
                            >
                              {reasonsOptions.map((reason) => (
                                <MenuItem key={reason} value={reason}>
                                  {reason}
                                </MenuItem>
                              ))}
                            </TextField>
                            <br /> <br />
                            {/* Text field for entering reason */}
                            <TextField
                              multiline
                              rows={8}
                              fullWidth
                              value={reasonData[game._id] || ""}
                              onChange={(e) =>
                                setReasonData((prevReasonData) => ({
                                  ...prevReasonData,
                                  [game._id]: e.target.value,
                                }))
                              }
                              variant="outlined"
                              label="Reason"
                              sx={{ width: "100%", resize: "both" }}
                              disabled={!selectedReason[game._id]} // Disable text field when no reason is selected
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleReasonCancel}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleReasonSubmit(game._id)}
                              color="primary"
                            >
                              Submit
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="contained"
              style={{
                marginTop: "20px",
                display: "flex",
                backgroundColor: "red",
              }}
              className="centered-button"
              onClick={handleButtonClick}
            >
              ENTER SCORES
            </Button>
          </TableContainer>
        )}
      </Paper>
      <br />
      <br />
      <h1
        style={{
          backgroundColor: "#E3D3D4",
          display: "flex",
          justifyContent: "center",
          color: "black",
          borderRadius: "0px 12px 0px 12px",
        }}
      >
        Finalized Games
      </h1>
      <br />
      <br />
      {/* <Paper className="score-entry-container" elevation={3}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab className="league-select" label="NHL" />
          <Tab className="league-select" label="NBA" />
          <Tab className="league-select" label="NFL" />
          <Tab className="league-select" label="MLB" />
          <Tab className="league-select" label="WNBA" />
          <Tab className="league-select" label="CFL" />
          <Tab className="league-select" label="NCAAF" />
          <Tab className="league-select" label="UFL" />
          <Tab className="league-select" label="NCCA" />
          <Tab className="league-select" label="NCAAB" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="table-header-row">
                <TableCell>VISITING TEAM</TableCell>
                <TableCell>HOME TEAM</TableCell>
                <TableCell>V-SCORE</TableCell>
                <TableCell>H-SCORE</TableCell>
                <TableCell>REG</TableCell>
                <TableCell>OT</TableCell>
                <TableCell>SO</TableCell>
                <TableCell>EI</TableCell>
                <TableCell>Not Completed</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameData.map((game) => (
                <TableRow key={game._id} className="table-row">
                  <TableCell>{game.visitor}</TableCell>
                  <TableCell>{game.home}</TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValues[game._id]}
                      onChange={(event) => handleRadioChange(event, game._id)}
                    >
                      <FormControlLabel
                        value="REG"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValues[game._id]}
                      onChange={(event) => handleRadioChange(event, game._id)}
                    >
                      <FormControlLabel
                        value="EI"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValues[game._id]}
                      onChange={(event) => handleRadioChange(event, game._id)}
                    >
                      <FormControlLabel
                        value="SO"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValues[game._id]}
                      onChange={(event) => handleRadioChange(event, game._id)}
                    >
                      <FormControlLabel
                        value="EI"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValues[game._id]}
                      onChange={(event) => handleRadioChange(event, game._id)}
                    >
                      <FormControlLabel
                        value="Suspended"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValues[game._id]}
                      onChange={(event) => handleRadioChange(event, game._id)}
                    >
                      <FormControlLabel
                        value="option6"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      disabled={isReasonButtonDisabled(game._id)}
                    >
                      ADD REASON
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
    </>
  );
};

export default ScoreEntry;
