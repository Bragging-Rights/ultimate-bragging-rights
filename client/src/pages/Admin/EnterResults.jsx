import React, { useState } from "react";
import { useQuery } from "react-query";
import { getGames, enterGameResults } from "../../services/games";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// Create a new component for the form within each card
function GameForm({ game, onUpdateGameData }) {
  const [formData, setFormData] = useState({
    finalScoreVisitor: "",
    finalScoreHome: "",
    gameEnding: "Regular",
  });

  const [resultEntered, setResultEntered] = useState(false);

  const handleResultChange = () => {
    // Set the resultEntered flag to false to enable result change
    setResultEntered(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the specific card's game data
    onUpdateGameData(game._id, formData);

    // Set the resultEntered flag to true
    setResultEntered(true);

    // Call your API to send the results to the backend
    enterGameResults(game._id, formData)
      .then((response) => {
        console.log("Data sent to the backend:", response);
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {resultEntered ? (
        <div>
          <h1 className="text-green-500">Result Entered!</h1>
          <button
            onClick={handleResultChange}
            className="bg-purple-500 text-white p-2 rounded"
          >
            Change Result
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="finalScoreVisitor">Final Score Visitor: </label>
            <input
              type="number"
              id="finalScoreVisitor"
              name="finalScoreVisitor"
              value={formData.finalScoreVisitor}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="finalScoreHome">Final Score Home: </label>
            <input
              type="number"
              id="finalScoreHome"
              name="finalScoreHome"
              value={formData.finalScoreHome}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gameEnding">Game Ending: </label>
            <select
              id="gameEnding"
              name="gameEnding"
              value={formData.gameEnding}
              onChange={handleChange}
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option value="Regular">Regular</option>
              <option value="Overtime">Overtime</option>
              {/* Add more game types as needed */}
            </select>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-black p-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

const EnterResults = () => {
  const [gameData, setGameData] = useState([]);
  const date = new Date();
  const formattedDateForAPI = format(date, "yyyy-MM-dd");

  useQuery(["teams", formattedDateForAPI, "NHL"], getGames, {
    onSuccess: (fetchedData) => {
      setGameData(fetchedData.data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  const updateGameData = (gameId, updatedData) => {
    // Find the game in gameData with the matching gameId
    const updatedGameData = gameData.map((game) => {
      if (game._id === gameId) {
        // Update the specific game data
        const updatedGame = {
          ...game,
          ...updatedData,
        };

        // Log the updated data to the console
        console.log("AdminResultstoGamesForRewards", updatedGame);

        return updatedGame;
      }
      return game;
    });

    // Update the state with the updated data
    setGameData(updatedGameData);
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl mb-4 align-items-center">
        Enter Results for today's matches:
      </h1>
      {/* <p>
        <span className="text-red-500">Red is Visitor</span>
        <br />
        <span className="text-blue-500">Blue is Home</span>
      </p> */}

      <div className="flex flex-wrap">
        {gameData.map((game) => (
          <div key={game._id} className="w-1/2 p-4 border border-yellow-400">
            <span>
              <span className="text-orange-500">Match: </span>{" "}
              <span className="">{game.visitor}</span>{" "}
              <span className="text-red-500">vs</span>{" "}
              <span className="">{game.home}</span>
            </span>
            <p>
              <span className="text-pink-500">ID: </span>
              <span>{game._id}</span>
            </p>
            <br />
            {/* Render the form component for this card */}
            <GameForm game={game} onUpdateGameData={updateGameData} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default EnterResults;
