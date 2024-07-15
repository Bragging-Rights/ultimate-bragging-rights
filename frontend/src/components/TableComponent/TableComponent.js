import React, { useEffect, useState } from "react";
import "./tableComponent.css";
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamePlayedByUserId } from "../../Apis/predictions";
import { headerOptions } from "./data"; // Import headerOptions

const TableComponent = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const id = localStorage.getItem("_id");

  const getUser = () => {
    return getUserById(id).then((res) => {
      console.log("User data:", res);
      return res.data; // Return the user data
    });
  };

  const getResult = (userData) => {
    getGamePlayedByUserId(id)
      .then((res) => {
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

          console.log("Enhanced data:", enhancedData);
          console.log("Game Data Map:", gameDataLookup);
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

  // Function to calculate TP points and rank them
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

              const tp = tpValues[index];

              // Calculate 1SW2 and 2SW2
              const oneS = (
                (row.result?.accuracyPoints?.home?.p1s || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s || 0)
              ).toFixed(2);

              const oneSW2 = (
                (row.result?.accuracyPoints?.home?.p1s2p || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s2p || 0)
              ).toFixed(2);

              const twoSW2 = (
                (row.result?.accuracyPoints?.home?.p2s2p || 0) +
                (row.result?.accuracyPoints?.vistor?.p2s2p || 0)
              ).toFixed(2);

              // Extract one of the values from vegasOdds
              const vegasOddsValue = row.vegasOdds?.pickExtraInnings || "0";

              // Compute ml, ou, spread values based on the specified properties
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
                  <td className="text-xs font-medium text-center">{oneS}</td>
                  <td className="text-xs font-medium text-center">
                    {row["1S0"] || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">{oneSW2}</td>
                  <td className="text-xs font-medium text-center">{twoSW2}</td>
                  <td className="text-xs font-medium text-center">
                    {row.Reg || "0"}
                  </td>
                  {/* <td className="text-xs font-medium text-center">
                    {row.OT || "-"}
                  </td> */}
                  {/* Add a new column for the extracted vegasOdds value */}
                  <td className="text-xs font-medium text-center">
                    {vegasOddsValue}
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

export default TableComponent;
