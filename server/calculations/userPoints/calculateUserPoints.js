const { calculateResultPoints } = require("./calculations");
const { allotUserPoints } = require("./userPointsAllocator");
const GamesPlayed = require("../../models/gamesPlayed");

const leagueSportMap = {
  NBA: "basketball",
  NFL: "football",
  NHL: "hockey",
  MLB: "baseball",
  NCAAF: "football",
  NCAAB: "basketball",
  WWBA: "baseball",
  CFL: "football",
  UFL: "football",
  NCCA: "basketball",
};

exports.calculateUserPoints = async (data) => {
  // console.log("data", data); // data is the game data from the database
  const {
    league,
    vScore,
    hScore,
    "v-ml": vml,
    "h-ml": hml,
    "v-ml-points": vmlPoints,
    "h-ml-points": hmlPoints,
    extraInnings,
    gameEnd,
    "v-sprd": vSpread,
    "h-sprd": hSpread,
    "v-sprd-points": vSpreadPoints,
    "h-sprd-points": hSpreadPoints,
    "v-ou": vOU,
    "v-ou-points": vOUpoints,
    "h-ou": hOU,
    "h-ou-points": hOUpoints,
    "v-sprd-odds": vSprdOdds,
    "h-sprd-odds": hSprdOdds,
    "v-ou-odds": vOuOdds,
    "h-ou-odds": hOuOdds,
    _id,
  } = data;

  console.log("data", data);

  const sport = leagueSportMap[league] || "";
  const moneyline = { vml, hml };
  const actualScore = { vScore, hScore };

  const moneylineTotalPoints = Number(vmlPoints) + Number(hmlPoints);
  const spread = { vSpread, hSpread };
  const spreadPoints = { vSpreadPoints, hSpreadPoints };

  let gamePlayed;
  try {
    gamePlayed = await GamesPlayed.find({ gameData: _id });
  } catch (error) {
    console.error(error);
    return;
  }

  console.log("gamePlayed", gamePlayed);

  const resultPoints = gamePlayed.map((game) => {
    const {
      pick_visitor: pickVistor,
      pick_home: pickHome,
      innings: userInnings,
      gameEnding: userpick,
    } = game;
    const pickedScore = { pickVistor, pickHome };
    const pickedWinner = pickVistor > pickHome ? pickVistor : pickHome;

    return {
      playedGame: game,
      result: calculateResultPoints(
        sport,
        moneyline,
        vSprdOdds,
        hSprdOdds,
        vOuOdds,
        hOuOdds,
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
      ),
    };
  });

  allotUserPoints(resultPoints);
};
