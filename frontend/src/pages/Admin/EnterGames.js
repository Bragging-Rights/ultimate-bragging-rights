import React, { useState, useEffect } from "react";
import { addGame } from "../../Apis/games";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import displayToast from "../../components/Alert/Alert";
import { getTeasmByLeage } from "../../Apis/Teams";
import { getOdds } from "../../Apis/odds";
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
    game: "",
    fromDate: "",
    toDate: "",
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

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
  } = useQuery(["teams", formData.league], getTeasmByLeage, {
    enabled: !!formData.league,
    onError: (err) => {
      displayToast("An error occurred while getting the game.", "error");
    },
    onSuccess: (rec) => {
      setTeams(rec.data);
      console.log("Teams Data:", rec.data); // Logging fetched teams data
    },
  });
  const {
    isLoading: loadingAdditionalData,
    isError: additionalDataError,
    data: additionalData,
  } = useQuery("additionalData", () => {
    // Replace 'fetchAdditionalData' with your actual function to fetch additional data
    return fetchAdditionalData();
  });

  useEffect(() => {
    if (additionalData) {
      console.log("Additional Data:", additionalData);
    }
  }, [additionalData]);

  const fetchAdditionalData = async () => {
    try {
      // Make API call to fetch additional data
      const response = await fetch("<API_ENDPOINT>");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching additional data:", error);
      // You can handle errors here
    }
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedGameCards = [...gameCards];
    setFormData({ ...formData, [name]: value });
    updatedGameCards[index][name] = value;
    setGameCards(updatedGameCards);
  };

  const handleAddGameCard = () => {
    const { league, season, date, week } = formData;

    if (!league || !season || !date || !week) {
      displayToast("Incomplete form data. Unable to add game card.");
      return;
    }

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

    setGameCards((prevGameCards) => [...prevGameCards, newGameCard]);
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

    const filteredTeams = getFilteredTeams(newGameCard.visitorTeam);
    setTeams(filteredTeams);
  };

  const getFilteredTeams = (selectedTeam) => {
    return teams.filter((team) => team.displayName !== selectedTeam);
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
    });
    setFormSubmitted(false);
  };

  const createGameData = () => {
    return gameCards.map((gameCard) => {
      return {
        league: gameCard.league,
        season: gameCard.season,
        date: gameCard.date,
        week: gameCard.week,
        time: gameCard.time,
        visitorTeam: gameCard.visitorTeam,
        vML: gameCard.vML,
        vSprd: gameCard.vSprd,
        vSprdOdds: gameCard.vSprdOdds,
        vOU: gameCard.vOU,
        vOUOdds: gameCard.vOUOdds,
        homeTeam: gameCard.homeTeam,
        hML: gameCard.hML,
        hSprd: gameCard.hSprd,
        hSprdOdds: gameCard.hSprdOdds,
        hOU: gameCard.hOU,
        hOUOdds: gameCard.hOUOdds,
        sport: gameCard.sport,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (gameCards?.length === 0) {
      return;
    }

    if (formSubmitted) {
      displayToast("Form already submitted.", "warning");
      return;
    }

    const missingFields = [];

    gameCards.forEach((gameCard, index) => {
      if (!gameCard.time) {
        missingFields.push(`Time for game ${index + 1}`);
      }

      if (!gameCard.visitorTeam) {
        missingFields.push(`Visitor Team for game ${index + 1}`);
      }
    });

    if (missingFields.length > 0) {
      displayToast(
        `Please add the following fields: ${missingFields.join(", ")}.`,
        "error"
      );
    } else {
      const gameData = createGameData();
      console.log("Game data:", gameData);
      mutate(gameData);
      setFormSubmitted(true);
    }
  };

  const handleOdds = (e) => {
    console.log("Form data:", formData);
    getOdds(formData.game).then((response) => {
      console.log("Odds data:", response.data);
    });
  };

  const handlePaste = (e, index) => {
    const data = e.clipboardData.getData("text");
    const values = data.split("\n");

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

    setGameCards(updatedGameCards);
  };

  useEffect(() => {
    // console.log("Form data:", formData);
  }, [formData]);
  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4 align-items-center">
        Enter Game Details
      </h2>
      <form
        className="justify-center items-center h-screen text-yellow-500"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-2 ">
          <div className="mb-4 px-2">
            <label htmlFor="game">Game</label>
            <select
              id="game"
              name="game"
              value={formData.game}
              onChange={(e) =>
                setFormData({ ...formData, game: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option value="">Select a game</option>
              <optgroup label="FOOTBALL">
                <option value="americanfootball_cfl">CFL</option>
                <option value="americanfootball_ncaaf">NCAAF</option>
                <option value="americanfootball_nfl">NFL</option>
                <option value="americanfootball_ufl">UFL</option>
              </optgroup>
              <optgroup label="BASEBALL">
                <option value="baseball_ncaa">NCCA</option>
              </optgroup>
              <optgroup label="BASKETBALL">
                <option value="basketball_wnba">WNBA</option>
                <option value="basketball_ncaab">NCAAB</option>
              </optgroup>
            </select>
          </div>
          <div className="mb-4 px-2">
            <label htmlFor="fromDate">From Date</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formData.fromDate}
              onChange={(e) =>
                setFormData({ ...formData, fromDate: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
          <div className="mb-4 px-2">
            <label htmlFor="toDate">To Date</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formData.toDate}
              onChange={(e) =>
                setFormData({ ...formData, toDate: e.target.value })
              }
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#FFD700",
            color: "rgba(0, 0, 0, 1)",
          }}
          onClick={handleOdds}
        >
          Submit ✔
        </Button>
      </form>
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
