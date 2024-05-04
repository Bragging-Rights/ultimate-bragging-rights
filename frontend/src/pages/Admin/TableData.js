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
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getGamesByDate } from "../../Apis/games";
import { cloneDeep } from "lodash";

import "./TableData.css";

const ScoreEntry = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [gameData, setGameData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [reasonPopupOpen, setReasonPopupOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonData, setReasonData] = useState({});

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDateChange = (date) => {
    const month = (Number(date.$M) + 1).toString().padStart(2, "0");
    const day = date.$D.toString().padStart(2, "0");
    const year = date.$y;
    const formattedDate = `${month}-${day}-${year}`;

    getGamesByDate(formattedDate)
      .then((response) => {
        const initialSelectedValues = {};
        response.data.forEach((game) => {
          initialSelectedValues[game._id] = "";
        });
        setSelectedValues(initialSelectedValues);
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

  const isReasonButtonDisabled = (gameId) => !selectedValues[gameId];

  const handleReasonButtonClick = (gameId) => {
    setReasonPopupOpen(true);
    setReasonData((prevReasonData) => ({
      ...prevReasonData,
      [gameId]: "", // Initialize reason data for this game
    }));
  };

  const handleReasonSubmit = (gameId) => {
    if (reason.trim() !== "") {
      // Save the reason text to reasonData object with game ID as key
      setReasonData((prevReasonData) => ({
        ...prevReasonData,
        [gameId]: reason,
      }));
    }
    setReasonPopupOpen(false);
    setReason("");
    // Show a message indicating data saved
    alert("Data saved");
  };

  const filteredGameData = gameData.filter((game) =>
    selectedLeague ? game.league === selectedLeague : true
  );

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
      let optionId;
      switch (selectedOption) {
        case "REG":
          optionId = "REG";
          break;
        case "OT":
          optionId = "OT";
          break;
        case "S/O":
          optionId = "S/O";
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
          reason: reasonData[game._id] || "", // Include reason for this game
        };
      } else {
        return game;
      }
    });

    console.log("GameData with Selected Radio Button and Reason:");
    console.log(updatedGameData);

    // Log the reason for each game
    updatedGameData.forEach((game) => {
      console.log(`Reason for Game ${game._id}:`, game.reason);
    });
  };

  const handleReasonCancel = () => {
    // Handle reason cancellation
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
            onClick={() => setSelectedLeague("NHL")}
          />
          <Tab
            className="league-select"
            label="NBA"
            onClick={() => setSelectedLeague("NBA")}
          />
          <Tab
            className="league-select"
            label="NFL"
            onClick={() => setSelectedLeague("NFL")}
          />
          <Tab
            className="league-select"
            label="MLB"
            onClick={() => setSelectedLeague("MLB")}
          />
          <Tab
            className="league-select"
            label="WWBA"
            onClick={() => setSelectedLeague("WWBA")}
          />
          <Tab
            className="league-select"
            label="CFL"
            onClick={() => setSelectedLeague("CFL")}
          />
          <Tab
            className="league-select"
            label="NCAAF"
            onClick={() => setSelectedLeague("NCAAF")}
          />
          <Tab
            className="league-select"
            label="UFL"
            onClick={() => setSelectedLeague("UFL")}
          />
          <Tab
            className="league-select"
            label="NCCA"
            onClick={() => setSelectedLeague("NCCA")}
          />
          <Tab
            className="league-select"
            label="NCAAB"
            onClick={() => setSelectedLeague("NCAAB")}
          />
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
                <TableCell>S/O</TableCell>
                <TableCell>EI</TableCell>
                <TableCell>Not Completed</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGameData.map((game) => (
                <TableRow key={game._id} className="table-row">
                  <TableCell>{game.visitor}</TableCell>
                  <TableCell>{game.home}</TableCell>

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
                    <RadioGroup
                      value={selectedValues[game._id]}
                      onChange={(event) => handleRadioChange(event, game._id)}
                    >
                      <FormControlLabel
                        value="S/O"
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
                    <Button
                      variant="contained"
                      disabled={isReasonButtonDisabled(game._id)}
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
                          <TextField
                            multiline
                            rows={8}
                            fullWidth
                            value={reasonData[game._id] || ""} // Use specific reason for this game
                            onChange={(e) =>
                              setReasonData((prevReasonData) => ({
                                ...prevReasonData,
                                [game._id]: e.target.value,
                              }))
                            }
                            variant="outlined"
                            label="Reason"
                            sx={{ width: "100%", resize: "both" }}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleReasonCancel} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleReasonSubmit} color="primary">
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
                <TableCell>S/O</TableCell>
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
                        value="S/O"
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
