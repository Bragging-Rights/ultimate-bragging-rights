// ScoreEntry.js

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
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getGamesByDate } from "../../Apis/games";
import { cloneDeep } from "lodash";

import "./TableData.css";

const ScoreEntry = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [gameData, setGameData] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleDateChange = (date) => {
    const month = (Number(date.$M) + 1).toString().padStart(2, "0");
    const day = date.$D.toString().padStart(2, "0");
    const year = date.$y;
    const formattedDate = `${month}-${day}-${year}`;

    getGamesByDate(formattedDate)
      .then((response) => {
        console.log(response);
        const updatedData = response.data.map((game) => ({
          ...game,
          vScore: "",
          hScore: "",
          selectedValue: "",
        }));
        setGameData(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isReasonButtonDisabled = !selectedValue; // Disable if no radio button is selected

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
    console.log(gameData);
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
            onClick={() => setSelectedLeague("NHL")} // Set selected league on tab click
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
                      value={game.selectedValue}
                      onChange={(e) =>
                        handleInputChange(
                          game._id,
                          "selectedValue",
                          e.target.value
                        )
                      }
                    >
                      <FormControlLabel
                        value="option1"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="option2"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>

                  <TableCell>
                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="option4"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="option5"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
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
                      disabled={isReasonButtonDisabled}
                    >
                      ADD REASON
                    </Button>
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
      {/* Card 2 */}
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
      <Paper className="score-entry-container" elevation={3}>
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
                  {/* <TableCell>{game.vScore}</TableCell>
                  <TableCell>{game.hScore}</TableCell>
                  <TableCell>{game.regulation}</TableCell>
                  <TableCell>{game.overtime}</TableCell>
                  <TableCell>{game.shootout}</TableCell>
                  <TableCell>{game.extraInfo}</TableCell>
                  <TableCell>{game.notCompleted}</TableCell>
                  <TableCell>{game.reason}</TableCell> */}

                  <TableCell>
                    <TextField variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <RadioGroup value={selectedValue}>
                      <FormControlLabel
                        value="option1"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup value={selectedValue}>
                      <FormControlLabel
                        value="option2"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>

                  <TableCell>
                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="option4"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="option5"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="option6"
                        control={<Radio size="small" />}
                        label=""
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained">ADD REASON</Button>
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
            className="centered-button" // Apply the centered-button class
          >
            ENTER SCORES
          </Button>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ScoreEntry;
