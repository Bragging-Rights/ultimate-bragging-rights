import React, { useState, useEffect } from "react";
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamePlayedByUserId } from "../../Apis/predictions";
import { headerOptions } from "./data";
import "./NightResult.css";
import { teamNameMappings } from "./data";

const NightResult = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const [userStatsMap, setUserStatsMap] = useState({});

  const id = localStorage.getItem("_id");

  const getUser = async (userId) => {
    try {
      const res = await getUserById(userId);
      return res.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return null; // Return null if there's an error
    }
  };

  const getResult = async (userData) => {
    try {
      const res = await getGamePlayedByUserId(id);
      console.log("Game data:", res);
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
          userData, // Store userData directly in the game object
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
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    if (selectedLeague && headerOptions[selectedLeague]) {
      setFilteredHeaderOptions(headerOptions[selectedLeague]);
    } else {
      setFilteredHeaderOptions([]);
    }

    getUser(id).then((userData) => {
      getResult(userData);
    });
  }, [selectedLeague]);

  useEffect(() => {
    if (selectedLeague === "MLB" && gamesPlayed.length > 0) {
      const gameHeaders = new Set(
        gamesPlayed
          .map((game) => {
            const gameData = gameDataMap[game.gameData] || {};
            if (gameData.visitor && gameData.home) {
              return `${teamNameMappings[gameData?.visitor] || gameData?.visitor} VS ${teamNameMappings[gameData?.home] || gameData?.home}`;
            }
            return null;
          })
          .filter(Boolean)
      );

      setFilteredHeaderOptions((prevHeaders) => [
        ...new Set([...prevHeaders, ...gameHeaders]),
      ]);
    }
  }, [gamesPlayed, gameDataMap, selectedLeague]);

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

  return (
    <div className="table-container">
      <div className="night-result-container">
        <div className="animation-controls"></div>
        {/* <br />
        <br /> */}

        <table style={{ width: "100%" }}>
          <thead style={{ fontSize: "0.8rem" }}>
            <tr>
              {filteredHeaderOptions.map((item, ind) => (
                <th key={ind} className="text-xs font-medium">
                  {item}
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
