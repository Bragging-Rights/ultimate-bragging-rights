import React, { useState } from "react";
import { useMutation } from "react-query";
import displayToast from "../../components/Alert/Alert";
import { getTeamsByLeague } from "../../Apis/Teams"; // Corrected typo in function name
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { createWeek } from "../../Apis/weeks";

// Placeholder function for addGame
const addGame = (data) => {
  createWeek(data);
};

const EnterWeek = () => {
  const initialFormData = {
    league: "",
    season: "",
    startDate: "",
    endDate: "",
  };

  const [gameRows, setGameRows] = useState([initialFormData]);

  const { mutate } = useMutation((data) => addGame(data), {
    onError: (err) => {
      console.error("Error adding game:", err);
      displayToast("An error occurred while adding the game.", "error");
    },
    onSuccess: () => {
      displayToast("Game added successfully.", "success");
    },
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedGameRows = [...gameRows];
    updatedGameRows[index][name] = value;
    setGameRows(updatedGameRows);
  };

  const handleAddGameCard = () => {
    setGameRows([...gameRows, initialFormData]);
  };

  const handleRemoveGameCard = (index) => {
    const updatedGameRows = [...gameRows];
    updatedGameRows.splice(index, 1);
    setGameRows(updatedGameRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = [];

    if (gameRows.length === 0) {
      displayToast("Please add at least one game.", "warning");
      return;
    }

    gameRows.forEach((row, index) => {
      if (!row.league) {
        missingFields.push(`League for game ${index + 1}`);
      }
    });

    if (missingFields.length > 0) {
      displayToast(
        `Please add the following fields: ${missingFields.join(", ")}.`,
        "error"
      );
    } else {
      const relevantData = gameRows.map(
        ({ league, season, startDate, endDate }) => ({
          league,
          season,
          startDate,
          endDate,
        })
      );
      console.log("Form Data:", relevantData); // Show relevant form data in console
      mutate(gameRows);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4 align-items-center">
        Enter Game Details
      </h2>
      <form
        onSubmit={handleSubmit}
        className="justify-center items-center h-screen text-yellow-500"
      >
        {gameRows.map((row, index) => (
          <div key={index}>
            {index > 0 && (
              <div className="flex justify-end mb-4">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveGameCard(index)}
                >
                  <ClearIcon />
                </Button>
              </div>
            )}
            <div className="flex flex-wrap -mx-2">
              <div className="mb-4 px-2">
                <label htmlFor={`league${index}`}>League</label>
                <select
                  id={`league${index}`}
                  name="league"
                  value={row.league}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                >
                  <option value="">Select a league</option>
                  <option value="NFL">NFL</option>
                  <option value="NBA">NBA</option>
                  <option value="NHL">NHL</option>
                  <option value="MLB">MLB</option>
                </select>
              </div>
              <div className="mb-4 px-2">
                <label htmlFor={`season${index}`}>Season</label>
                <select
                  id={`season${index}`}
                  name="season"
                  value={row.season}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                >
                  <option value="">Select a season</option>
                  <option value="Pre Season">Pre</option>
                  <option value="Regular">Reg</option>
                  <option value="Playoffs">Post</option>
                </select>
              </div>
              <div className="mb-4 px-2">
                <label htmlFor={`startDate${index}`}>Start Date</label>
                <input
                  type="date"
                  id={`startDate${index}`}
                  name="startDate"
                  value={row.startDate}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>
              <div className="mb-4 px-2">
                <label htmlFor={`endDate${index}`}>End Date</label>
                <input
                  type="date"
                  id={`endDate${index}`}
                  name="endDate"
                  value={row.endDate}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4 flex w-full gap-7">
          <Button
            variant="contained"
            color="success"
            onClick={handleAddGameCard}
          >
            Add More +
          </Button>
        </div>
        <br />
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#FFD700",
            color: "rgba(0, 0, 0, 1)",
          }}
          onClick={handleSubmit}
        >
          Submit ✔
        </Button>
      </form>
    </div>
  );
};

export default EnterWeek;
