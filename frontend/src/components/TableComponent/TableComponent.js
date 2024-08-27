import React, { useEffect, useState } from "react";
import "./tableComponent.css";
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamePlayedByUserId } from "../../Apis/predictions";
import { headerOptions } from "./data"; // Import headerOptions

const calculateReg = (row) => row.result?.endingsPoints?.pickRegulation || 0;
const calculateOT = (row) => row.result?.endingsPoints?.pickOverTime || 0;
const calculateSO = (row) => row.result?.endingsPoints?.pickShootout || 0;
const calculateEI = (row) => row.result?.endingsPoints?.pickExtraInnings || 0;

const calculateMetrics = (row, league) => {
  const oneS = (
    (row.result?.accuracyPoints?.home?.p1s || 0) +
    (row.result?.accuracyPoints?.vistor?.p1s || 0)
  ).toFixed(2);

  const oneSO = (
    (row.result?.accuracyPoints?.home?.p1s0 || 0) +
    (row.result?.accuracyPoints?.vistor?.p1s0 || 0)
  ).toFixed(2);

  const oneSW2 = (
    (row.result?.accuracyPoints?.home?.p1s2p || 0) +
    (row.result?.accuracyPoints?.vistor?.p1s2p || 0)
  ).toFixed(2);

  const twoSW2 = (
    (row.result?.accuracyPoints?.home?.p2s2p || 0) +
    (row.result?.accuracyPoints?.vistor?.p2s2p || 0)
  ).toFixed(2);

  const oneSW3 = (
    (row.result?.accuracyPoints?.home?.p1s3p || 0) +
    (row.result?.accuracyPoints?.vistor?.p1s3p || 0)
  ).toFixed(2);

  const twoSW3 = (
    (row.result?.accuracyPoints?.home?.p2s3p || 0) +
    (row.result?.accuracyPoints?.vistor?.p2s3p || 0)
  ).toFixed(2);

  const oneSW7 = (
    (row.result?.accuracyPoints?.home?.p1s7p || 0) +
    (row.result?.accuracyPoints?.vistor?.p1s7p || 0)
  ).toFixed(2);

  const twoSW7 = (
    (row.result?.accuracyPoints?.home?.p2s7p || 0) +
    (row.result?.accuracyPoints?.vistor?.p2s7p || 0)
  ).toFixed(2);

  switch (league) {
    case "NHL":
      return { oneS, oneSO };
    case "NBA":
      return { oneS, oneSO, oneSW3, twoSW3, oneSW7, twoSW7 };
    case "MLB":
      return { oneS, oneSO, oneSW2, twoSW2 };
    case "NFL":
      return { oneS, oneSO, oneSW3, twoSW3, oneSW7, twoSW7 };
    default:
      return {};
  }
};

