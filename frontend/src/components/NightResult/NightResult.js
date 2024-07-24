import React, { useState, useEffect } from "react";
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamesPlayedByDate } from "../../Apis/predictions"; // Updated import
import { headerOptions } from "./data"; // Adjust the path as necessary
import "./NightResult.css";

const NightResult = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const id = localStorage.getItem("_id");

  const getUser = () => {
    return getUserById(id).then((res) => res.data);
  };

  const getResult = (userData) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split("T")[0];

    getGamesPlayedByDate(formattedDate)
      .then((res) => {
        console.log("API Response:", res.data); // Log the response
        if (res.data && Array.isArray(res.data)) {
          const filteredData = res.data.filter(
            (game) => game.league === selectedLeague
          );

          const enhancedData = filteredData.map((game) => ({
            ...game,
            co: userData.country || "-",
            state: userData.state || "-",
            city: userData.city || "-",
            player: userData.leagues[0]?.username || "-",
            BR: game.result?.perfectScore || "-",
            vegasOdds: game.result?.vegasOdds || {},
          }));

          setGamesPlayed(enhancedData);

          const gameDataArray = res.data.data || [];
          const gameDataLookup = {};
          gameDataArray.forEach((game) => {
            gameDataLookup[game._id] = game;
          });
          setGameDataMap(gameDataLookup);
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
      console.log("getting user in night result", userData);
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
              return `${gameData.visitor} VS ${gameData.home}`;
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

  return (
    <div className="table-container">
      <div className="night-result-container">
        <div className="animation-controls"></div>
        <br />
        <br />

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
              gamesPlayed.map((row, index) => {
                const gameData = gameDataMap[row.gameData] || {};

                const tp =
                  parseFloat(gameData["h-ml-points"] || 0) +
                  parseFloat(gameData["v-ml-points"] || 0) +
                  (parseFloat(gameData["h-ou-points"] || 0) +
                    parseFloat(gameData["v-ou-points"] || 0)) +
                  (parseFloat(gameData["h-sprd-points"] || 0) +
                    parseFloat(gameData["v-sprd-points"] || 0));

                const oneS = (
                  (row.result?.accuracyPoints?.home?.p1s || 0) +
                  (row.result?.accuracyPoints?.visitor?.p1s || 0)
                ).toFixed(2);

                const oneSW2 = (
                  (row.result?.accuracyPoints?.home?.p1s2p || 0) +
                  (row.result?.accuracyPoints?.visitor?.p1s2p || 0)
                ).toFixed(2);

                const twoSW2 = (
                  (row.result?.accuracyPoints?.home?.p2s2p || 0) +
                  (row.result?.accuracyPoints?.visitor?.p2s2p || 0)
                ).toFixed(2);

                const vegasOddsValue = row.vegasOdds?.pickingFavorite || "-";

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
                    style={{ backgroundColor: row.backgroundColor }}
                    className={`position-${row.position}`}
                  >
                    <td className="text-xs font-medium text-center">
                      {row.co || "-"}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {row.state || "-"}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {row.player || "-"}
                    </td>
                    <td className="text-xs font-medium text-center">
                      {row.BR || "-"}
                    </td>

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
                      {row.city || "-"}
                    </td>
                    <td className="text-xs font-medium text-center">{"-"}</td>
                    <td
                      className="text-xs font-medium text-center"
                      style={{ color: "#ffff00" }}
                    >
                      {row.pick_visitor || "-"} - {row.pick_home || "-"}
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
    </div>
  );
};

export default NightResult;
