import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getGames } from "../../services/games";
import "react-datepicker/dist/react-datepicker.css";
import { format, add } from "date-fns";

const EnterResults = () => {
  const [gameData, setGameData] = useState([]);

  const date = new Date();
  const formattedDateForAPI = format(date, "yyyy-MM-dd");

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
  } = useQuery(["teams", formattedDateForAPI, "NHL"], getGames, {
    onSuccess: (fetchedData) => {
      console.log("fetchedData", fetchedData);
      setGameData(fetchedData.data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  const initialFormData = {
    finalScoreVisitor: "",
    finalScoreHome: "",
    gameEnding: "Regular",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e, gameId) => {
    e.preventDefault();

    // Find the game in gameData with the matching gameId
    const updatedGameData = gameData.map((game) => {
      if (game._id === gameId) {
        return {
          ...game,
          finalScoreVisitor: formData.finalScoreVisitor,
          finalScoreHome: formData.finalScoreHome,
          gameEnding: formData.gameEnding,
        };
      }
      return game;
    });

    setGameData(updatedGameData);
    setFormData(initialFormData); // Clear the form input values
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl mb-4 align-items-center">
        Enter Results for today's matches:
      </h1>
      <p>
        <span className="text-red-500">Red is Visitor</span>
        <br></br>
        <span className="text-blue-500">Blue is Home</span>
      </p>

      <div className="flex flex-wrap">
        {gameData.map((game) => (
          <div key={game._id} className="w-1/2 p-4 border border-gray-400">
            <p>
              Match: <span className="text-red-500">{game.visitor}</span> vs{" "}
              <span className="text-blue-500">{game.home}</span>
            </p>
            <p>
              ID: <span className="text-green-500">{game._id}</span>
            </p>
            <br></br>
            <form
              key={game._id}
              onSubmit={(e) => handleSubmit(e, game._id)}
              className="text-yellow-500"
            >
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
              </button>{" "}
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnterResults;
