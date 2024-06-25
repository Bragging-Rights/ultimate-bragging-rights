import React, { useEffect, useState } from "react";
import "./tableComponent.css";
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamePlayedByUserId } from "../../Apis/predictions";
import { headerOptions } from "./data"; // Import headerOptions

const TableComponent = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({}); // To store gameData
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
          // Filter data based on the selected league
          const filteredData = res.data.data.gamesPlayed.filter(
            (game) => game.league === selectedLeague
          );

          // Add user data to each game entry
          const enhancedData = filteredData.map((game) => ({
            ...game,
            co: userData.country || "-",
            state: userData.state || "-",
            city: userData.city || "-",
            player: userData.leagues[0]?.username || "-", // Extracting username
            BR: game.result?.perfectScore || "-", // Assign perfectScore to BR
          }));

          setDataRows(enhancedData);

          // Create a map of gameData for easy lookup
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
          {Array.isArray(dataRows) && dataRows.length > 0 ? (
            dataRows.map((row, index) => {
              const gameData = gameDataMap[row.gameData] || {}; // Get the corresponding gameData

              // Calculate ML, O/U, and Spread
              const ml = `${gameData["h-ml-points"] || "0"} - ${
                gameData["v-ml-points"] || "0"
              }`;
              const ou = `${gameData["h-ou-points"] || "0"} - ${
                gameData["v-ou-points"] || "0"
              }`;
              const spread = `${gameData["h-sprd-points"] || "0"} - ${
                gameData["v-sprd-points"] || "0"
              }`;

              // Calculate TP (Total Points)
              const tp =
                parseFloat(gameData["h-ml-points"] || 0) +
                parseFloat(gameData["v-ml-points"] || 0) +
                (parseFloat(gameData["h-ou-points"] || 0) +
                  parseFloat(gameData["v-ou-points"] || 0)) +
                (parseFloat(gameData["h-sprd-points"] || 0) +
                  parseFloat(gameData["v-sprd-points"] || 0));

              // Calculate 1S, 1SW2, and 2SW2
              const p1sHome = gameData.result?.accuracyPoints?.home?.p1s || 0;
              const p1sVisitor =
                gameData.result?.accuracyPoints?.visitor?.p1s || 0;
              const p1s2pHome =
                gameData.result?.accuracyPoints?.home?.p1s2p || 0;
              const p1s2pVisitor =
                gameData.result?.accuracyPoints?.visitor?.p1s2p || 0;
              const p2s2pHome =
                gameData.result?.accuracyPoints?.home?.p2s2p || 0;
              const p2s2pVisitor =
                gameData.result?.accuracyPoints?.visitor?.p2s2p || 0;

              const oneS = p1sHome || p1sVisitor ? p1sHome + p1sVisitor : "-";
              const oneSW2 = p1s2pHome + p1s2pVisitor;
              const twoSW2 = p2s2pHome + p2s2pVisitor;

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
                    {`${gameData.hFinalScore || "-"} - ${
                      gameData.vFinalScore || "-"
                    }`}
                  </td>
                  <td
                    className="text-xs font-medium text-center"
                    style={{ color: "#ffff00" }}
                  >
                    {`${row.pick_visitor || "-"} - ${row.pick_home || "-"}`}
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
                    {row.R || "-"}
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
                    {row.Reg || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.OT || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.SO || "-"}
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
