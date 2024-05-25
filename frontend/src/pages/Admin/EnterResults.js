import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getGames, enterGameResults } from "../../Apis/games";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useLeagueContext } from "../../components/LeagueContext";
import displayToast from "../../components/Alert/Alert";
import TableData from "./TableData";

function GameForm({ game, onUpdateGameData }) {
  const [formData, setFormData] = useState({
    vFinalScore: "",
    hFinalScore: "",
    gameEnd: "Regular",
    stateReason: "",
  });

  const [resultEntered, setResultEntered] = useState(false);

  const handleResultChange = () => {
    setResultEntered(false);
  };

  const { mutate, reset } = useMutation((data) => enterGameResults(data), {
    onSuccess: () => {
      displayToast("Result added successfully", "success");
    },
    onError: () => {
      displayToast("Error while adding result", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.forEach((data, index) => {
      onUpdateGameData(game[index]._id, data);
      mutate({
        ...data,
        game_id: game[index]._id,
      });
    });
    setResultEntered(true);
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
  const [gameData, setGameData] = useState([]);
  const date = new Date();
  const formattedDateForAPI = format(date, "yyyy-MM-dd");

  const initialFormData = {
    time: "",
    visitorTeam: "",
    vML: "",
    vSprd: "",
    vSprdOdds: "",
    vOU: "",
    vOUOdds: "",
    homeTeam: "",
    hML: "",
    hSprd: "",
    hSprdOdds: "",
    hOU: "",
    hOUOdds: "",
    sport: "",
  };

  // console.log("Initial Form Data:", initialFormData);

  const { refetch } = useQuery(
    ["matches", formattedDateForAPI, selectedLeague],
    getGames,
    {
      onSuccess: (data) => {
        setGameData(data.data);
        // console.log("Game Data:", data.data);
      },
      onError: (error) => {
        console.error("An error occurred:", error);
      },
      enabled: !!selectedLeague,
    }
  );

  // useEffect(() => {
  //   if (selectedLeague) {
  //     // refetch();
  //   }
  // }, [selectedLeague]);

  const updateGameData = (gameId, updatedData) => {
    setGameData((prevGameData) => {
      return prevGameData.map((game) => {
        if (game._id === gameId) {
          return {
            ...game,
            ...updatedData,
          };
        }
        return game;
      });
    });
  };

  return (
    <div className="p-4 text-white">
      <TableData gameData={gameData} onUpdateGameData={updateGameData} />
    </div>
  );
};

export default EnterResults;
