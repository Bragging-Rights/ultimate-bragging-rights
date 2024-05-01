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

import "./TableData.css";

const ScoreEntry = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [selectedValue, setSelectedValue] = useState("");

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
    const data = month + "-" + day + "-" + year;
    console.log(data);
    getGamesByDate(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Tab label="NHL" />
          <Tab label="NBA" />
          <Tab label="NFL" />
          <Tab label="MLB" />
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
              <TableRow className="table-row">
                <TableCell>VISITING TEAM</TableCell>
                <TableCell>HOME TEAM</TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" />
                </TableCell>

                <TableCell>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label=""
                    />
                  </RadioGroup>
                </TableCell>
                <TableCell>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label=""
                    />
                  </RadioGroup>
                </TableCell>
                <TableCell>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label=""
                    />
                  </RadioGroup>
                </TableCell>
                <TableCell>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label=""
                    />
                  </RadioGroup>
                </TableCell>
                <TableCell>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label=""
                    />
                  </RadioGroup>
                </TableCell>
                <TableCell>
                  <Button variant="contained">ADD REASON</Button>
                </TableCell>
              </TableRow>
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
          <Tab label="NHL" />
          <Tab label="NBA" />
          <Tab label="NFL" />
          <Tab label="MLB" />
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
              <TableRow className="table-row">
                <TableCell>VISITING TEAM</TableCell>
                <TableCell>HOME TEAM</TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" />
                </TableCell>
                <TableCell>
                  <RadioGroup
                    value={selectedValue}
                    onChange={handleRadioChange}
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
                  <Button variant="contained">ADD REASON</Button>
                </TableCell>
              </TableRow>
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
