import React, { useState, useEffect } from "react";
import { addGame, getGames, updateGame } from "../../services/games";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import displayToast from "../../components/Alert/Alert";
import { getTeasmByLeage } from "../../services/Teams";
import { format } from "date-fns";
import { useLeagueContext } from "../../components/LeagueContext";

const UpdateGames = () => {
  const dispatch = useDispatch();
  const { selectedLeague } = useLeagueContext();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gameCards, setGameCards] = useState([]);
  const [formData, setFormData] = useState({
    week: "",
    league: "",
    season: "",
    date: "",
  });

  const [teams, setTeams] = useState([]);

  const {
    mutate: updateGameMutate,
    isLoading,
    isError,
    data,
    error,
    reset,
  } = useMutation((gameData) => updateGame(gameData), {
    onError: (err) => {
      console.error("Error adding game:", err);
      displayToast("An error occurred while updaing the game.", "error");
    },
    onSuccess: (rec) => {
      displayToast("Game updated successfully.", "success");
    },
  });

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
  } = useQuery(["teams", selectedLeague], getTeasmByLeage, {
    enabled: !!selectedLeague, // Fetch only if formData.league is truthy
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

  const getFilteredTeams = (selectedTeam) => {
    return teams.filter((team) => team.displayName !== selectedTeam);
  };

  const handleSubmit = (e) => {};

  const [gameData, setGameData] = useState([]);

  const [date, setDate] = useState(new Date());

  const formattedDateForAPI = format(date, "yyyy-MM-dd");

  const { refetch: refetchTodayGame, data: storeGames } = useQuery(
    ["teams", formattedDateForAPI, selectedLeague],
    getGames,
    {
      onSuccess: (fetchedData) => {
        setGameData(fetchedData.data);
      },
      enabled: false,
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    }
  );
  useEffect(() => {
    refetchTodayGame();
  }, [date]);

  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4 align-items-center">
        Update game
      </h2>
      <div className=" flex gap-3 my-3">
        <label className=" text-white">Select date</label>
        <input
          type="date"
          value={format(date, "yyyy-MM-dd")}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-800 text-white  rounded"
        />
      </div>
      {gameData.map((item, index) => {
        console.log("item", item);
        return (
          <div
            key={item.id}
            className=" w-full border border-gray-500 rounded-md p-4 mt-2"
          >
            <div className="flex flex-wrap -mx-2 ">
              <div className="mb-4 px-2">
                <label htmlFor="week">Week</label>
                <select
                  id="week"
                  name="week"
                  value={item.week}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                  onChange={(e) => {
                    const temp = [...gameData];
                    temp[index].week = e.target.value;
                    setGameCards([...temp]);
                  }}
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
                  value={format(new Date(item?.gamedate), "yyyy-MM-dd")}
                  onChange={(e) => {
                    const temp = [...gameData];
                    temp[index].gamedate = e.target.value;
                    setGameCards([...temp]);
                  }}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                />
              </div>

              <div className="mb-4  px-2">
                <label htmlFor="league">League</label>
                <select
                  id="league"
                  name="league"
                  value={item.league}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                  onChange={(e) => {
                    const temp = [...gameData];
                    temp[index].league = e.target.value;
                    setGameCards([...temp]);
                  }}
                >
                  {generateLeagueOptions()}
                </select>
              </div>

              <div className="mb-4  px-2">
                <label htmlFor="season">Season</label>
                <select
                  id="season"
                  name="season"
                  value={item.seasonflag}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                  onChange={(e) => {
                    const temp = [...gameData];
                    temp[index].seasonflag = e.target.value;
                    setGameCards([...temp]);
                  }}
                >
                  {generateSeasonOptions()}
                </select>
              </div>
            </div>
            <>
              <div className="game-card" style={{ backgroundColor: "" }}>
                <div className="flex flex-row">
                  <div
                    className=" px-2 box box h-18 w-60 "
                    style={{ marginRight: "20px", marginBottom: "8px" }}
                  >
                    <label htmlFor={`time-`}>Game Time</label>
                    <input
                      type="time"
                      name={`time`}
                      value={item.time}
                      className="bg-gray-800 text-white p-2 rounded w-full "
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index].time = e.target.value;
                        setGameCards([...temp]);
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className=" box box h-18 w-60">
                    <label htmlFor={`visitorteam`}>Visitor Team</label>
                    <select
                      id={`visitorteam`}
                      name={`home`}
                      value={item.visitor}
                      className="bg-gray-800 text-white p-2 rounded w-full"
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index].visitor = e.target.value;
                        setGameCards([...temp]);
                      }}
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
                    <label htmlFor={`vSprd`}>V Sprd</label>
                    <input
                      type="number"
                      id={`vSprd`}
                      name={`vSprd`}
                      value={item["v-sprd"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["v-sprd"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>

                  <div className=" px-2 box box h-18 ">
                    <label htmlFor={`vSprdOdds-`}>V Sprd Odds</label>
                    <input
                      type="number"
                      value={item["v-sprd-odds"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["v-sprd-odds"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>

                  <div className=" px-2 box box h-18 ">
                    <label htmlFor={`vML`}>Visitor M/L</label>
                    <input
                      type="number"
                      value={item["v-ml-points"]}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["v-ml-points"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                    />
                  </div>

                  <div className=" px-2 box box h-18 ">
                    <label htmlFor={`vOU`}>V O/U</label>
                    <input
                      type="number"
                      value={item["v-ou"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["v-ou"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>

                  <div className=" px-2 box box h-18 ">
                    <label htmlFor={`vOUOdds`}>V O/U Odds</label>
                    <input
                      type="number"
                      id={`vOUOdds`}
                      value={item["v-ou-odds"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["v-ou-odds"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-5 ">
                  <div className="box box h-18 w-60">
                    <label htmlFor={`hometeam`}>Home Team</label>
                    <select
                      id={`hometeam`}
                      name={`homeTeam`}
                      value={item.home}
                      className="bg-gray-800 text-white p-2 rounded w-full"
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index].home = e.target.value;
                        setGameCards([...temp]);
                      }}
                    >
                      <option value=""></option>
                      {loadingTeams ? (
                        <option value="" disabled>
                          Loading teams...
                        </option>
                      ) : (
                        getFilteredTeams(item?.visitor).map((team) => (
                          <option key={team.id} value={team.displayName}>
                            {team.displayName}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className=" px-2 box box h-18">
                    <label htmlFor={`hSprd`}>H Sprd</label>
                    <input
                      type="number"
                      value={item["h-sprd"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["h-sprd"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>

                  <div className=" px-2 box box h-18 ">
                    <label htmlFor={`hSprdOdds-`}>H Sprd Odds</label>
                    <input
                      type="number"
                      value={item["h-sprd-odds"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["h-sprd-odds"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>

                  <div className=" px-2 box box h-18 ">
                    <label htmlFor={`hML`}>Home M/L</label>
                    <input
                      type="number"
                      value={item["h-ml"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["h-ml"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>

                  <div className=" px-2 box box h-18 ">
                    <label htmlFor={`hOU`}>H O/U</label>
                    <input
                      type="number"
                      value={item["h-ou"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["h-ou"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>

                  <div className="px-2 box box h-18 ">
                    <label htmlFor={`hOUOdds-`}>H O/U Odds</label>
                    <input
                      type="number"
                      value={item["h-ou-odds"]}
                      onChange={(e) => {
                        const temp = [...gameData];
                        temp[index]["h-ou-odds"] = e.target.value;
                        setGameCards([...temp]);
                      }}
                      step="0.1"
                      className="bg-gray-800 text-white p-2 rounded w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-yellow-400 text-black py-1 rounded px-5 w-2/3"
                onClick={() => {
                  updateGameMutate(gameData[index]);
                }}
              >
                Update
              </button>
            </>
          </div>
        );
      })}
    </div>
  );
};

export default UpdateGames;