const TableComponent = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const id = localStorage.getItem("_id");

  const getUser = () => {
    return getUserById(id).then((res) => res.data);
  };

  const getResult = (userData) => {
    getGamePlayedByUserId(id)
      .then((res) => {
        if (
          res.data &&
          res.data.data &&
          Array.isArray(res.data.data.gamesPlayed)
        ) {
          const gameDataArray = res.data.data.gameData || [];
          const gameDataLookup = {};
          gameDataArray.forEach((game) => {
            gameDataLookup[game._id] = game;
          });
          setGameDataMap(gameDataLookup);

          const gamesPlayed = res.data.data.gamesPlayed;

          const startOfDay = new Date();
          startOfDay.setHours(0, 0, 0, 0); // 12:00 AM

          const endOfDay = new Date();
          endOfDay.setHours(23, 59, 59, 999); // 11:59 PM

          // Calculate remaining time for the day
          const now = new Date();
          const timeRemaining = endOfDay - now;

          const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          console.log(
            `Time remaining for today: ${hours} hours, ${minutes} minutes, ${seconds} seconds`
          );

          const filteredGamesPlayed = gamesPlayed.filter(
            (game) =>
              game.league === selectedLeague &&
              new Date(game.createdAt) >= startOfDay &&
              new Date(game.createdAt) <= endOfDay
          );

          const enhancedData = filteredGamesPlayed.map((playedGame) => {
            const correspondingGame = gameDataLookup[playedGame._id] || {};
            return {
              ...playedGame,
              ...correspondingGame,
              co: userData.country || "-",
              state: userData.state || "-",
              city: userData.city || "-",
              player: userData.leagues[0]?.username || "-",
              BR:
                playedGame?.result?.perfectScore != null
                  ? parseFloat(playedGame?.result?.perfectScore).toFixed(2)
                  : "-",
              vegasOdds: playedGame?.result?.vegasOdds || {},
            };
          });

          setGamesPlayed(enhancedData);
        } else {
          console.error("Expected array but got:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  };

  useEffect(() => {
    if (selectedLeague && headerOptions[selectedLeague]) {
      setFilteredHeaderOptions(headerOptions[selectedLeague]);
    } else {
      setFilteredHeaderOptions([]);
    }

    getUser().then((userData) => {
      getResult(userData);
    });
  }, [selectedLeague]);

  const calculateTPandRank = (games) => {
    const gamesWithTP = games.map((row) => {
      const tp = parseFloat(
        (row.result?.accuracyPoints?.home?.p1s || 0) +
          (row.result?.accuracyPoints?.vistor?.p1s || 0) +
          (row.result?.accuracyPoints?.home?.p1s2p || 0) +
          (row.result?.accuracyPoints?.vistor?.p1s2p || 0) +
          (row.result?.accuracyPoints?.home?.p2s2p || 0) +
          (row.result?.accuracyPoints?.vistor?.p2s2p || 0) +
          (row.result?.vegasOdds?.pickingFavorite ||
            row.result?.vegasOdds?.pickingUnderdog ||
            0) +
          (row.result?.vegasOdds?.pickingOver ||
            row.result?.vegasOdds?.pickingUnder ||
            0) +
          (row.result?.vegasOdds?.pickingSpread?.vSpreadPoints ||
            row.result?.vegasOdds?.pickingSpread?.hSpreadPoints ||
            0) +
          (row.BR || 0)
      ).toFixed(2);
      return { ...row, tp };
    });

    const sortedGames = gamesWithTP.sort((a, b) => b.tp - a.tp);
    const ranks = sortedGames.map((game, index) => index + 1);

    return { sortedGames, ranks };
  };

  const { sortedGames, ranks } = calculateTPandRank(gamesPlayed);

  const renderColumns = (row) => {
    const Reg = calculateReg(row);
    const OT = calculateOT(row);
    const SO = calculateSO(row);
    const EI = calculateEI(row);

    switch (selectedLeague) {
      case "NHL":
        return (
          <>
            <td className="text-xs font-medium text-center">{Reg || "0"}</td>
            <td className="text-xs font-medium text-center">{OT || "-"}</td>
            <td className="text-xs font-medium text-center">{SO || "-"}</td>
          </>
        );
      case "NBA":
      case "NFL":
        return (
          <>
            <td className="text-xs font-medium text-center">{Reg || "0"}</td>
            <td className="text-xs font-medium text-center">{OT || "-"}</td>
          </>
        );
      case "MLB":
        return (
          <>
            <td className="text-xs font-medium text-center">{Reg || "0"}</td>
            <td className="text-xs font-medium text-center">{EI || "0"}</td>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {filteredHeaderOptions.map((item, ind) => (
              <th key={ind} className="text-xs font-medium">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedGames.length > 0 ? (
            sortedGames.map((row, index) => {
              const gameData = gameDataMap[row.gameData] || {};
              const tp = row.tp;

              const metrics = calculateMetrics(row, selectedLeague);

              const vegasOddsValue = row.vegasOdds?.pickExtraInnings || "0";
              const ml = parseFloat(
                row.result?.vegasOdds?.pickingFavorite ||
                  row.result?.vegasOdds?.pickingUnderdog ||
                  0
              ).toFixed(2);

              const ou = parseFloat(
                row.result?.vegasOdds?.pickingOver ||
                  row.result?.vegasOdds?.pickingUnder ||
                  0
              ).toFixed(2);

              const spread = parseFloat(
                row.result?.vegasOdds?.pickingSpread?.vSpreadPoints ||
                  row.result?.vegasOdds?.pickingSpread?.hSpreadPoints ||
                  0
              ).toFixed(2);

              return (
                <tr
                  key={index}
                  className="h-14 bg-[#181818] text-white separator"
                >
                  <td className="text-xs font-medium text-center">
                    {gameData.visitor || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {gameData.home || "-"}
                  </td>
                  <td
                    className="text-xs font-medium text-center"
                    style={{ color: "#ffff00" }}
                  >
                    {gameData.vFinalScore || "-"} -{" "}
                    {gameData.hFinalScore || "-"}
                  </td>
                  <td
                    className="text-xs font-medium text-center"
                    style={{ color: "#ffff00" }}
                  >
                    {row.pick_visitor || "-"} - {row.pick_home || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {new Date(row.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.co || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.state || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.city || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.player || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {ranks[index] || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">{tp}</td>
                  <td className="text-xs font-medium text-center">
                    {row.BR || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">{ml}</td>
                  <td className="text-xs font-medium text-center">{ou}</td>
                  <td className="text-xs font-medium text-center">{spread}</td>
                  <td className="text-xs font-medium text-center">
                    {metrics.oneS}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {metrics.oneSO}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {metrics.oneSW2}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {metrics.twoSW2}
                  </td>
                  {renderColumns(row)}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={filteredHeaderOptions.length}
                className="text-xs font-medium text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
