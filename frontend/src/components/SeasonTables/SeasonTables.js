import React, { useEffect, useState } from "react";
import "./Styles.css";
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamePlayedByUserId } from "../../Apis/predictions";
import { headerOptions } from "./data"; // Import headerOptions
const calculateReg = (row) => {
  return row.result?.endingsPoints?.pickRegulation || 0;
};

const calculateOT = (row) => {
  return row.result?.endingsPoints?.pickOverTime || 0;
};

const calculateSO = (row) => {
  return row.result?.endingsPoints?.pickShootout || 0;
};

const calculateEI = (row) => {
  return row.result?.endingsPoints?.pickExtraInnings || 0;
};

// Utility functions for calculations
const calculateWinStreak = (games) => {
  let maxStreak = 0,
    currentStreak = 0;
  games.forEach((game) => {
    if (game.BR > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });
  return maxStreak;
};

const calculateLossStreak = (games) => {
  let maxStreak = 0,
    currentStreak = 0;
  games.forEach((game) => {
    if (game.BR <= 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });
  return maxStreak;
};

const calculateCurrentStreak = (games) => {
  let streak = "";
  let wins = 0,
    losses = 0;
  for (let i = games.length - 1; i >= 0; i--) {
    if (games[i].BR > 0) {
      wins++;
      if (losses > 0) break;
    } else {
      losses++;
      if (wins > 0) break;
    }
  }
  if (wins > 0) streak = `W${wins}`;
  if (losses > 0) streak = `L${losses}`;
  return streak;
};

const calculatePointsPercentage = (games, condition) => {
  const totalPoints = games.reduce(
    (acc, game) => acc + (game[condition] || 0),
    0
  );
  const maxPoints = games.length * 100; // Assume max points per condition is 100
  return ((totalPoints / maxPoints) * 100).toFixed(2);
};

const calculateL10 = (games) => {
  const last10Games = games.slice(-10);
  let winCount = 0,
    lossCount = 0;
  last10Games.forEach((game) => {
    if (game.BR > 0) winCount++;
    else lossCount++;
  });
  return `${winCount}/${lossCount}`;
};

const calculateFavoritePointsPercentage = (games) => {
  // Placeholder logic for favorite points calculation
  const favoritePoints = games.reduce(
    (acc, game) => acc + (game.favoritePoints || 0),
    0
  );
  const maxFavoritePoints = games.length * 100; // Assume max points for favorites is 100
  return ((favoritePoints / maxFavoritePoints) * 100).toFixed(2);
};

const calculateUnderdogPointsPercentage = (games) => {
  // Placeholder logic for underdog points calculation
  const underdogPoints = games.reduce(
    (acc, game) => acc + (game.underdogPoints || 0),
    0
  );
  const maxUnderdogPoints = games.length * 100; // Assume max points for underdogs is 100
  return ((underdogPoints / maxUnderdogPoints) * 100).toFixed(2);
};

// Function to calculate user statistics
const calculateUserStats = (games) => {
  const statsMap = {};

  games.forEach((game) => {
    const userId = game.userId;

    if (!statsMap[userId]) {
      statsMap[userId] = {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        points: 0,
        CGS: 0, // Add CGS property to track consecutive predictions
      };
    }

    statsMap[userId].gamesPlayed += 1;
    statsMap[userId].points += game.BR ? parseFloat(game.BR) : 0;

    if (game.BR > 0) {
      statsMap[userId].wins += 1;
    } else {
      statsMap[userId].losses += 1;
    }

    // Increment CGS if the user made a prediction
    if (game.result?.predictionMade) {
      statsMap[userId].CGS += 1;
    } else {
      statsMap[userId].CGS = 0; // Reset CGS if the user didn't make a prediction
    }
  });

  Object.keys(statsMap).forEach((userId) => {
    const userStats = statsMap[userId];
    userStats.winPercentage = (
      (userStats.wins / userStats.gamesPlayed) *
      100
    ).toFixed(2);
    userStats.avgPointsPerGame = (
      userStats.points / userStats.gamesPlayed
    ).toFixed(2);
  });

  return statsMap;
};

const SeasonalTables = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const [userStatsMap, setUserStatsMap] = useState({});
  const id = localStorage.getItem("_id");

  const getUser = () => {
    return getUserById(id).then((res) => {
      console.log(res.data);
      return res.data; // Return the user data
    });
  };
  const [userTeam, setUserTeam] = useState("");

  const getResult = (userData) => {
    getGamePlayedByUserId(id)
      .then((res) => {
        if (
          res.data &&
          res.data.data &&
          Array.isArray(res.data.data.gamesPlayed)
        ) {
          const filteredData = res.data.data.gamesPlayed.filter(
            (game) => game.league === selectedLeague
          );

          const enhancedData = filteredData.map((game) => ({
            ...game,
            co: userData.country || "-",
            state: userData.state || "-",
            city: userData.city || "-",
            player: userData.leagues[0]?.username || "-", // Extracting username
            BR:
              game.result?.perfectScore != null
                ? parseFloat(game.result?.perfectScore).toFixed(2)
                : "-",
            vegasOdds: game.result?.vegasOdds || {},
          }));

          setGamesPlayed(enhancedData);

          const gameDataArray = res.data.data.gameData || [];
          const gameDataLookup = {};
          gameDataArray.forEach((game) => {
            gameDataLookup[game._id] = game;
          });
          setGameDataMap(gameDataLookup);

          const userStats = calculateUserStats(enhancedData);
          setUserStatsMap(userStats);

          // Extract and set the user's team
          const team = userData.leagues[0]?.team || "-";
          setUserTeam(team);
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
      setFilteredHeaderOptions([]); // Set empty array for consistency
    }

    getUser().then((userData) => {
      getResult(userData);
    });
  }, [selectedLeague]);

  // Calculate TP points and ranks
  const calculateTPandRank = (games) => {
    const tpValues = games.map((row) => {
      return parseFloat(
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
    });

    // Rank the TP values
    const sortedTPValues = [...tpValues].sort((a, b) => b - a);
    const ranks = tpValues.map((tp) => sortedTPValues.indexOf(tp) + 1);

    return { tpValues, ranks };
  };

  // Calculate TP points and ranks
  const { tpValues, ranks } = calculateTPandRank(gamesPlayed);

  // Define a function to render the appropriate columns based on the selected league
  const renderColumns = (row, index, ranks, tpValues, gameData) => {
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
          {Array.isArray(gamesPlayed) && gamesPlayed.length > 0 ? (
            gamesPlayed.map((row, index) => {
              const gameData = gameDataMap[row.gameData] || {};
              const userStats = userStatsMap[row.userId] || {};

              const oneS = (
                (row.result?.accuracyPoints?.home?.p1s || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s || 0)
              ).toFixed(2);

              const oneSW2 = (
                (row.result?.accuracyPoints?.home?.p1s2p || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s2p || 0)
              ).toFixed(2);

              const oneS0 = (
                (row.result?.accuracyPoints?.home?.p1s0 || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s0 || 0)
              ).toFixed(2);

              const twoSW2 = (
                (row.result?.accuracyPoints?.home?.p2s2p || 0) +
                (row.result?.accuracyPoints?.vistor?.p2s2p || 0)
              ).toFixed(2);

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

              const apg = (
                userStats.avgPointsPerGame !== undefined
                  ? Number(userStats.avgPointsPerGame)
                  : 0
              ).toFixed(2);
              const ws = calculateWinStreak(gamesPlayed);
              const ls = calculateLossStreak(gamesPlayed);
              const cs = calculateCurrentStreak(gamesPlayed);
              const fPercentage = calculatePointsPercentage(
                gamesPlayed,
                "favoritePoints"
              );
              const uPercentage = calculatePointsPercentage(
                gamesPlayed,
                "underdogPoints"
              );
              const regPercentage = calculatePointsPercentage(
                gamesPlayed,
                "pickRegulation"
              );
              const eiPercentage = calculatePointsPercentage(
                gamesPlayed,
                "pickExtraInnings"
              );
              const l10 = calculateL10(gamesPlayed);
              const favPointsPercentage =
                calculateFavoritePointsPercentage(gamesPlayed);
              const underdogPointsPercentage =
                calculateUnderdogPointsPercentage(gamesPlayed);

              return (
                <tr
                  key={index}
                  className="h-14 bg-[#181818] text-white separator"
                >
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
                    {userTeam || "-"}
                  </td>

                  <td className="text-xs font-medium text-center">
                    {ranks[index] || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {userStats.winPercentage || "0.00%"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {userStats.gamesPlayed || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.BR || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {userStats.wins || "0"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {userStats.losses || "0"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {cs || "0"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {ws || "0"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {ls || "0"}
                  </td>

                  <td className="text-xs font-medium text-center">{oneS}</td>
                  <td className="text-xs font-medium text-center">{oneS0}</td>
                  <td className="text-xs font-medium text-center">{oneSW2}</td>
                  <td className="text-xs font-medium text-center">{twoSW2}</td>
                  <td className="text-xs font-medium text-center">{ml}</td>
                  <td className="text-xs font-medium text-center">{spread}</td>
                  <td className="text-xs font-medium text-center">{ou}</td>
                  <td className="text-xs font-medium text-center">{"apn"}</td>
                  <td className="text-xs font-medium text-center">{"awp"}</td>
                  <td className="text-xs font-medium text-center">{apg}</td>

                  <td className="text-xs font-medium text-center">
                    {fPercentage || "0.00%"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {uPercentage || "0.00%"}
                  </td>

                  {renderColumns(row, index, ranks, tpValues, gameData)}
                  <td className="text-xs font-medium text-center">{l10}</td>
                  <td className="text-xs font-medium text-center">
                    {userStats.CGS || 0}
                  </td>

                  <td className="text-xs font-medium text-center">
                    {favPointsPercentage}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {underdogPointsPercentage}
                  </td>
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

export default SeasonalTables;
