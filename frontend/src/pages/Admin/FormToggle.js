import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import EnterGames from "./EnterGames";
import EnterResults from "./EnterResults";
import LiveGames from "./LiveGames";
import UpdateGames from "./UpdateGames";
import EnterWeek from "./EnterWeek";
import "./ToggleButton.css";
import Season from "./Season";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "10px 20px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "2.5px",
    fontWeight: 500,
    color: "#fff",
    backgroundColor: "#4a5568",
    border: "1px solid #ffb300",
    borderRadius: "9999px",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease 0s",
    cursor: "pointer",
    outline: "none",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#ffb300",
    color: "#4a5568",
    transform: "translateY(-1px)",
    boxShadow: "0px 15px 20px rgba(214, 211, 43, 0.4)",
  },
}));

const FormToggle = () => {
  const classes = useStyles();
  const [activeForm, setActiveForm] = useState("games");

  const handleToggle = (formName) => {
    setActiveForm(formName);
  };

  const formButtons = [
    { label: "Enter Games", formName: "games" },
    { label: "Enter Results", formName: "results" },
    { label: "Live Games", formName: "livegames" },
    { label: "Enter Weeks", formName: "enterweeks" },
    { label: "Enter Seasons", formName: "enterseason" },
  ];

  return (
    <div>
      <div className="flex justify-center gap-3 mt-4">
        {formButtons.map((button) => (
          <button
            key={button.formName}
            onClick={() => handleToggle(button.formName)}
            className={`${classes.button} ${
              activeForm === button.formName ? "activebutton" : ""
            } button-toggle`}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeForm === "games" && <EnterGames />}
        {activeForm === "results" && <EnterResults />}
        {activeForm === "livegames" && <LiveGames />}
        {activeForm === "enterweeks" && <EnterWeek />}
        {activeForm === "enterseason" && <Season/>}
      </div>
    </div>
  );
};

export default FormToggle;
