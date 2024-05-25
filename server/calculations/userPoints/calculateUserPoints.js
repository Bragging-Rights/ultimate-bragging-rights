const { calculateResultPoints } = require("./calculations");
const { getGamePlayedByGameData } = require("../../controllers/gamesPlayed");
const GamesPlayed = require("../../models/gamesPlayed");
exports.calculateUserPoints = async (data) => {
  console.log("in calculateUserPoints");
  let sport = "";
  if (data.league === "NBA") {
    sport = "basketball";
  } else if (data.league === "NFL") {
    sport = "football";
  } else if (data.league === "NHL") {
    sport = "hockey";
  } else if (data.league === "MLB") {
    sport = "baseball";
  } else if (data.league === "NCAAF") {
    sport = "football";
  } else if (data.league === "NCAAB") {
    sport = "basketball";
  } else if (data.league === "WWBA") {
    sport = "baseball";
  } else if (data.league === "CFL") {
    sport = "football";
  } else if (data.league === "UFL") {
    sport = "football";
  } else if (data.league === "NCCA") {
    sport = "basketball";
  }
  const moneyline = { vml: data["v-ml"], hml: data["h-ml"] };
  const actualScore = { vScore: data.vScore, hScore: data.hScore };
  const moneylineTotalPoints = data["v-ml-points"] + data["h-ml-points"];
  const extraInnings = data.extraInnings;
  const gameEnd = data.gameEnd;
  const spread = { vSpread: data["v-sprd"], hSpread: data["h-sprd"] };
  const spreadPoints = {
    vSpreadPoints: data["v-sprd-points"],
    hSpreadPoints: data["h-sprd-points"],
  };
  const vOU = data["v-ou"];
  const vOUpoints = data["v-ou-points"];
  const hOU = data["h-ou"];
  const hOUpoints = data["h-ou-points"];

  // const gamePlayed = await getGamePlayedByGameData(data._id);
  let gamePlayed;
  try {
    gamePlayed = await GamesPlayed.find({ gameData: data._id });

    console.log("gamePlayed", gamePlayed);
    // rest of your code
  } catch (error) {
    console.error(error);
    // handle error
  }

  const resultPoints = gamePlayed.map((game) => {
    const pickedScore = {
      pickVistor: game.pick_visitor,
      pickHome: game.pick_home,
    };
    const pickedWinner =
      game.pick_visitor > game.pick_home ? game.pick_visitor : game.pick_home;
    const userInnings = game.innings;
    const userpick = game.gameEnding;
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
      moneylineTotalPoints,
      userpick,
      gameEnd,
      userInnings,
      extraInnings,
      spread,
      spreadPoints,
      vOU,
      vOUpoints,
      hOU,
      hOUpoints
    );
  });
  console.log("resultPoints", resultPoints);
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
  // return resultPoints;
};
