const { calculateResultPoints } = require("./calculations");
const { getGamePlayedByGameData } = require("../../controllers/gamesPlayed");

exports.calculateUserPoints = async (data) => {
  const sport = "";
  if (league.league === "NBA") {
    sport = "basketball";
  } else if (league.league === "NFL") {
    sport = "football";
  } else if (league.league === "NHL") {
    sport = "hockey";
  } else if (league.league === "MLB") {
    sport = "baseball";
  } else if (league.league === "NCAAF") {
    sport = "football";
  } else if (league.league === "NCAAB") {
    sport = "basketball";
  } else if (league.league === "WWBA") {
    sport = "baseball";
  } else if (league.league === "CFL") {
    sport = "football";
  } else if (league.league === "UFL") {
    sport = "football";
  } else if (league.league === "NCCA") {
    sport = "basketball";
  }
  const moneyline = data.vScore > data.hScore ? data.v - ml : data.h - ml;
  const gamePlayed = await getGamePlayedByGameData(data._id);
  const pickedScore = [data.vPediction, data.hPediction];
  const actualScore = [data.vScore, data.hScore];
  const pickedWinner =
    data.vPediction > data.hPediction ? data.vPediction : data.hPediction;
  const moneylineTotalPoints = data.v - ml - points + data.h - ml - points;
  const resultPoints = gamePlayed.map((game) => {
    return calculateResultPoints(
      sport,
      moneyline,
      data["v-sprd-odds"],
      data["h-sprd-odds"],
      data["v-ou-odds"],
      data["h-ou-odds"],
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints
    );
  });

  //   const resultPoints = calculateResultPoints(
  //     sport,
  //     moneyline,
  //     data.v - sprd - odds,
  //     data.h - sprd - odds,
  //     data.v - ou - odds,
  //     data.h - ou - odds,
  //     pickedScore,
  //     actualScore,
  //     pickedWinner,
  //     moneylineTotalPoints
  //   );
  return resultPoints;
};
