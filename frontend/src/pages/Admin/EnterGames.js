import React, { useState, useEffect } from "react";
import { addGame } from "../../Apis/games";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import displayToast from "../../components/Alert/Alert";
import { getTeasmByLeage } from "../../Apis/Teams";
import { getOdds } from "../../Apis/odds";
import Button from "@mui/material/Button";

const GameForm = () => {
  const [odds, setOdds] = useState(null);
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    game: "",
    fromDate: "",
    gamedate: "",
    toDate: "",
    league: "",
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
  });

  const { mutate, reset } = useMutation((data) => addGame(data), {
    onError: (err) => {
      console.error("Error adding game:", err);
      displayToast("An error occurred while adding the game.", "error");
    },
    onSuccess: (rec) => {
      displayToast("Game added successfully.", "success");
      reset();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const gameData = createGameData();
    console.log("Game data:", gameData);
    mutate(gameData);
    setFormSubmitted(true);
  };

  const handleOdds = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    getOdds(formData.game)
      .then((oddsData) => {
        console.log("Odds data:", oddsData);

        const validLeagues = [
          "americanfootball_nfl",
          "americanfootball_ufl",
          "americanfootball_cfl",
          "americanfootball_ncaaf",
        ];
        const today = new Date().toISOString().split("T")[0];

        const filteredOdds = oddsData.data.filter((odd) => {
          const gameDate = odd.commence_time.split("T")[0];
          const isFootballGame = validLeagues.includes(formData.game);

          return (
            (isFootballGame || gameDate === today) &&
            odd.away_team &&
            odd.home_team &&
            odd.bookmakers &&
            odd.bookmakers.length > 0
          );
        });

        if (filteredOdds.length === 0) {
          const futureGames = oddsData.data.filter(
            (odd) => new Date(odd.commence_time) > new Date()
          );
          if (futureGames.length > 0) {
            const nextGameDate = new Date(
              futureGames[0].commence_time
            ).toLocaleDateString();
            displayToast(
              `No games today. Next game is on ${nextGameDate}.`,
              "info"
            );
          } else {
            displayToast(
              "No games available today or in upcoming days.",
              "info"
            );
          }
        }

        setOdds(filteredOdds);
      })
      .catch((error) => {
        console.error("Error fetching odds:", error);
        displayToast("An error occurred while fetching odds.", "error");
      });
  };

  const createGameData = () => {
    return odds.map((odd) => {
      const [gamedate, time] = odd.commence_time.split("T");
      return {
        game: formData.game,
        league: formData.league,
        date: (() => {
          const date = new Date(odd.commence_time);
          const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "America/Halifax",
          };
          return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
        })(),
        time: (() => {
          const date = new Date(odd.commence_time);
          const options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "America/Halifax",
          };
          return date.toLocaleTimeString("en-US", options);
        })(),
        visitorTeam: odd.away_team,
        vML: odd.bookmakers[0]?.markets[0]?.outcomes?.[1]
          ? Number.isInteger(
              odd.bookmakers[0]?.markets[0]?.outcomes?.[1]?.price
            )
            ? odd.bookmakers[0]?.markets[0]?.outcomes?.[1]?.price / 100
            : odd.bookmakers[0]?.markets[0]?.outcomes?.[1]?.price
          : undefined,
        vSprd: odd.bookmakers[0]?.markets[1]?.outcomes?.[1]?.point,
        vSprdOdds: odd.bookmakers[0]?.markets[1]?.outcomes?.[1]
          ? Number.isInteger(
              odd.bookmakers[0]?.markets[1]?.outcomes?.[1]?.price
            )
            ? odd.bookmakers[0]?.markets[1]?.outcomes?.[1]?.price / 100
            : odd.bookmakers[0]?.markets[1]?.outcomes?.[1]?.price
          : undefined,
        vOU: odd.bookmakers[0]?.markets[2]?.outcomes?.[1]
          ? Number.isInteger(
              odd.bookmakers[0]?.markets[2]?.outcomes?.[1]?.point
            )
            ? odd.bookmakers[0]?.markets[2]?.outcomes?.[1]?.point + 0.5
            : odd.bookmakers[0]?.markets[2]?.outcomes?.[1]?.point
          : undefined,
        vOUOdds: odd.bookmakers[0]?.markets[2]?.outcomes?.[1]
          ? Number.isInteger(
              odd.bookmakers[0]?.markets[2]?.outcomes?.[1]?.price
            )
            ? odd.bookmakers[0]?.markets[2]?.outcomes?.[1]?.price / 100
            : odd.bookmakers[0]?.markets[2]?.outcomes?.[1]?.price
          : undefined,
        homeTeam: odd.home_team,
        hML: Number.isInteger(
          odd.bookmakers[0]?.markets[0]?.outcomes?.[0]?.price
        )
          ? odd.bookmakers[0]?.markets[0]?.outcomes?.[0]?.price / 100
          : odd.bookmakers[0]?.markets[0]?.outcomes?.[0]?.price,
        hSprd: odd.bookmakers[0]?.markets[1]?.outcomes?.[0]?.point,
        hSprdOdds: Number.isInteger(
          odd.bookmakers[0]?.markets[1]?.outcomes?.[0]?.price
        )
          ? odd.bookmakers[0]?.markets[1]?.outcomes?.[0]?.price / 100
          : odd.bookmakers[0]?.markets[1]?.outcomes?.[0]?.price,
        hOU: Number.isInteger(
          odd.bookmakers[0]?.markets[2]?.outcomes?.[0]?.point
        )
          ? odd.bookmakers[0]?.markets[2]?.outcomes?.[0]?.point + 0.5
          : odd.bookmakers[0]?.markets[2]?.outcomes?.[0]?.point,
        hOUOdds: Number.isInteger(
          odd.bookmakers[0]?.markets[2]?.outcomes?.[0]?.price
        )
          ? odd.bookmakers[0]?.markets[2]?.outcomes?.[0]?.price / 100
          : odd.bookmakers[0]?.markets[2]?.outcomes?.[0]?.price,
        sport: formData.sport,
      };
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4 align-items-center">
        Enter Game Details
      </h2>
      <form className="justify-center items-center h-screen text-yellow-500">
        <div className="flex flex-wrap -mx-2 ">
          <div className="mb-4 px-2">
            <label htmlFor="game">Game</label>
            <select
              id="game"
              name="game"
              value={formData.game}
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                setFormData({
                  ...formData,
                  game: e.target.value,
                  league: selectedOption.getAttribute("name"),
                });
              }}
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option value="">Select a game</option>
              <optgroup label="Hockey">
                <option name="NHL" value="icehockey_nhl">
                  NHL
                </option>
              </optgroup>
              <optgroup label="FOOTBALL">
                <option name="CFL" value="americanfootball_cfl">
                  CFL
                </option>
                <option name="NCAAF" value="americanfootball_ncaaf">
                  NCAAF
                </option>
                <option name="NFL" value="americanfootball_nfl">
                  NFL
                </option>
                <option name="UFL" value="americanfootball_ufl">
                  UFL
                </option>
              </optgroup>
              <optgroup label="BASEBALL">
                <option name="NCCA" value="baseball_ncaa">
                  NCCA
                </option>
                <option name="MLB" value="baseball_mlb">
                  MLB
                </option>
              </optgroup>
              <optgroup label="BASKETBALL">
                <option name="NBA" value="basketball_nba">
                  NBA
                </option>
                <option name="WNBA" value="basketball_wnba">
                  WNBA
                </option>
                <option name="NCAAB" value="basketball_ncaab">
                  NCAAB
                </option>
              </optgroup>
            </select>
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
      <br />

      <form
        onSubmit={handleSubmit}
        className="justify-center items-center h-screen text-yellow-500"
      >
        {odds &&
          odds.map((odd) => (
            <div
              className="game-card"
              style={{ backgroundColor: "" }}
              key={odd.id}
            >
              <div className="flex flex-row">
                <div
                  className="w-1/2 px-2 box box h-18 w-40"
                  style={{ marginRight: "20px", marginBottom: "8px" }}
                >
                  <label>Time</label>
                  <input
                    value={(() => {
                      const date = new Date(odd.commence_time);
                      const options = {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        timeZone: "America/Halifax",
                      };
                      const dateString = date
                        .toLocaleDateString("en-US", options)
                        .split("/")
                        .join("-");
                      const timeOptions = {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "America/Halifax",
                      };
                      const timeString = date.toLocaleTimeString(
                        "en-US",
                        timeOptions
                      );
                      return `${dateString} ${timeString}`;
                    })()}
                    name={`time`}
                    className="bg-gray-800 text-white p-2 rounded w-full"
                    disabled={true}
                  />
                </div>
              </div>
              {odd.bookmakers &&
                odd.bookmakers.map((bookmaker, index) => (
                  <div key={index} className="flex gap-2">
                    <div
                      className="box box h-18 w-60"
                      style={{ marginLeft: "40px" }}
                    >
                      <label>Visitor Team</label>
                      <input
                        name={`visitorTeam`}
                        value={odd.away_team}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                        disabled={true}
                      />
                    </div>
                    <div className="px-2 box box h-18">
                      <label>V Sprd</label>
                      <input
                        type="number"
                        name={`vSprd`}
                        value={bookmaker.markets[1]?.outcomes[1]?.point}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                        disabled={true}
                      />
                    </div>
                    <div className="px-2 box box h-18">
                      <label>V Sprd Odds</label>
                      <input
                        type="number"
                        value={(() => {
                          const price =
                            bookmaker.markets[1]?.outcomes[1]?.price;
                          return Number.isInteger(price) ? price / 100 : price;
                        })()}
                        name={`vSprdOdds`}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                        disabled={true}
                      />
                    </div>
                    <div className="px-2 box box h-18">
                      <label>Visitor M/L</label>
                      <input
                        type="number"
                        name={`vML`}
                        value={(() => {
                          const price =
                            bookmaker.markets[0]?.outcomes[1]?.price;
                          return Number.isInteger(price) ? price / 100 : price;
                        })()}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                        disabled={true}
                      />
                    </div>
                    <div className="px-2 box box h-18">
                      <label>V O/U</label>
                      <input
                        type="number"
                        name={`vOU`}
                        value={(() => {
                          const point =
                            bookmaker.markets[2]?.outcomes[1]?.point;
                          return Number.isInteger(point) ? point + 0.5 : point;
                        })()}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                        disabled={true}
                      />
                    </div>
                    <div className="px-2 box box h-18">
                      <label>V O/U Odds</label>
                      <input
                        type="number"
                        value={(() => {
                          const price =
                            bookmaker.markets[2]?.outcomes[1]?.price;
                          return Number.isInteger(price) ? price / 100 : price;
                        })()}
                        name={`vOUOdds`}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                        disabled={true}
                      />
                    </div>
                  </div>
                ))}
              <div className="flex gap-2 mt-5 ">
                <div
                  className="box box h-18 w-60"
                  style={{ marginLeft: "40px" }}
                >
                  <label>Home Team</label>
                  <input
                    name={`homeTeam`}
                    value={odd.home_team}
                    className="bg-gray-800 text-white p-2 rounded w-full"
                    disabled={true}
                  />
                </div>
                {odd.bookmakers &&
                  odd.bookmakers.map((bookmaker, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="px-2 box box h-18">
                        <label>H Sprd</label>
                        <input
                          type="number"
                          name={`hSprd`}
                          value={bookmaker.markets[1]?.outcomes[0]?.point}
                          className="bg-gray-800 text-white p-2 rounded w-full"
                          disabled={true}
                        />
                      </div>
                      <div className="px-2 box box h-18">
                        <label>H Sprd Odds</label>
                        <input
                          type="number"
                          name={`hSprdOdds`}
                          value={(() => {
                            const price =
                              bookmaker.markets[1]?.outcomes[0]?.price;
                            return Number.isInteger(price)
                              ? price / 100
                              : price;
                          })()}
                          className="bg-gray-800 text-white p-2 rounded w-full"
                          disabled={true}
                        />
                      </div>
                      <div className="px-2 box box h-18">
                        <label>Home M/L</label>
                        <input
                          type="number"
                          name={`hML`}
                          value={(() => {
                            const price =
                              bookmaker.markets[0]?.outcomes[0]?.price;
                            return Number.isInteger(price)
                              ? price / 100
                              : price;
                          })()}
                          className="bg-gray-800 text-white p-2 rounded w-full"
                          disabled={true}
                        />
                      </div>
                      <div className="px-2 box box h-18">
                        <label>H O/U</label>
                        <input
                          type="number"
                          name={`hOU`}
                          value={(() => {
                            const point =
                              bookmaker.markets[2]?.outcomes[0]?.point;
                            return Number.isInteger(point)
                              ? point + 0.5
                              : point;
                          })()}
                          className="bg-gray-800 text-white p-2 rounded w-full"
                          disabled={true}
                        />
                      </div>
                      <div className="px-2 box box h-18">
                        <label>H O/U Odds</label>
                        <input
                          type="number"
                          value={(() => {
                            const price =
                              bookmaker.markets[2]?.outcomes[0]?.price;
                            return Number.isInteger(price)
                              ? price / 100
                              : price;
                          })()}
                          name={`hOUOdds`}
                          className="bg-gray-800 text-white p-2 rounded w-full"
                          disabled={true}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        <br />
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#FFD700", // Yellow color
            color: "rgba(0, 0, 0, 1)", // Black color
          }}
        >
          Submit ✔
        </Button>
      </form>
    </div>
  );
};

export default GameForm;

// Create manual league

// import React, { useState, useEffect } from "react";
// import { addGame } from "../../Apis/games";
// import { useMutation, useQuery } from "react-query";
// import { useDispatch } from "react-redux";
// import displayToast from "../../components/Alert/Alert";
// import { getTeasmByLeage } from "../../Apis/Teams";
// import { getOdds } from "../../Apis/odds";
// import Button from "@mui/material/Button";

// const GameForm = () => {
//   const dispatch = useDispatch();
//   const initialFormData = {
//     time: "",
//     visitorTeam: "",
//     vML: "",
//     vSprd: "",
//     vSprdOdds: "",
//     vOU: "",
//     vOUOdds: "",
//     homeTeam: "",
//     hML: "",
//     hSprd: "",
//     hSprdOdds: "",
//     hOU: "",
//     hOUOdds: "",
//     sport: "",
//   };

//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [gameCards, setGameCards] = useState([]);
//   const [formData, setFormData] = useState({
//     game: "",
//     fromDate: "",
//     toDate: "",
//   });
//   const [teams, setTeams] = useState([]);

//   const { mutate, isLoading, isError, data, error, reset } = useMutation(
//     (data) => addGame(data),
//     {
//       onError: (err) => {
//         console.error("Error adding game:", err);
//         displayToast("An error occurred while adding the game.", "error");
//       },
//       onSuccess: (rec) => {
//         displayToast("Game added successfully.", "success");
//         reset();
//       },
//     }
//   );
//   const generateSeasonOptions = () => {
//     return (
//       <>
//         <option value="">Select a season</option>
//         <option value="Pre Season">Pre</option>
//         <option value="Regular">Reg</option>
//         <option value="Playoffs">Post</option>
//       </>
//     );
//   };

//   const generateLeagueOptions = () => {
//     return (
//       <>
//         <option value="">Select a league</option>
//         <option value="NFL">NFL</option>
//         <option value="NBA">NBA</option>
//         <option value="NHL">NHL</option>
//         <option value="MLB">MLB</option>
//       </>
//     );
//   };

//   const {
//     isLoading: loadingTeams,
//     isError: teamError,
//     data: teamsData,
//   } = useQuery(["teams", formData.league], getTeasmByLeage, {
//     enabled: !!formData.league,
//     onError: (err) => {
//       displayToast("An error occurred while getting the game.", "error");
//     },
//     onSuccess: (rec) => {
//       setTeams(rec.data);
//       console.log("Teams Data:", rec.data); // Logging fetched teams data
//     },
//   });
//   const {
//     isLoading: loadingAdditionalData,
//     isError: additionalDataError,
//     data: additionalData,
//   } = useQuery("additionalData", () => {
//     // Replace 'fetchAdditionalData' with your actual function to fetch additional data
//     return fetchAdditionalData();
//   });

//   useEffect(() => {
//     if (additionalData) {
//       console.log("Additional Data:", additionalData);
//     }
//   }, [additionalData]);

//   const fetchAdditionalData = async () => {
//     try {
//       // Make API call to fetch additional data
//       const response = await fetch("<API_ENDPOINT>");
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching additional data:", error);
//       // You can handle errors here
//     }
//   };
//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedGameCards = [...gameCards];
//     setFormData({ ...formData, [name]: value });
//     updatedGameCards[index][name] = value;
//     setGameCards(updatedGameCards);
//   };

//   const handleAddGameCard = () => {
//     const { league, season, date, week } = formData;

//     if (!league || !season || !date || !week) {
//       displayToast("Incomplete form data. Unable to add game card.");
//       return;
//     }

//     let sport = "";
//     if (league === "NFL") {
//       sport = "football";
//     } else if (league === "NBA") {
//       sport = "basketball";
//     } else if (league === "NHL") {
//       sport = "hockey";
//     } else if (league === "MLB") {
//       sport = "baseball";
//     }

//     const newGameCard = {
//       league,
//       season,
//       date,
//       week,
//       time: "",
//       visitorTeam: "",
//       vML: "",
//       vSprd: "",
//       vSprdOdds: "",
//       vOU: "",
//       vOUOdds: "",
//       homeTeam: "",
//       hML: "",
//       hSprd: "",
//       hSprdOdds: "",
//       hOU: "",
//       hOUOdds: "",
//       sport: "",
//     };

//     setGameCards((prevGameCards) => [...prevGameCards, newGameCard]);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       time: "",
//       visitorTeam: "",
//       vML: "",
//       vSprd: "",
//       vSprdOdds: "",
//       vOU: "",
//       vOUOdds: "",
//       homeTeam: "",
//       hML: "",
//       hSprd: "",
//       hSprdOdds: "",
//       hOU: "",
//       hOUOdds: "",
//     }));

//     const filteredTeams = getFilteredTeams(newGameCard.visitorTeam);
//     setTeams(filteredTeams);
//   };

//   const getFilteredTeams = (selectedTeam) => {
//     return teams.filter((team) => team.displayName !== selectedTeam);
//   };

//   const handleRemoveGameCard = (index) => {
//     const updatedGameCards = [...gameCards];
//     updatedGameCards.splice(index, 1);
//     setGameCards(updatedGameCards);
//   };

//   const handleResetForm = () => {
//     setGameCards([]);
//     setFormData({
//       ...initialFormData,
//     });
//     setFormSubmitted(false);
//   };

//   const createGameData = () => {
//     return gameCards.map((gameCard) => {
//       return {
//         league: gameCard.league,
//         season: gameCard.season,
//         date: gameCard.date,
//         week: gameCard.week,
//         time: gameCard.time,
//         visitorTeam: gameCard.visitorTeam,
//         vML: gameCard.vML,
//         vSprd: gameCard.vSprd,
//         vSprdOdds: gameCard.vSprdOdds,
//         vOU: gameCard.vOU,
//         vOUOdds: gameCard.vOUOdds,
//         homeTeam: gameCard.homeTeam,
//         hML: gameCard.hML,
//         hSprd: gameCard.hSprd,
//         hSprdOdds: gameCard.hSprdOdds,
//         hOU: gameCard.hOU,
//         hOUOdds: gameCard.hOUOdds,
//         sport: gameCard.sport,
//       };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (gameCards?.length === 0) {
//       return;
//     }

//     if (formSubmitted) {
//       displayToast("Form already submitted.", "warning");
//       return;
//     }

//     const missingFields = [];

//     gameCards.forEach((gameCard, index) => {
//       if (!gameCard.time) {
//         missingFields.push(`Time for game ${index + 1}`);
//       }

//       if (!gameCard.visitorTeam) {
//         missingFields.push(`Visitor Team for game ${index + 1}`);
//       }
//     });

//     if (missingFields.length > 0) {
//       displayToast(
//         `Please add the following fields: ${missingFields.join(", ")}.`,
//         "error"
//       );
//     } else {
//       const gameData = createGameData();
//       console.log("Game data:", gameData);
//       mutate(gameData);
//       setFormSubmitted(true);
//     }
//   };

//   const handleOdds = (e) => {
//     console.log("Form data:", formData);
//     getOdds(formData.game).then((response) => {
//       console.log("Odds data:", response.data);
//     });
//   };

//   const handlePaste = (e, index) => {
//     const data = e.clipboardData.getData("text");
//     const values = data.split("\n");

//     let cleanedData = values.map((item) => item.replace(/[\r|o|u]/g, ""));

//     const updatedGameCards = [...gameCards];

//     updatedGameCards[index].vSprd = cleanedData[0];
//     updatedGameCards[index].vSprdOdds = cleanedData[1];
//     updatedGameCards[index].vML = cleanedData[2];
//     updatedGameCards[index].vOU = cleanedData[3];
//     updatedGameCards[index].vOUOdds = cleanedData[4];
//     updatedGameCards[index].hSprd = cleanedData[5];
//     updatedGameCards[index].hSprdOdds = cleanedData[6];
//     updatedGameCards[index].hML = cleanedData[7];
//     updatedGameCards[index].hOU = cleanedData[8];
//     updatedGameCards[index].hOUOdds = cleanedData[9];

//     setGameCards(updatedGameCards);
//   };

//   useEffect(() => {
//     // console.log("Form data:", formData);
//   }, [formData]);
//   return (
//     <div className="p-4">
//       <h2 className="text-white text-xl mb-4 align-items-center">
//         Enter Game Details
//       </h2>
//       <form
//         className="justify-center items-center h-screen text-yellow-500"
//         onSubmit={handleSubmit}
//       >
//         <div className="flex flex-wrap -mx-2 ">
//           <div className="mb-4 px-2">
//             <label htmlFor="game">Game</label>
//             <select
//               id="game"
//               name="game"
//               value={formData.game}
//               onChange={(e) =>
//                 setFormData({ ...formData, game: e.target.value })
//               }
//               className="bg-gray-800 text-white p-2 rounded w-full"
//             >
//               <option value="">Select a game</option>
//               <optgroup label="FOOTBALL">
//                 <option value="americanfootball_cfl">CFL</option>
//                 <option value="americanfootball_ncaaf">NCAAF</option>
//                 <option value="americanfootball_nfl">NFL</option>
//                 <option value="americanfootball_ufl">UFL</option>
//               </optgroup>
//               <optgroup label="BASEBALL">
//                 <option value="baseball_ncaa">NCCA</option>
//               </optgroup>
//               <optgroup label="BASKETBALL">
//                 <option value="basketball_wnba">WNBA</option>
//                 <option value="basketball_ncaab">NCAAB</option>
//               </optgroup>
//             </select>
//           </div>
//           <div className="mb-4 px-2">
//             <label htmlFor="fromDate">From Date</label>
//             <input
//               type="date"
//               id="fromDate"
//               name="fromDate"
//               value={formData.fromDate}
//               onChange={(e) =>
//                 setFormData({ ...formData, fromDate: e.target.value })
//               }
//               className="bg-gray-800 text-white p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-4 px-2">
//             <label htmlFor="toDate">To Date</label>
//             <input
//               type="date"
//               id="toDate"
//               name="toDate"
//               value={formData.toDate}
//               onChange={(e) =>
//                 setFormData({ ...formData, toDate: e.target.value })
//               }
//               className="bg-gray-800 text-white p-2 rounded w-full"
//             />
//           </div>
//         </div>
//         <Button
//           type="submit"
//           variant="contained"
//           style={{
//             backgroundColor: "#FFD700",
//             color: "rgba(0, 0, 0, 1)",
//           }}
//           onClick={handleOdds}
//         >
//           Submit ✔
//         </Button>
//       </form>
//       <form
//         onSubmit={handleSubmit}
//         className="justify-center items-center h-screen text-yellow-500"
//       >
//         <div className="flex flex-wrap -mx-2 ">
//           <div className="mb-4 px-2">
//             <label htmlFor="week">Week</label>
//             <select
//               id="week"
//               name="week"
//               value={formData.week}
//               onChange={(e) =>
//                 setFormData({ ...formData, week: e.target.value })
//               }
//               className="bg-gray-800 text-white p-2 rounded w-full"
//             >
//               <option value="">Select a week</option>
//               {[...Array(40)].map((_, index) => (
//                 <option key={index + 1} value={index + 1}>
//                   Week {index + 1}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-4  px-2">
//             <label htmlFor="date">Date</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData({ ...formData, date: e.target.value })
//               }
//               className="bg-gray-800 text-white p-2 rounded w-full"
//             />
//           </div>

//           <div className="mb-4  px-2">
//             <label htmlFor="league">League</label>
//             <select
//               id="league"
//               name="league"
//               value={formData.league}
//               onChange={(e) =>
//                 setFormData({ ...formData, league: e.target.value })
//               }
//               className="bg-gray-800 text-white p-2 rounded w-full"
//             >
//               {generateLeagueOptions()} {/* Call the new function */}
//             </select>
//           </div>

//           <div className="mb-4  px-2">
//             <label htmlFor="season">Season</label>
//             <select
//               id="season"
//               name="season"
//               value={formData.season}
//               onChange={(e) =>
//                 setFormData({ ...formData, season: e.target.value })
//               }
//               className="bg-gray-800 text-white p-2 rounded w-full"
//             >
//               {generateSeasonOptions()}
//             </select>
//           </div>
//         </div>

//         {gameCards.map((gameCard, index) => (
//           <div
//             key={index}
//             className="game-card"
//             style={{ backgroundColor: "" }}
//           >
//             <div className="flex flex-row">
//               <div
//                 className="mb-2 pt-6"
//                 style={{
//                   marginRight: "30px",
//                   marginTop: "-50px",
//                   marginLeft: "-10px",
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveGameCard(index)}
//                   className="bg-red-500 text-white p-1 rounded"
//                 >
//                   X
//                 </button>
//               </div>

//               <div
//                 className="w-1/2 px-2 box box h-18 w-40"
//                 style={{ marginRight: "20px", marginBottom: "8px" }}
//               >
//                 <label htmlFor={`time-${index}`}>Game Time</label>
//                 <input
//                   type="time"
//                   id={`time-${index}`}
//                   name={`time`}
//                   value={gameCard.time}
//                   onChange={(e) => handleChange(e, index)}
//                   className="bg-gray-800 text-white p-2 rounded w-full "
//                 />
//               </div>
//               <div
//                 className="px-2 box box h-18 w-40"
//                 style={{ marginBottom: "8px" }}
//               >
//                 <label htmlFor={`data-${index}`}>Data Paste</label>
//                 <input
//                   type="text"
//                   id={`data-${index}`}
//                   name={`data`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   className="bg-gray-800 text-white p-2 rounded w-full "
//                 />
//               </div>
//               {/* <div
//                 className="w-1/5 px-2 box box h-18 w-20"
//                 style={{ marginRight: "90px" }}
//               >
//                 <label>MoneyLine</label>
//               </div>
//               <div
//                 className="w-1/5 px-2 box box h-18 w-20"
//                 style={{ marginRight: "90px" }}
//               >
//                 <label>Spread</label>
//               </div>
//               <div
//                 className="w-1/5 px-2 box box h-18 w-20 align-items-center justify-between"
//                 style={{ marginRight: "70px" }}
//               >
//                 <label>Spread Odds</label>
//               </div>
//               <div
//                 className="w-1/5 px-2 box box h-18 w-20 align-items-center justify-between"
//                 style={{ marginRight: "90px" }}
//               >
//                 <label>Over/Under</label>
//               </div>
//               <div
//                 className="w-1/5 px-2 box box h-18 w-20 align-items-center justify-between"
//                 style={{ marginRight: "90px" }}
//               >
//                 <label>Over/Under Odds</label>
//               </div> */}
//             </div>

//             <div className="flex gap-2">
//               <div
//                 className=" box box h-18 w-60"
//                 style={{ marginLeft: "40px" }}
//               >
//                 <label htmlFor={`visitorteam-${index}`}>Visitor Team</label>
//                 <select
//                   id={`visitorteam-${index}`}
//                   name={`visitorTeam`}
//                   value={gameCard.visitorTeam}
//                   onChange={(e) => handleChange(e, index)}
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 >
//                   <option value=""></option>
//                   {loadingTeams ? (
//                     <option value="" disabled>
//                       Loading teams...
//                     </option>
//                   ) : (
//                     teams.map((team) => (
//                       <option key={team.id} value={team.displayName}>
//                         {team.displayName}
//                       </option>
//                     ))
//                   )}
//                 </select>
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`vSprd-${index}`}>V Sprd</label>
//                 <input
//                   type="number"
//                   id={`vSprd-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`vSprd`}
//                   value={gameCard.vSprd}
//                   onChange={(e) => {
//                     handleChange(e, index);
//                   }}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`vSprdOdds-${index}`}>V Sprd Odds</label>
//                 <input
//                   type="number"
//                   id={`vSprdOdds-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`vSprdOdds`}
//                   value={gameCard.vSprdOdds}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`vML-${index}`}>Visitor M/L</label>
//                 <input
//                   type="number"
//                   id={`vML-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`vML`}
//                   value={gameCard.vML}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`vOU-${index}`}>V O/U</label>
//                 <input
//                   type="number"
//                   id={`vOU-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`vOU`}
//                   value={gameCard.vOU}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`vOUOdds-${index}`}>V O/U Odds</label>
//                 <input
//                   type="number"
//                   id={`vOUOdds-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`vOUOdds`}
//                   value={gameCard.vOUOdds}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-2 mt-5 ">
//               <div className="box box h-18 w-60" style={{ marginLeft: "40px" }}>
//                 <label htmlFor={`hometeam-${index}`}>Home Team</label>
//                 <select
//                   id={`hometeam-${index}`}
//                   name={`homeTeam`}
//                   value={gameCard.homeTeam}
//                   onChange={(e) => handleChange(e, index)}
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 >
//                   <option value=""></option>
//                   {loadingTeams ? (
//                     <option value="" disabled>
//                       Loading teams...
//                     </option>
//                   ) : (
//                     getFilteredTeams(gameCard.visitorTeam).map((team) => (
//                       <option key={team.id} value={team.displayName}>
//                         {team.displayName}
//                       </option>
//                     ))
//                   )}
//                 </select>
//               </div>

