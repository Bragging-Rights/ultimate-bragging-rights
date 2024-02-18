const {
  picking1Score,
  picking1Score2Points,
  picking2Score2Points,
  picking1Score3Points,
  picking2Score3Points,
  picking1Score7Points,
  picking2Score7Points,
} = require("./accuracyPoints");

const {
  pickRegulation,
  pickOvertime,
  pickExtraInnings,
  pickShootout,
} = require("./gameEndingPoints");

const perfectScore = require("./perfectScore");

const { oneTeamShutout, twoTeamShutout } = require("./shutoutPoints");

const {
  pickingFavorite,
  pickingUnderdog,
  pickingSpread,
  pickingOver,
  pickingUnder,
} = require("./vegasOdds");

exports.calculatePoints = (
  sport,
  moneyline,
  visitorSpreadOdds,
  homeSpreadOdds,
  visitorOverUnderOdds,
  HomeOverUnderOdds
) => {
  // create skeleton for calculating points

  const ap = accuracyPoints(
    sport,
    pickedScore,
    actualScore,
    pickedWinner,
    moneylineTotalPoints
  );
  
  const ep = endingsPoints(sport);


  // const ps = perfectScore(sport);
  // const vp = vegasOdds(
  //   sport,
  //   moneyline,
  //   visitorSpreadOdds,
  //   homeSpreadOdds,
  //   visitorOverUnderOdds,
  //   HomeOverUnderOdds
  // );
  
  const sp = shoutoutPoints(sport);
  return vp + ep + ap + sp;
};

const accuracyPoints = (
  sport,
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints
) => {
  const p1s = picking1Score(
    sport,
    pickedScore,
    actualScore,
    pickedWinner,
    moneylineTotalPoints
  );
  if (sport == "baseball") {
    const p1s2p = picking1Score2Points(
      sport,
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints
    );
    const p2s2p = picking2Score2Points(
      sport,
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints
    );
    return p1s2p + p2s2p;
  } else if (sport != "baseball" || sport != "hockey") {
    const p1s3p = picking1Score3Points(
      sport,
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints
    );
    const p2s3p = picking2Score3Points(
      sport,
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints
    );
    const p1s7p = picking1Score7Points(
      sport,
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints
    );
    const p2s7p = picking2Score7Points(
      sport,
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints
    );
    return p1s3p + p2s3p + p1s7p + p2s7p;
  }
};

const endingsPoints = (sport) => {
  const pr = pickRegulation(sport);
  if (sport != "baseball") {
    const po = pickOvertime(sport);
  } else {
    const po = 0;
  }
  if (sport == "baseball") {
    const pi = pickExtraInnings(sport);
  } else {
    const pi = 0;
  }
  if (sport == "hockey") {
    const ps = pickShootout(sport);
  } else {
    const ps = 0;
  }
  return pr + po + pi + ps;
};

// const vegasOdds = (
//   sport,
//   moneyline,
//   visitorSpreadOdds,
//   homeSpreadOdds,
//   visitorOverUnderOdds,
//   HomeOverUnderOdds
// ) => {
//   const pf = pickingFavorite(sport, moneyline);
//   const pu = pickingUnderdog(sport);
//   const ps = pickingSpread(sport);
//   const po = pickingOver(sport);
//   return pf + pu + ps + po;
// };



const shutoutPoints = (sport) => {
  if (sport == "basketball") {
    const oneTS = oneTeamShutout(sport);
    if ((sport == "football", season == "reg")) {
      const twoTS = twoTeamShutout(sport);
    } else {
      const twoTS = 0;
    }
    return oneTS + twoTS;
  }
};
