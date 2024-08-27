import React, { useState, useEffect } from "react";
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamesPlayedByDate } from "../../Apis/predictions";
import { headerOptions, teamNameMappings } from "./data";
import "./NightResult.css";

const NightResult = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const [userStatsMap, setUserStatsMap] = useState({});
  const [tpValuesMap, setTpValuesMap] = useState({}); // Map to store TP values for each header

  const id = localStorage.getItem("_id");

  const getUser = async (userId) => {
    try {
      const res = await getUserById(userId);
      return res.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return null;
    }
  };

  const getResult = async (userData) => {
    try {
      // Calculate yesterday's date
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedDate = yesterday.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      console.log(formattedDate);
      const res = await getGamesPlayedByDate(formattedDate); // Pass the formatted date
      console.log("Game data:", res);
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
        const filteredData = res.data.data.gamesPlayed.filter(
          (game) => game.league === selectedLeague
        );

        const enhancedData = filteredData.map((game) => ({
          ...game,
          userData,
          BR:
            game.result?.perfectScore != null
              ? parseFloat(game.result?.perfectScore).toFixed(2)
              : "-",
          vegasOdds: game.result?.vegasOdds || {},
          tp: calculateTp(game), // Calculate TP for each game
        }));

        setGamesPlayed(enhancedData);
        const userStats = calculateUserStats(enhancedData);
        setUserStatsMap(userStats);

        // Prepare TP values map for each home vs. visitor matchup
        const newTpValuesMap = {};
        enhancedData.forEach((game) => {
          const gameData = gameDataMap[game.gameData] || {};
          if (gameData.visitor && gameData.home) {
            const header = `${
              teamNameMappings[gameData?.visitor] || gameData?.visitor
            } VS ${teamNameMappings[gameData?.home] || gameData?.home}`;
            if (!newTpValuesMap[header]) {
              newTpValuesMap[header] = {};
            }
            newTpValuesMap[header][game.userId] = game.tp;
          }
        });
        setTpValuesMap(newTpValuesMap);
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  const calculateTp = (game) => {
    // Adjust this calculation based on your actual data structure
    return parseFloat(
      (game.result?.accuracyPoints?.home?.p1s || 0) +
        (game.result?.accuracyPoints?.visitor?.p1s || 0) +
        (game.result?.accuracyPoints?.home?.p1s2p || 0) +
        (game.result?.accuracyPoints?.visitor?.p1s2p || 0) +
        (game.result?.accuracyPoints?.home?.p2s2p || 0) +
        (game.result?.accuracyPoints?.visitor?.p2s2p || 0) +
        (game.result?.vegasOdds?.pickingFavorite ||
          game.result?.vegasOdds?.pickingUnderdog ||
          0) +
        (game.result?.vegasOdds?.pickingOver ||
          game.result?.vegasOdds?.pickingUnder ||
          0) +
        (game.result?.vegasOdds?.pickingSpread?.vSpreadPoints ||
          game.result?.vegasOdds?.pickingSpread?.hSpreadPoints ||
          0) +
        (game.BR || 0)
    ).toFixed(2);
  };

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
        };
      }

      statsMap[userId].gamesPlayed += 1;
      statsMap[userId].points += game.BR ? parseFloat(game.BR) : 0;

      if (game.BR > 0) {
        statsMap[userId].wins += 1;
      } else {
        statsMap[userId].losses += 1;
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

  useEffect(() => {
    if (selectedLeague && headerOptions[selectedLeague]) {
      const headers = [...headerOptions[selectedLeague]];

      // Adding "Home vs. Visitor" matchups to headers
      gamesPlayed.forEach((game) => {
        const gameData = gameDataMap[game.gameData] || {};
        if (gameData.visitor && gameData.home) {
          const header = `${
            teamNameMappings[gameData?.visitor] || gameData?.visitor
          } VS ${teamNameMappings[gameData?.home] || gameData?.home}`;
          if (!headers.includes(header)) {
            headers.push(header);
          }
        }
      });

      setFilteredHeaderOptions(headers);
    } else {
      setFilteredHeaderOptions([]);
    }

    getResult();
  }, [selectedLeague]);

  return (
    <div className="table-container">
      <div className="night-result-container">
        <table style={{ width: "100%" }}>
          <thead style={{ fontSize: "0.8rem" }}>
            <tr>
              {filteredHeaderOptions.map((item, ind) => (
                <th key={ind} className="text-xs font-medium">
                  {item}
                </th>
              ))}
            </tr>
            {/* Add TP values header row */}
            <tr>
              {filteredHeaderOptions.map((item, ind) => (
                <th key={ind} className="text-xs font-medium">
                  {/* Only display TP values below the matchups */}
                  {item.includes("VS")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.8rem" }}>
            {Array.isArray(gamesPlayed) && gamesPlayed.length > 0 ? (
              Object.keys(userStatsMap).map((userId, index) => {
                const userStats = userStatsMap[userId];
                const game = gamesPlayed.find((game) => game.userId === userId);
                const userData = game ? game.userData : {};

                return (
                  <tr key={index} className={`position-${index + 1}`}>
                    <td className="text-xs font-medium text-center">
                      {userData?.country || "-"}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {userData?.state || "-"}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {userData?.leagues?.[0]?.username || "-"}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {userStats.winPercentage}%
                    </td>
                    <td className="text-xs font-medium text-center">
                      {userStats.gamesPlayed}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {userStats.wins}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {userStats.losses}
                    </td>
                    <td className="text-xs font-medium text-center">{"0"}</td>
                    <td className="text-xs font-medium text-center">
                      {userStats.avgPointsPerGame}
                    </td>
                    <td className="text-xs font-medium text-center">{"-"}</td>
                    {filteredHeaderOptions
                      .filter((header) => header.includes("VS"))
                      .map((header, headerIndex) => (
                        <td
                          key={headerIndex}
                          className="text-xs font-medium text-center"
                        >
                          {tpValuesMap[header] && tpValuesMap[header][userId]
                            ? tpValuesMap[header][userId]
                            : "-"}
                        </td>
                      ))}
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
    </div>
  );
};

export default NightResult;
