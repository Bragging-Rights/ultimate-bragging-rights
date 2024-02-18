import React, { createContext, useContext, useState } from "react";

const LeagueContext = createContext();

export const useLeagueContext = () => {
  return useContext(LeagueContext);
};

export const LeagueProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState("NHL");

  return (
    <LeagueContext.Provider value={{ selectedLeague, setSelectedLeague }}>
      {children}
    </LeagueContext.Provider>
  );
};
