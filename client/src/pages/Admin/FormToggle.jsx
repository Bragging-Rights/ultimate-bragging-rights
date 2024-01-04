import React, { useState } from "react";
import MainNavBar from "../../components/MainNavBar";
import EnterGames from "./EnterGames";
import EnterResults from "./EnterResults";
import LiveGames from "./LiveGames";
import UpdateGames from "./UpdateGames";

const FormToggle = () => {
  const [activeForm, setActiveForm] = useState("games"); // Initially, display Enter Games form

  const handleToggle = (formName) => {
    setActiveForm(formName);
  };

  return (
    <div>
      <MainNavBar></MainNavBar>
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => handleToggle("games")}
          className={`bg-darkgray-300 border border-ffb300 text-white px-4 py-2 rounded-full mr-4 ${
            activeForm === "games" ? "bg-ffb300 text-yellow-300" : ""
          }`}
        >
          Enter Games
        </button>

        <button
          onClick={() => handleToggle("edit")}
          className={`bg-darkgray-300 border border-ffb300 text-white px-4 py-2 rounded-full mr-4 ${
            activeForm === "edit" ? "bg-ffb300 text-yellow-300" : ""
          }`}
        >
          Edit Games
        </button>
        <button
          onClick={() => handleToggle("results")}
          className={`bg-darkgray-300 border border-ffb300 text-white px-4 py-2 rounded-full ${
            activeForm === "results" ? "bg-ffb300 text-yellow-300" : ""
          }`}
        >
          Enter Results
        </button>

        <button
          onClick={() => handleToggle("livegames")}
          className={`bg-darkgray-300 border border-ffb300 text-white px-4 py-2 rounded-full ${
            activeForm === "livegames" ? "bg-ffb300 text-yellow-300" : ""
          }`}
        >
          Live Games
        </button>
      </div>

      {activeForm === "games" ? (
        <EnterGames />
      ) : activeForm === "edit" ? (
        <UpdateGames />
      ) : activeForm === "results" ? (
        <EnterResults />
      ) : activeForm === "livegames" ? (
        <LiveGames />
      ) : null}
    </div>
  );
};

export default FormToggle;