//               <div className=" px-2 box box h-18">
//                 <label htmlFor={`hSprd-${index}`}>H Sprd</label>
//                 <input
//                   type="number"
//                   id={`hSprd-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`hSprd`}
//                   value={gameCard.hSprd}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`hSprdOdds-${index}`}>H Sprd Odds</label>
//                 <input
//                   type="number"
//                   id={`hSprdOdds-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`hSprdOdds`}
//                   value={gameCard.hSprdOdds}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`hML-${index}`}>Home M/L</label>
//                 <input
//                   type="number"
//                   id={`hML-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`hML`}
//                   value={gameCard.hML}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className=" px-2 box box h-18 ">
//                 <label htmlFor={`hOU-${index}`}>H O/U</label>
//                 <input
//                   type="number"
//                   id={`hOU-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`hOU`}
//                   value={gameCard.hOU}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>

//               <div className="px-2 box box h-18 ">
//                 <label htmlFor={`hOUOdds-${index}`}>H O/U Odds</label>
//                 <input
//                   type="number"
//                   id={`hOUOdds-${index}`}
//                   onPaste={(e) => handlePaste(e, index)}
//                   name={`hOUOdds`}
//                   value={gameCard.hOUOdds}
//                   onChange={(e) => handleChange(e, index)}
//                   step="0.1"
//                   className="bg-gray-800 text-white p-2 rounded w-full"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="mb-4 flex w-full gap-7">
//           <Button
//             variant="contained"
//             color="success" // Assuming you want a green background
//             onClick={handleAddGameCard}
//           >
//             Add Games +
//           </Button>

//           {/* <button
//             type="button"
//             onClick={handleResetForm}
//             className="bg-red-500 text-white py-2 rounded px-5"
//             style={{ marginLeft: "10px" }}
//           >
//             Reset Form
//           </button> */}
//         </div>
//         <br />
//         <Button
//           type="submit"
//           variant="contained"
//           style={{
//             backgroundColor: "#FFD700", // Yellow color
//             color: "rgba(0, 0, 0, 1)", // Black color
//           }}
//           onClick={handleSubmit}
//         >
//           Submit ✔
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default GameForm;
