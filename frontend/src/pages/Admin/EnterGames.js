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
        setOdds(oddsData.data);
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
        vML: odd.bookmakers[0].markets[0].outcomes[1].price,
        vSprd: odd.bookmakers[0].markets[1].outcomes[1].point,
        vSprdOdds: odd.bookmakers[0].markets[1].outcomes[1].price,
        vOU: Number.isInteger(odd.bookmakers[0].markets[2].outcomes[1].point)
          ? odd.bookmakers[0].markets[2].outcomes[1].point + 0.5
          : odd.bookmakers[0].markets[2].outcomes[1].point,
        vOUOdds: odd.bookmakers[0].markets[2].outcomes[1].price,
        homeTeam: odd.home_team,
        hML: odd.bookmakers[0].markets[0].outcomes[0].price,
        hSprd: odd.bookmakers[0].markets[1].outcomes[0].point,
        hSprdOdds: odd.bookmakers[0].markets[1].outcomes[0].price,
        hOU: Number.isInteger(odd.bookmakers[0].markets[2].outcomes[0].point)
          ? odd.bookmakers[0].markets[2].outcomes[0].point + 0.5
          : odd.bookmakers[0].markets[2].outcomes[0].point,
        hOUOdds: odd.bookmakers[0].markets[2].outcomes[0].price,
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
                        value={bookmaker.markets[1]?.outcomes[1]?.price}
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
                        value={bookmaker.markets[0]?.outcomes[1]?.price}
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
                        value={bookmaker.markets[2]?.outcomes[1]?.price}
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
                          value={bookmaker.markets[1]?.outcomes[0]?.price}
                          className="bg-gray-800 text-white p-2 rounded w-full"
                          disabled={true}
                        />
                      </div>
                      <div className="px-2 box box h-18">
                        <label>Home M/L</label>
                        <input
                          type="number"
                          name={`hML`}
                          value={bookmaker.markets[0]?.outcomes[0]?.price}
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
                          value={bookmaker.markets[2]?.outcomes[0]?.price}
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
