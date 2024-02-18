import React, { useState } from "react";
import GameForm from "./GameForm";
import GameCard from "./GameCard";

const ParentComponent = () => {
  const [gameData, setGameData] = useState(null); // State to hold form data

  // Callback function to receive form data from GameForm
  const handleFormSubmit = (formData) => {
    setGameData(formData);
  };

  return (
    <div>
      <GameForm onSubmit={handleFormSubmit} />
      {/* Pass gameData as a prop to GameCard */}
      <GameCard gameData={gameData} />
    </div>
  );
};

export default ParentComponent;
