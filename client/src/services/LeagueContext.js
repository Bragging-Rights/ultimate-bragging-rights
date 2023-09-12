// LeagueContext.js
import React, { createContext, useContext, useState } from "react";

// Create a new context
const LeagueContext = createContext();

// Create a context provider component
export const LeagueProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState("NHL");
  const [gameData, setGameData] = useState([]);

  return (
    <LeagueContext.Provider
      value={{
        selectedLeague,
        setSelectedLeague,
        gameData,
        setGameData,
      }}
    >
      {children}
    </LeagueContext.Provider>
  );
};

// Create a custom hook to access the context
export const useLeagueContext = () => {
  return useContext(LeagueContext);
};
