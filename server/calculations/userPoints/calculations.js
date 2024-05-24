// This file will contain the functions that will be used to calculate the points for the user based on the accuracy of their picks
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
//imports for the functions that we are going to use in the calculateResultPoints function

// Assuming that all the functions called in the code are defined somewhere else in your codebase and they return a number

exports.calculateResultPoints = (
  sport,
  moneyline,
  visitorSpreadOdds,
  homeSpreadOdds,
  visitorOverUnderOdds,
  HomeOverUnderOdds,
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints
) => {
  const ap = accuracyPoints(
    sport,
    pickedScore,
    actualScore,
    pickedWinner,
    moneylineTotalPoints
  );

  const ep = endingsPoints(sport);

  const ps = perfectScore(sport);
  const vp = vegasOdds(
    sport,
    moneyline,
    visitorSpreadOdds,
    homeSpreadOdds,
    visitorOverUnderOdds,
    HomeOverUnderOdds
  );

  const sp = shutoutPoints(sport);
  // return vp + ep + ap + sp + ps;
  return {
    vegasOdds: vp,
    endingsPoints: ep,
    accuracyPoints: ap,
    shutoutPoints: sp,
    perfectScore: ps,
  };
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
    return p1s + p1s2p + p2s2p;
  } else if (sport != "baseball" && sport != "hockey") {
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
    return p1s + p1s3p + p2s3p + p1s7p + p2s7p;
  } else {
    return p1s;
  }
};

const endingsPoints = (sport) => {
  const pr = pickRegulation(sport);
  const po = sport != "baseball" ? pickOvertime(sport) : 0;
  const pi = sport == "baseball" ? pickExtraInnings(sport) : 0;
  const ps = sport == "hockey" ? pickShootout(sport) : 0;
  return pr + po + pi + ps;
};

const vegasOdds = (
  sport,
  moneyline,
  visitorSpreadOdds,
  homeSpreadOdds,
  visitorOverUnderOdds,
  HomeOverUnderOdds
) => {
  const pf = pickingFavorite(sport, moneyline);
  const pu = pickingUnderdog(sport, moneyline);
  const ps = pickingSpread(sport, visitorSpreadOdds, homeSpreadOdds);
  const po = pickingOver(sport, visitorOverUnderOdds, HomeOverUnderOdds);
  return pf + pu + ps + po;
};

const shutoutPoints = (sport) => {
  if (sport == "basketball") {
    const oneTS = oneTeamShutout(sport);
    const twoTS = sport == "football" ? twoTeamShutout(sport) : 0;
    return oneTS + twoTS;
  }
  return 0;
};
