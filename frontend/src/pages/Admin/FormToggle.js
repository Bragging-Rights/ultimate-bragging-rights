import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import MainNavBar from "../../components/MainNavBar";
import EnterGames from "./EnterGames";
import EnterResults from "./EnterResults";
import LiveGames from "./LiveGames";
import UpdateGames from "./UpdateGames";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    maxWidth: 800,
    margin: "0 auto",
  },
  button: {
    backgroundColor: "#4a5568",
    border: "1px solid #ffb300",
    color: "#fff",
    padding: theme.spacing(1, 2),
    borderRadius: "9999px",
    transition: "background-color 0.3s, color 0.3s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ffb300",
      color: "#4a5568",
    },
  },
  activeButton: {
    backgroundColor: "#ffb300",
    color: "#4a5568",
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
    { label: "Edit Games", formName: "edit" },
    { label: "Enter Results", formName: "results" },
    { label: "Live Games", formName: "livegames" },
  ];

  return (
    <div>
      <MainNavBar />
      <div className="flex justify-center gap-3 mt-4">
        {formButtons.map((button) => (
          <Button
            key={button.formName}
            onClick={() => handleToggle(button.formName)}
            className={`${classes.button} ${
              activeForm === button.formName ? classes.activeButton : ""
            }`}
          >
            {button.label}
          </Button>
        ))}
      </div>

      <div className="mt-8">
        {activeForm === "games" && <EnterGames />}
        {activeForm === "edit" && <UpdateGames />}
        {activeForm === "results" && <EnterResults />}
        {activeForm === "livegames" && <LiveGames />}
      </div>
    </div>
  );
};

export default FormToggle;
