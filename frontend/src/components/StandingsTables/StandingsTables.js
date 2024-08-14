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
  // calculation of "APN","APG""F""U""Reg""EI""OT""S/O""L10""FPTS""UPTS",

  //   const calculateAPN = (games) => {
  //     const totalPoints = games.reduce((acc, game) => acc + (game.result?.totalPoints || 0), 0);
  //     const nights = new Set(games.map(game => game.date)); // Assuming 'date' is available and unique per night
  //     return (totalPoints / nights.size).toFixed(2);
  //   };

  //   const calculateAPG = (games) => {
  //     const totalPoints = games.reduce((acc, game) => acc + (game.result?.totalPoints || 0), 0);
  //     return (totalPoints / games.length).toFixed(2);
  //   };
  //   const calculateF = (games) => {
  //     const correctFavs = games.filter(game =>
  //       game.result?.favoriteWin && game.predictedFavorite === game.result?.favorite
  //     ).length;
  //     const totalFavs = games.filter(game => game.result?.favoriteWin).length;
  //     return (correctFavs / totalFavs * 100).toFixed(2);
  //   };
  //   const calculateU = (games) => {
  //     const correctUnderdogs = games.filter(game =>
  //       !game.result?.favoriteWin && game.predictedUnderdog === game.result?.underdog
  //     ).length;
  //     const totalUnderdogs = games.filter(game => !game.result?.favoriteWin).length;
  //     return (correctUnderdogs / totalUnderdogs * 100).toFixed(2);
  //   };
  //   const calculateREG = (games) => {
  //     const correctRegs = games.filter(game =>
  //       game.result?.endInRegulation && game.predictedRegulation
  //     ).length;
  //     const totalRegs = games.filter(game => game.result?.endInRegulation).length;
  //     return (correctRegs / totalRegs * 100).toFixed(2);
  //   };
  //   const calculateEI = (games) => {
  //     const correctEIs = games.filter(game =>
  //       game.result?.endInExtraInnings && game.predictedExtraInnings
  //     ).length;
  //     const totalEIs = games.filter(game => game.result?.endInExtraInnings).length;
  //     return (correctEIs / totalEIs * 100).toFixed(2);
  //   };

  //   const calculateSO = (games) => {
  //     const correctSOs = games.filter(game =>
  //       game.result?.endInShootout && game.predictedShootout
  //     ).length;
  //     const totalSOs = games.filter(game => game.result?.endInShootout).length;
  //     return (correctSOs / totalSOs * 100).toFixed(2);
  //   };

  //   const calculateOT = (games) => {
  //     const correctOTs = games.filter(game =>
  //       game.result?.endInOvertime && game.predictedOvertime
  //     ).length;
  //     const totalOTs = games.filter(game => game.result?.endInOvertime).length;
  //     return (correctOTs / totalOTs * 100).toFixed(2);
  //   };

  //   const calculateL10 = (games) => {
  //     const last10Games = games.slice(-10);
  //     const wins = last10Games.filter(game => game.result?.win).length;
  //     const losses = last10Games.filter(game => !game.result?.win).length;
  //     return { wins, losses };
  //   };

  //   const calculateFPTS = (games) => {
  //     const totalFavPoints = games.reduce((acc, game) => acc + (game.result?.favoritePoints || 0), 0);
  //     const totalPossibleFavPoints = games.length * MAX_FAVORITE_POINTS; // Define MAX_FAVORITE_POINTS as needed
  //     return ((totalFavPoints / totalPossibleFavPoints) * 100).toFixed(2);
  //   };

  //   const calculateUPTS = (games) => {
  //   const totalUnderdogPoints = games.reduce((acc, game) => acc + (game.result?.underdogPoints || 0), 0);
  //   const totalPossibleUnderdogPoints = games.length * MAX_UNDERDOG_POINTS; // Define MAX_UNDERDOG_POINTS as needed
  //   return ((totalUnderdogPoints / totalPossibleUnderdogPoints) * 100).toFixed(2);
  // };

  return (
    <div
      className="hide-scrollbar"
      style={{ color: "white", marginTop: "10px", overflowX: "auto" }}
    >
      <table className="custom-table ">
        <thead>
          <tr>
            {filteredHeaderOptions.map((item, ind) => (
              <th key={ind} className="text-xs font-medium text-center">
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
                  <td className="text-xs font-medium text-center">
                    {row.player || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {ranks[index]}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {/* {row.player || "-"} */}
                    {tp}
                  </td>
                  <td className="text-xs font-medium text-center">
                    {row.BR || "-"}
                    {/* {row.state || "-"} */}
                  </td>
                  <td className="text-xs font-medium text-center"> {ml}</td>
                  <td className="text-xs font-medium text-center">
                    {/* {row.BR || "-"} */}
                    {spread}
                  </td>
                  <td className="text-xs font-medium text-center">{ou}</td>
                  <td className="text-xs font-medium text-center">{oneS}</td>
                  <td className="text-xs font-medium text-center">
                    {" "}
                    {row["1S0"] || "-"}
                  </td>
                  <td className="text-xs font-medium text-center">{oneSW2}</td>
                  <td className="text-xs font-medium text-center">{twoSW2}</td>
                  {renderColumns(row, index, ranks, tpValues, gameData)}
                  {/* Add a new column for the extracted vegasOdds value */}
                  {/* <td className="text-xs font-medium text-center">
                    {vegasOddsValue}
                  </td> */}
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

export default StandingsTables;
