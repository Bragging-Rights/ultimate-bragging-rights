import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; // You'll need to install this library

import "react-datepicker/dist/react-datepicker.css";

const EnterResults = () => {
  const initialFormData = {
    date: new Date(),
    visitorTeamScore: "",
    homeTeamScore: "",
    gameType: "Regular",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [games, setGames] = useState([]);

  // Fetch games based on the selected date (you'll need to implement this logic)
  useEffect(() => {
    // Add your logic to fetch games from the database based on formData.date
    // Update the games state with the fetched data
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the game data to be added to the database
    const gameData = {
      date: formData.date,
      visitorTeamScore: formData.visitorTeamScore,
      homeTeamScore: formData.homeTeamScore,
      gameType: formData.gameType,
    };

    // Add your logic here to send the gameData to your backend API to save in the database
    // You can use a fetch or axios request to send the data
    // For example, if you have an API endpoint /api/addGame, you can send data like this:
    /*
    fetch("/api/addGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game data added:", data);
        // Optionally, you can clear the form fields or perform other actions after successful submission
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error adding game data:", error);
      });
    */
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl mb-4 align-items-center">Enter Results</h2>
      <form onSubmit={handleSubmit} className="text-yellow-500">
        <div className="mb-4 w-1/8 px-2">
          <label htmlFor="date">Select Date: </label>
          <DatePicker
            id="date"
            name="date"
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            className="bg-gray-800 text-white p-2 rounded w-full"
          />
        </div>
        <div className="mb-4 w-1/2 px-2">
          <label htmlFor="visitorTeamScore">Visitor Team Score: </label>
          <input
            type="number"
            id="visitorTeamScore"
            name="visitorTeamScore"
            value={formData.visitorTeamScore}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded w-full"
          />
        </div>
        <div className="mb-4 w-1/2 px-2">
          <label htmlFor="homeTeamScore">Home Team Score: </label>
          <input
            type="number"
            id="homeTeamScore"
            name="homeTeamScore"
            value={formData.homeTeamScore}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded w-full"
          />
        </div>
        <div className="mb-4 w-1/2 px-2">
          <label htmlFor="gameType">Game Type: </label>
          <select
            id="gameType"
            name="gameType"
            value={formData.gameType}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded w-full"
          >
            <option value="Regular">Regular</option>
            <option value="Overtime">Overtime</option>
            {/* Add more game types as needed */}
          </select>
        </div>
        <button type="submit" className="bg-yellow-500 text-black p-2 rounded">
          Submit
        </button>{" "}
      </form>
    </div>
  );
};

export default EnterResults;
