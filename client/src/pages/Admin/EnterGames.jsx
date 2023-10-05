import React, { useState } from "react";
import MainNavBar from "../../components/MainNavBar";

const GameForm = () => {
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
  };

  const [gameCards, setGameCards] = useState([]);
  const [formData, setFormData] = useState({
    league: "",
    season: "",
    date: "",
  });

  const generateSeasonOptions = () => {
    return (
      <>
        <option value="">Select a season</option>
        <option value="Pre Season">Pre Season</option>
        <option value="Regular">Regular</option>
        <option value="Playoffs">Playoffs</option>
      </>
    );
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedGameCards = [...gameCards];
    updatedGameCards[index][name] = value;
    setGameCards(updatedGameCards);
  };

  const handleAddGameCard = () => {
    setGameCards([...gameCards, { ...formData }]);
    setFormData(initialFormData);
  };

  const handleRemoveGameCard = (index) => {
    const updatedGameCards = [...gameCards];
    updatedGameCards.splice(index, 1);
    setGameCards(updatedGameCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", gameCards);
    // You can add code to send the data to your server here
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4 align-items-center">
        Enter Game Details
      </h2>
      <form
        onSubmit={handleSubmit}
        className="text-white justify-center items-center h-screen text-yellow-500"
      >
        <div className="flex flex-wrap -mx-2 ">
          <div className="mb-4 w-1/4 px-2">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>

          <div className="mb-4 w-1/4 px-2">
            <label htmlFor="league">League</label>
            <input
              type="text"
              id="league"
              name="league"
              value={formData.league}
              onChange={(e) =>
                setFormData({ ...formData, league: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>

          <div className="mb-4 w-1/4 px-2">
            <label htmlFor="season">Season</label>
            <select
              id="season"
              name="season"
              value={formData.season}
              onChange={(e) =>
                setFormData({ ...formData, season: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              {generateSeasonOptions()}
            </select>
          </div>
        </div>
        {gameCards.map((gameCard, index) => (
          <div key={index} className="mb-4">
            <div className="mb-4 w-full flex justify-between">
              <div className="mb-2 pt-6">
                <button
                  type="button"
                  onClick={() => handleRemoveGameCard(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  X
                </button>
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`time-${index}`}>Time</label>
                <input
                  type="time"
                  id={`time-${index}`}
                  name={`time`}
                  value={gameCard.time}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>
              <div className="w-1/3 px-2">
                <label htmlFor={`visitorteam-${index}`}>Visitor</label>
                <input
                  type="text"
                  id={`visitorteam-${index}`}
                  name={`visitorTeam`}
                  value={gameCard.visitorTeam}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`vML-${index}`}>V M/L</label>
                <input
                  type="number"
                  id={`vML-${index}`}
                  name={`vML`}
                  value={gameCard.vML}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`vSprd-${index}`}>V Sprd</label>
                <input
                  type="number"
                  id={`vSprd-${index}`}
                  name={`vSprd`}
                  value={gameCard.vSprd}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`vSprdOdds-${index}`}>VSprdOdds</label>
                <input
                  type="number"
                  id={`vSprdOdds-${index}`}
                  name={`vSprdOdds`}
                  value={gameCard.vSprdOdds}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full "
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`vOU-${index}`}>V O/U</label>
                <input
                  type="number"
                  id={`vOU-${index}`}
                  name={`vOU`}
                  value={gameCard.vOU}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`vOUOdds-${index}`}>VOUOdds</label>
                <input
                  type="number"
                  id={`vOUOdds-${index}`}
                  name={`vOUOdds`}
                  value={gameCard.vOUOdds}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="h-[100%] w-px bg-gray-500 mx-2"></div>

              <div className="w-1/4 px-2">
                <label htmlFor={`hometeam-${index}`}>Home</label>
                <input
                  type="text"
                  id={`hometeam-${index}`}
                  name={`homeTeam`}
                  value={gameCard.homeTeam}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`hML-${index}`}>H M/L</label>
                <input
                  type="number"
                  id={`hML-${index}`}
                  name={`hML`}
                  value={gameCard.hML}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`hSprd-${index}`}>H Sprd</label>
                <input
                  type="number"
                  id={`hSprd-${index}`}
                  name={`hSprd`}
                  value={gameCard.hSprd}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`hSprdOdds-${index}`}>HSprdOdds</label>
                <input
                  type="number"
                  id={`hSprdOdds-${index}`}
                  name={`hSprdOdds`}
                  value={gameCard.hSprdOdds}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`hOU-${index}`}>H OU</label>
                <input
                  type="number"
                  id={`hOU-${index}`}
                  name={`hOU`}
                  value={gameCard.hOU}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="w-1/8 px-2">
                <label htmlFor={`hOUOdds-${index}`}>HOUOdds</label>
                <input
                  type="number"
                  id={`hOUOdds-${index}`}
                  name={`hOUOdds`}
                  value={gameCard.hOUOdds}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4 w-1/2 px-2">
          <button
            type="button"
            onClick={handleAddGameCard}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Add Game Card
          </button>
        </div>
        <button type="submit" className="bg-yellow-500 text-black p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GameForm;
