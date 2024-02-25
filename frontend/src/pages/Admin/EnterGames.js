import React, { useState, useEffect } from "react";
import { addGame } from "../../Apis/games";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import displayToast from "../../components/Alert/Alert";
import { getTeasmByLeage } from "../../Apis/Teams";
// import Footer from "../../components/Footer";
// import handleTimeConversionToLocal from "../../services/ConvertTime";
import Button from "@mui/material/Button";

const GameForm = () => {
  const dispatch = useDispatch();
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

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gameCards, setGameCards] = useState([]);
  const [formData, setFormData] = useState({
    week: "",
    league: "",
    season: "",
    date: "",
  });

  const [teams, setTeams] = useState([]);

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (data) => addGame(data),
    {
      onError: (err) => {
        console.error("Error adding game:", err);
        displayToast("An error occurred while adding the game.", "error");
      },
      onSuccess: (rec) => {
        displayToast("Game added successfully.", "success");

        reset();
      },
    }
  );

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
  } = useQuery(["teams", formData.league], getTeasmByLeage, {
    enabled: !!formData.league, // Fetch only if formData.league is truthy
    onError: (err) => {
      displayToast("An error occurred while getting the game.", "error");
    },
    onSuccess: (rec) => {
      setTeams(rec.data);
    },
  });

  const generateSeasonOptions = () => {
    return (
      <>
        <option value="">Select a season</option>
        <option value="Pre Season">Pre</option>
        <option value="Regular">Reg</option>
        <option value="Playoffs">Post</option>
      </>
    );
  };

  const generateLeagueOptions = () => {
    return (
      <>
        <option value="">Select a league</option>
        <option value="NFL">NFL</option>
        <option value="NBA">NBA</option>
        <option value="NHL">NHL</option>
        <option value="MLB">MLB</option>
      </>
    );
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedGameCards = [...gameCards];

    // Update the field with the entered value
    updatedGameCards[index][name] = value;

    // Mirror the Spread values for home team if it's the visitor's Spread

    // Mirror the Over/Under values for home team if it's the visitor's Over/Under

    setGameCards(updatedGameCards);
  };

  const getFilteredTeams = (selectedTeam) => {
    return teams.filter((team) => team.displayName !== selectedTeam);
  };

  const handleAddGameCard = () => {
    const { league, season, date, week } = formData;

    // Check if any of the required values is undefined or empty
    if (!league || !season || !date || !week) {
      displayToast("Incomplete form data. Unable to add game card.");
      return;
    }

    // Determine the sport based on the selected league
    let sport = "";
    if (league === "NFL") {
      sport = "football";
    } else if (league === "NBA") {
      sport = "basketball";
    } else if (league === "NHL") {
      sport = "hockey";
    } else if (league === "MLB") {
      sport = "baseball";
    }

    // Use the extracted values to construct new game card
    const newGameCard = {
      league,
      season,
      date,
      week,
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

    // Create a new copy of the formData object for each game card
    setGameCards((prevGameCards) => [...prevGameCards, newGameCard]);

    // Clear only the other fields, not season, league, and date
    setFormData((prevFormData) => ({
      ...prevFormData,
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
    }));

    // if (!newGameCard.time) {
    //   displayToast("Please enter a time for the game.", "error");
    //   return;
    // }

    // Filter out the selected teams from the opposite dropdown
    const filteredTeams = getFilteredTeams(newGameCard.visitorTeam);
    setTeams(filteredTeams);
  };

  const handleRemoveGameCard = (index) => {
    const updatedGameCards = [...gameCards];
    updatedGameCards.splice(index, 1);
    setGameCards(updatedGameCards);
  };

  const handleResetForm = () => {
    setGameCards([]);
    setFormData({
      ...initialFormData,
      week: "",
      league: "",
      season: "",
      date: "",
    });
    setFormSubmitted(false); // Reset the formSubmitted state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameCards?.length === 0) {
      return;
    }

    // console.log(gameCards);

    if (formSubmitted) {
      displayToast("Form already submitted.", "warning");
      return;
    }

    const missingFields = [];

    // Check each game card for missing fields
    gameCards.forEach((gameCard, index) => {
      if (!gameCard.time) {
        missingFields.push(`Time for game ${index + 1}`);
      }

      if (!gameCard.visitorTeam) {
        missingFields.push(`Visitor Team for game ${index + 1}`);
      }
      // if (gameCard.vML === "") {
      //   missingFields.push(`Visitor M/L for game ${index + 1}`);
      // }
      // if (gameCard.vSprd === "") {
      //   missingFields.push(`V Sprd for game ${index + 1}`);
      // }
      // if (gameCard.vSprdOdds === "") {
      //   missingFields.push(`V Sprd Odds for game ${index + 1}`);
      // }
      // if (gameCard.vOU === "") {
      //   missingFields.push(`V O/U for game ${index + 1}`);
      // }
      // if (gameCard.vOUOdds === "") {
      //   missingFields.push(`V O/U Odds for game ${index + 1}`);
      // }
      // if (!gameCard.homeTeam) {
      //   missingFields.push(`Home Team for game ${index + 1}`);
      // }
      // if (gameCard.hML === "") {
      //   missingFields.push(`Home M/L for game ${index + 1}`);
      // }
      // if (gameCard.hSprd === "") {
      //   missingFields.push(`H Sprd for game ${index + 1}`);
      // }
      // if (gameCard.hSprdOdds === "") {
      //   missingFields.push(`H Sprd Odds for game ${index + 1}`);
      // }
      // if (gameCard.hOU === "") {
      //   missingFields.push(`H O/U for game ${index + 1}`);
      // }
      // if (gameCard.hOUOdds === "") {
      //   missingFields.push(`H O/U Odds for game ${index + 1}`);
      // }
    });

    if (missingFields.length > 0) {
      displayToast(
        `Please add the following fields: ${missingFields.join(", ")}.`,
        "error"
      );
    } else {
      mutate([...gameCards]);
      setFormSubmitted(true);
    }
  };

  const handlePaste = (e, index) => {
    const data = e.clipboardData.getData("text");

    const values = data.split("\n");
    // console.log(values);

    let cleanedData = values.map((item) => item.replace(/[\r|o|u]/g, ""));

    const updatedGameCards = [...gameCards];

    updatedGameCards[index].vSprd = cleanedData[0];
    updatedGameCards[index].vSprdOdds = cleanedData[1];
    updatedGameCards[index].vML = cleanedData[2];
    updatedGameCards[index].vOU = cleanedData[3];
    updatedGameCards[index].vOUOdds = cleanedData[4];
    updatedGameCards[index].hSprd = cleanedData[5];
    updatedGameCards[index].hSprdOdds = cleanedData[6];
    updatedGameCards[index].hML = cleanedData[7];
    updatedGameCards[index].hOU = cleanedData[8];
    updatedGameCards[index].hOUOdds = cleanedData[9];

    // Assuming you have a state setter for gameCards
    setGameCards(updatedGameCards);
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
        <div className="flex flex-wrap -mx-2 ">
          <div className="mb-4 px-2">
            <label htmlFor="week">Week</label>
            <select
              id="week"
              name="week"
              value={formData.week}
              onChange={(e) =>
                setFormData({ ...formData, week: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option value="">Select a week</option>
              {[...Array(40)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  Week {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4  px-2">
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

          <div className="mb-4  px-2">
            <label htmlFor="league">League</label>
            <select
              id="league"
              name="league"
              value={formData.league}
              onChange={(e) =>
                setFormData({ ...formData, league: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              {generateLeagueOptions()} {/* Call the new function */}
            </select>
          </div>

          <div className="mb-4  px-2">
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
          <div
            key={index}
            className="game-card"
            style={{ backgroundColor: "" }}
          >
            <div className="flex flex-row">
              <div
                className="mb-2 pt-6"
                style={{
                  marginRight: "30px",
                  marginTop: "-50px",
                  marginLeft: "-10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleRemoveGameCard(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  X
                </button>
              </div>

              <div
                className="w-1/2 px-2 box box h-18 w-40"
                style={{ marginRight: "20px", marginBottom: "8px" }}
              >
                <label htmlFor={`time-${index}`}>Game Time</label>
                <input
                  type="time"
                  id={`time-${index}`}
                  name={`time`}
                  value={gameCard.time}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full "
                />
              </div>
              <div
                className="px-2 box box h-18 w-40"
                style={{ marginBottom: "8px" }}
              >
                <label htmlFor={`data-${index}`}>Data Paste</label>
                <input
                  type="text"
                  id={`data-${index}`}
                  name={`data`}
                  onPaste={(e) => handlePaste(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full "
                />
              </div>
              {/* <div
                className="w-1/5 px-2 box box h-18 w-20"
                style={{ marginRight: "90px" }}
              >
                <label>MoneyLine</label>
              </div>
              <div
                className="w-1/5 px-2 box box h-18 w-20"
                style={{ marginRight: "90px" }}
              >
                <label>Spread</label>
              </div>
              <div
                className="w-1/5 px-2 box box h-18 w-20 align-items-center justify-between"
                style={{ marginRight: "70px" }}
              >
                <label>Spread Odds</label>
              </div>
              <div
                className="w-1/5 px-2 box box h-18 w-20 align-items-center justify-between"
                style={{ marginRight: "90px" }}
              >
                <label>Over/Under</label>
              </div>
              <div
                className="w-1/5 px-2 box box h-18 w-20 align-items-center justify-between"
                style={{ marginRight: "90px" }}
              >
                <label>Over/Under Odds</label>
              </div> */}
            </div>

            <div className="flex gap-2">
              <div
                className=" box box h-18 w-60"
                style={{ marginLeft: "40px" }}
              >
                <label htmlFor={`visitorteam-${index}`}>Visitor Team</label>
                <select
                  id={`visitorteam-${index}`}
                  name={`visitorTeam`}
                  value={gameCard.visitorTeam}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                >
                  <option value=""></option>
                  {loadingTeams ? (
                    <option value="" disabled>
                      Loading teams...
                    </option>
                  ) : (
                    teams.map((team) => (
                      <option key={team.id} value={team.displayName}>
                        {team.displayName}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`vSprd-${index}`}>V Sprd</label>
                <input
                  type="number"
                  id={`vSprd-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`vSprd`}
                  value={gameCard.vSprd}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`vSprdOdds-${index}`}>V Sprd Odds</label>
                <input
                  type="number"
                  id={`vSprdOdds-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`vSprdOdds`}
                  value={gameCard.vSprdOdds}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`vML-${index}`}>Visitor M/L</label>
                <input
                  type="number"
                  id={`vML-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`vML`}
                  value={gameCard.vML}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`vOU-${index}`}>V O/U</label>
                <input
                  type="number"
                  id={`vOU-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`vOU`}
                  value={gameCard.vOU}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`vOUOdds-${index}`}>V O/U Odds</label>
                <input
                  type="number"
                  id={`vOUOdds-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`vOUOdds`}
                  value={gameCard.vOUOdds}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-5 ">
              <div className="box box h-18 w-60" style={{ marginLeft: "40px" }}>
                <label htmlFor={`hometeam-${index}`}>Home Team</label>
                <select
                  id={`hometeam-${index}`}
                  name={`homeTeam`}
                  value={gameCard.homeTeam}
                  onChange={(e) => handleChange(e, index)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                >
                  <option value=""></option>
                  {loadingTeams ? (
                    <option value="" disabled>
                      Loading teams...
                    </option>
                  ) : (
                    getFilteredTeams(gameCard.visitorTeam).map((team) => (
                      <option key={team.id} value={team.displayName}>
                        {team.displayName}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className=" px-2 box box h-18">
                <label htmlFor={`hSprd-${index}`}>H Sprd</label>
                <input
                  type="number"
                  id={`hSprd-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`hSprd`}
                  value={gameCard.hSprd}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`hSprdOdds-${index}`}>H Sprd Odds</label>
                <input
                  type="number"
                  id={`hSprdOdds-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`hSprdOdds`}
                  value={gameCard.hSprdOdds}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`hML-${index}`}>Home M/L</label>
                <input
                  type="number"
                  id={`hML-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`hML`}
                  value={gameCard.hML}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className=" px-2 box box h-18 ">
                <label htmlFor={`hOU-${index}`}>H O/U</label>
                <input
                  type="number"
                  id={`hOU-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`hOU`}
                  value={gameCard.hOU}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="px-2 box box h-18 ">
                <label htmlFor={`hOUOdds-${index}`}>H O/U Odds</label>
                <input
                  type="number"
                  id={`hOUOdds-${index}`}
                  onPaste={(e) => handlePaste(e, index)}
                  name={`hOUOdds`}
                  value={gameCard.hOUOdds}
                  onChange={(e) => handleChange(e, index)}
                  step="0.1"
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4 flex w-full gap-7">
          <Button
            variant="contained"
            color="success" // Assuming you want a green background
            onClick={handleAddGameCard}
          >
            Add Games +
          </Button>

          {/* <button
            type="button"
            onClick={handleResetForm}
            className="bg-red-500 text-white py-2 rounded px-5"
            style={{ marginLeft: "10px" }}
          >
            Reset Form
          </button> */}
        </div>
        <br />
        <Button
      type="submit"
      variant="contained"
      style={{
        backgroundColor: "#FFD700", // Yellow color
        color: "rgba(0, 0, 0, 1)", // Black color
      }}
      onClick={handleSubmit}
    >
      Submit ✔
    </Button>
      </form>
    </div>
  );
};

export default GameForm;
