import React, { useEffect, useState } from "react";
import "./Styles.css"; // Import the CSS file containing the hide-scrollbar class
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

const StandingsTables = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const id = localStorage.getItem("_id");

  const getUser = () => {
    return getUserById(id).then((res) => {
      // console.log("User data:", res);
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
    <div
      className="hide-scrollbar"
      style={{ color: "white", marginTop: "10px", overflowX: "auto" }}
    >
      <table className="custom-table ">
        <thead>
          <tr>
            {/* <th style={{ cursor: "pointer" }}>TEAMS</th> */}
            <th style={{ cursor: "pointer" }}>CO</th>
            <th style={{ cursor: "pointer" }}>CTY/PROV</th>
            <th style={{ cursor: "pointer" }}>FAV</th>
            <th style={{ cursor: "pointer" }}>RANK</th>
            <th style={{ cursor: "pointer" }}>PLAYER</th>
            <th style={{ cursor: "pointer" }}>WPT</th>
            <th style={{ cursor: "pointer" }}>GP</th>
            <th style={{ cursor: "pointer" }}>BR</th>
            <th style={{ cursor: "pointer" }}>W</th>
            <th style={{ cursor: "pointer" }}>L</th>
            <th style={{ cursor: "pointer" }}>CS</th>
            <th style={{ cursor: "pointer" }}>WS</th>
            <th style={{ cursor: "pointer" }}>LS</th>
            <th style={{ cursor: "pointer" }}>1S </th>
            <th style={{ cursor: "pointer" }}>1S0</th>
            <th style={{ cursor: "pointer" }}>2S0</th>
            <th style={{ cursor: "pointer" }}>1SW2</th>
            <th style={{ cursor: "pointer" }}>2SW2</th>
            <th style={{ cursor: "pointer" }}>1SW3</th>
            <th style={{ cursor: "pointer" }}>2SW3</th>
            <th style={{ cursor: "pointer" }}>1SW7</th>
            <th style={{ cursor: "pointer" }}>2SW7</th>
            <th style={{ cursor: "pointer" }}>ML</th>
            <th style={{ cursor: "pointer" }}>SPRD</th>
            <th style={{ cursor: "pointer" }}>O/U</th>
            <th style={{ cursor: "pointer" }}>APN</th>
            <th style={{ cursor: "pointer" }}>APG</th>
            <th style={{ cursor: "pointer" }}>F</th>
            <th style={{ cursor: "pointer" }}>U</th>
            <th style={{ cursor: "pointer" }}>REG</th>
            <th style={{ cursor: "pointer" }}>EI</th>
            <th style={{ cursor: "pointer" }}>OT</th>
            <th style={{ cursor: "pointer" }}>S/O</th>
            <th style={{ cursor: "pointer" }}>L10</th>
            <th style={{ cursor: "pointer" }}>FPTS</th>
            <th style={{ cursor: "pointer" }}>UPTS</th>
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

              // Calculate 1SW3 and 2SW3
              const oneSW3 = (
                (row.result?.accuracyPoints?.home?.p1s3p || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s3p || 0)
              ).toFixed(2);

              const twoSW3 = (
                (row.result?.accuracyPoints?.home?.p2s3p || 0) +
                (row.result?.accuracyPoints?.vistor?.p2s3p || 0)
              ).toFixed(2);

              // Calculate 1SW7 and 2SW7
              const oneSW7 = (
                (row.result?.accuracyPoints?.home?.p1s7p || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s7p || 0)
              ).toFixed(2);

              const twoSW7 = (
                (row.result?.accuracyPoints?.home?.p2s7p || 0) +
                (row.result?.accuracyPoints?.vistor?.p2s7p || 0)
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
                    {row.co || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.state || "-"}/{row.city || "-"}
                  </td>
                  <td className="text-xs font-medium text-center"></td>
                  <td className="text-xs font-medium text-center">
                    {ranks[index]}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.player || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.state || "-"}
                  </td>
                  <td className="text-xs font-medium text-center"></td>
                  <td className="text-xs font-medium text-center">
                    {row.BR || "-"}
                  </td>
                  <td className="text-xs font-medium text-center"></td>
                  <td className="text-xs font-medium text-center"></td>
                  <td className="text-xs font-medium text-center"></td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">{oneSW2}</td>
                  <td className="text-xs font-medium text-center">{twoSW2}</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">0</td>{" "}
                  <td className="text-xs font-medium text-center">0</td>{" "}
                  <td className="text-xs font-medium text-center">0</td>{" "}
                  <td className="text-xs font-medium text-center">0</td>{" "}
                  <td className="text-xs font-medium text-center">0</td>
                  <td className="text-xs font-medium text-center">{ou}</td>
                  {renderColumns(row, index, ranks, tpValues, gameData)}
                  {/* Add a new column for the extracted vegasOdds value */}
                  {/* <td className="text-xs font-medium text-center">
                    {vegasOddsValue}
                  </td> */}
                  <td className="text-xs font-medium text-center">{spread}</td>
                  <td className="text-xs font-medium text-center">{oneS}</td>
                  <td className="text-xs font-medium text-center">
                    {row["1S0"] || "-"}
                  </td>
                  <td className="text-xs font-medium text-center"></td>
                  <td className="text-xs font-medium text-center"></td>
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
        {/* <tbody className="divide-y divide-gray-200">
          {Array.isArray(gamesPlayed) && gamesPlayed.length > 0 ? (
            gamesPlayed.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.teamName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.co}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.fav}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {ranks[rowIndex]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.player}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.wpt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.gp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.BR}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.W}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.L}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.CS}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.WS}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.LS}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["1S"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["1S0"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["2S0"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["1SW2"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["2SW2"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["1SW3"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["2SW3"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["1SW7"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row["2SW7"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.ML}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.SPRD}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.OU}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.APN}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.APG}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.F}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.U}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.REG}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.OT}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.SO}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.EI}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.L10}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {tpValues[rowIndex]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   ">
                  {row.UPTS}
                </td>
                {renderColumns(row)}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={37}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody> */}
      </table>
    </div>
  );
};

export default StandingsTables;
