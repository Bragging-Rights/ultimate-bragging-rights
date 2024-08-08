import React, { useEffect, useState } from "react";
import "./Styles.css"; // Import the CSS file containing the hide-scrollbar class
import { useLeagueContext } from "../LeagueContext";
import { getUserById } from "../../Apis/auth";
import { getGamePlayedByUserId } from "../../Apis/predictions";
import { headerOptions } from "./data"; // Import headerOptions

const calculateReg = (row) => row.result?.endingsPoints?.pickRegulation || 0;
const calculateOT = (row) => row.result?.endingsPoints?.pickOverTime || 0;
const calculateSO = (row) => row.result?.endingsPoints?.pickShootout || 0;
const calculateEI = (row) => row.result?.endingsPoints?.pickExtraInnings || 0;

const SeasonTables = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [gameDataMap, setGameDataMap] = useState({});
  const id = localStorage.getItem("_id");

  const getUser = async () => {
    try {
      const res = await getUserById(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getResult = async (userData) => {
    try {
      const res = await getGamePlayedByUserId(id);
      const allGames = res.data.data.gamesPlayed.filter(
        (game) => game.league === selectedLeague
      );

      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      const recentGames = allGames.filter(
        (game) => new Date(game.date) >= threeMonthsAgo
      );

      const enhancedData = allGames.map((game) => ({
        ...game,
        co: userData.country || "-",
        state: userData.state || "-",
        city: userData.city || "-",
        player: userData.leagues[0]?.username || "-",
        BR:
          game.result?.perfectScore != null
            ? parseFloat(game.result?.perfectScore).toFixed(2)
            : "-",
        vegasOdds: game.result?.vegasOdds || {},
      }));

      setGamesPlayed(enhancedData);
      setFilteredGames(recentGames);

      const gameDataArray = res.data.data.gameData || [];
      const gameDataLookup = gameDataArray.reduce((acc, game) => {
        acc[game._id] = game;
        return acc;
      }, {});
      setGameDataMap(gameDataLookup);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    if (selectedLeague === "MLB" && gamesPlayed.length > 0) {
      const gameHeaders = new Set(
        gamesPlayed
          .map((game) => {
            const gameData = gameDataMap[game.gameData] || {};
            if (gameData.visitor && gameData.home) {
              return `${
                headerOptions[gameData?.visitor] || gameData?.visitor
              } VS ${headerOptions[gameData?.home] || gameData?.home}`;
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
    const tpValues = games.map((row) =>
      parseFloat(
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
      ).toFixed(2)
    );

    const sortedTPValues = [...tpValues].sort((a, b) => b - a);
    const ranks = tpValues.map((tp) => sortedTPValues.indexOf(tp) + 1);

    return { tpValues, ranks };
  };

  const { tpValues, ranks } = calculateTPandRank(
    filteredGames.length > 0 ? filteredGames : gamesPlayed
  );

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

  const dataToRender = filteredGames.length > 0 ? filteredGames : gamesPlayed;

  return (
    <div
      className="hide-scrollbar"
      style={{ color: "white", marginTop: "10px", overflowX: "auto" }}
    >
      <table className="custom-table">
        <thead>
          <tr>
            {filteredHeaderOptions.map((item, ind) => (
              <th key={ind} className="text-xs font-medium">
                {item}
              </th>
            ))}
          </tr>
          {/* <tr>
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
            <th style={{ cursor: "pointer" }}>1S</th>
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
          </tr> */}
        </thead>
        <tbody>
          {dataToRender.length > 0 ? (
            dataToRender.map((row, index) => {
              const gameData = gameDataMap[row.gameData] || {};

              const tp = tpValues[index];
              const oneS = (
                (row.result?.accuracyPoints?.home?.p1s || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s || 0)
              ).toFixed(2);

              const oneSw2 = (
                (row.result?.accuracyPoints?.home?.p1s2p || 0) +
                (row.result?.accuracyPoints?.vistor?.p1s2p || 0)
              ).toFixed(2);

              const twoSw2 = (
                (row.result?.accuracyPoints?.home?.p2s2p || 0) +
                (row.result?.accuracyPoints?.vistor?.p2s2p || 0)
              ).toFixed(2);

              const twoSw3 = (
                (row.result?.accuracyPoints?.home?.p3s2p || 0) +
                (row.result?.accuracyPoints?.vistor?.p3s2p || 0)
              ).toFixed(2);
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
                <tr key={row._id}>
                  <td className="text-xs font-medium text-center">{row.co}</td>
                  <td className="text-xs font-medium text-center">
                    {row.state}/{row.city}
                  </td>
                  {/* <td className="text-xs font-medium text-center"></td> */}
                  <td className="text-xs font-medium text-center">
                    {row.player}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {ranks[index]}
                  </td>
                  <td className="text-xs font-medium text-center">{tp}</td>
                  {/* <td className="text-xs font-medium text-center">
                    {row.gamesPlayed}
                  </td> */}
                  <td className="text-xs font-medium text-center">{row.BR}</td>
                  <td className="text-xs font-medium text-center">
                    {/* {row.result?.win || 0} */}
                    {ml}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {/* {row.result?.lose || 0} */}
                    {ou}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {/* {row.result?.currentStreak || 0} */}
                    {spread}
                  </td>
                  <td className="text-xs font-medium text-center">{oneS}</td>
                  <td className="text-xs font-medium text-center">
                  {row["1S0"] || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">{oneSw2}</td>
                  <td className="text-xs font-medium text-center">{twoSw2}</td>
                  
                  {renderColumns(row, index, ranks, tpValues, gameData)}
                  
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="34" className="text-center">
                No games played in the selected league.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SeasonTables;
