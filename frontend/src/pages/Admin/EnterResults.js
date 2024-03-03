import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getGames, enterGameResults } from "../../Apis/games";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useLeagueContext } from "../../components/LeagueContext";
import displayToast from "../../components/Alert/Alert";

// Create a new component for the form within each card
function GameForm({ game, onUpdateGameData }) {
  const [formData, setFormData] = useState({
    vFinalScore: "",
    hFinalScore: "",
    gameEnd: "Regular",
    stateReason: "",
  });

  const [resultEntered, setResultEntered] = useState(false);

  const handleResultChange = () => {
    // Set the resultEntered flag to false to enable result change
    setResultEntered(false);
  };

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (data) => enterGameResults(data),
    {
      onSuccess: (data) => {
        displayToast("Result added successfully", "success");
      },
      onError: (error) => {
        displayToast("Error while adding result", "error");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the specific card's game data
    onUpdateGameData(game._id, formData);

    // Set the resultEntered flag to true
    setResultEntered(true);
    console.log("formData", formData);
    mutate({
      ...formData,
      game_id: game._id,
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
          <div className="flex space-x-4 w-full">
            <div className="mb-2 w-1/2">
              <label htmlFor="vFinalScore">{game.visitor}</label>
              <input
                type="number"
                id="vFinalScore"
                name="vFinalScore"
                value={formData.vFinalScore}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded w-1/3"
              />
            </div>
            <span className="" style={{ marginRight: "10px" }}>
              vs
            </span>
            <div className="mb-4 w-1/2">
              <label htmlFor="hFinalScore">{game.home}</label>
              <input
                type="number"
                id="hFinalScore"
                name="hFinalScore"
                value={formData.hFinalScore}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded w-1/3"
              />
            </div>
            <div className="mb-4  w-1/2" style={{ marginLeft: "10px" }}>
              <label htmlFor="gameEnd">type</label>
              <select
                id="gameEnd"
                name="gameEnd"
                value={formData.gameEnd}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded w-1/3"
              >
                <option value="Regular">Regular</option>
                <option value="Overtime">Overtime</option>
                <option value="Postponed">Postponed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="stateReason">State Reason</label>
              <input
                type="text"
                id="stateReason"
                name="stateReason"
                value={formData.stateReason}
                onChange={handleChange}
                className="bg-gray-800 text-white p-2 rounded w-full"
                // Conditionally hide/show based on gameEnd value
                style={{
                  display: formData.gameEnd === "Cancelled" ? "block" : "none",
                }}
              />
            </div>
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
  const { selectedLeague } = useLeagueContext();
  console.log("selectedLeague", selectedLeague);
  const [gameData, setGameData] = useState([]);
  const date = new Date();
  const formattedDateForAPI = format(date, "yyyy-MM-dd");

  const { data: fetchedData, refetch } = useQuery(
    ["matches", formattedDateForAPI, selectedLeague],
    getGames,

    {
      onSuccess: (data) => {
        setGameData(data.data);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
      enabled: false,
    }
  );

  useEffect(() => {
    if (selectedLeague) {
      refetch();
    }
  }, [selectedLeague]);

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

      {gameData.map((game) => (
        <div key={game._id} className="mr-2 p-4 border border-blue-300 mt-2">
          <GameForm game={game} onUpdateGameData={updateGameData} />
        </div>
      ))}
    </div>
  );
};
export default EnterResults;
