import React, { createContext, useContext, useState } from "react";

const LeagueContext = createContext();

export const useLeagueContext = () => {
  return useContext(LeagueContext);
};

export const LeagueProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState("NHL");

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
  };

  return (
    <LeagueContext.Provider value={{ selectedLeague, handleLeagueSelect }}>
      {children}
    </LeagueContext.Provider>
  );
};
