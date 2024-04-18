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
  const [formData, setFormData] = useState({
    game: "",
    fromDate: "",
    toDate: "",
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

    getOdds(formData.game, formData.fromDate, formData.toDate)
      .then((response) => {
        setGameData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching odds:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (formSubmitted) {
  //     displayToast("Form already submitted.", "warning");
  //     return;
  //   }

  //   const gameData = createGameData();
  //   console.log("Game data:", gameData);
  //   mutate(gameData);
  //   setFormSubmitted(true);
  // };

  const handleOdds = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    try {
      const oddsData = await getOdds(formData.game);
      console.log("Odds data:", oddsData);

      const { data } = oddsData;
      if (data) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          vSprd: data.vSprd,
          vSprdOdds: data.vSprdOdds,
          vML: data.vML,
          vOU: data.vOU,
          vOUOdds: data.vOUOdds,
          homeTeam: data.homeTeam,
          hML: data.hML,
          hSprd: data.hSprd,
          hSprdOdds: data.hSprdOdds,
          hOU: data.hOU,
          hOUOdds: data.hOUOdds,
          sport: data.sport,
        }));
      } else {
        displayToast("No odds data found for selected game.", "error");
      }
    } catch (error) {
      console.error("Error fetching odds:", error);
      displayToast("An error occurred while fetching odds.", "error");
    }
  };

  const createGameData = () => {
    return {
      game: formData.game,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      time: formData.time,
      visitorTeam: formData.visitorTeam,
      vML: formData.vML,
      vSprd: formData.vSprd,
      vSprdOdds: formData.vSprdOdds,
      vOU: formData.vOU,
      vOUOdds: formData.vOUOdds,
      homeTeam: formData.homeTeam,
      hML: formData.hML,
      hSprd: formData.hSprd,
      hSprdOdds: formData.hSprdOdds,
      hOU: formData.hOU,
      hOUOdds: formData.hOUOdds,
      sport: formData.sport,
    };
  };

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
              <optgroup label="Hockey">
                <option value="icehockey_nhl">NHL</option>
              </optgroup>
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
      <br />
      <form
        onSubmit={handleSubmit}
        className="justify-center items-center h-screen text-yellow-500"
      >
        <div className="game-card" style={{ backgroundColor: "" }}>
          <div className="flex flex-row">
            <div
              className="w-1/2 px-2 box box h-18 w-40"
              style={{ marginRight: "20px", marginBottom: "8px" }}
            >
              <label>Game Time</label>
              <input
                type="time"
                name={`time`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div
              className="px-2 box box h-18 w-40"
              style={{ marginBottom: "8px" }}
            >
              <label>Data Paste</label>
              <input
                type="text"
                name={`data`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="box box h-18 w-60" style={{ marginLeft: "40px" }}>
              <label>Visitor Team</label>
              <input
                name={`visitorTeam`}
                value={"New York Islanders"}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>V Sprd</label>
              <input
                type="number"
                name={`vSprd`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>V Sprd Odds</label>
              <input
                type="number"
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
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>V O/U</label>
              <input
                type="number"
                name={`vOU`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>V O/U Odds</label>
              <input
                type="number"
                name={`vOUOdds`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-5 ">
            <div className="box box h-18 w-60" style={{ marginLeft: "40px" }}>
              <label>Home Team</label>
              <input
                name={`homeTeam`}
                value={"Home Team Name"}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>H Sprd</label>
              <input
                type="number"
                name={`hSprd`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>H Sprd Odds</label>
              <input
                type="number"
                name={`hSprdOdds`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>Home M/L</label>
              <input
                type="number"
                name={`hML`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>H O/U</label>
              <input
                type="number"
                name={`hOU`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
            <div className="px-2 box box h-18">
              <label>H O/U Odds</label>
              <input
                type="number"
                name={`hOUOdds`}
                className="bg-gray-800 text-white p-2 rounded w-full"
                disabled={true}
              />
            </div>
          </div>
        </div>

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
