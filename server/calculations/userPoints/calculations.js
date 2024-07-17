// This file will contain the functions that will be used to calculate the points for the user based on the accuracy of their picks
const {
  picking1Score,
  picking1Score2Points,
  picking2Score2Points,
  picking1Score3Points,
  picking2Score3Points,
  picking1Score7Points,
  picking2Score7Points,
  picking2Score0Points,
  picking1Score0Points,
} = require("./accuracyPoints");
const {
  pickRegulation,
  pickOvertime,
  pickExtraInnings,
  pickShootout,
} = require("./gameEndingPoints");
const { perfectScore } = require("./perfectScore");
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
  moneylineTotalPoints,
  userpick, //the type of ending user picked
  gameEnd, //actual game ending
  userInnings,
  extraInnings,
  spread,
  spreadPoints,
  vOU,
  vOUpoints,
  hOU,
  hOUpoints,
  moneylinePoints,
  actualWinner
) => {
  console.log(
    "******************************Accuracy Points******************************"
  );
  const vistor_ap = accuracyPoints(
    sport,
    pickedScore.pickVistor,
    actualScore.vScore,
    pickedWinner,
    moneylineTotalPoints,
    actualWinner
  );

  const home_ap = accuracyPoints(
    sport,
    pickedScore.pickHome,
    actualScore.hScore,
    pickedWinner,
    moneylineTotalPoints,
    actualWinner
  );
  console.log(
    "******************************Ending Points******************************"
  );

  const ep = endingsPoints(sport, userpick, gameEnd, pickedScore, actualScore);
  console.log(
    "******************************Perfect Score******************************"
  );

  // console.log(pickedScore, actualScore, pickedWinner, moneyline);
  const ps = perfectScore(
    actualScore.vScore,
    actualScore.hScore,
    pickedScore.pickVistor,
    pickedScore.pickHome,
    moneylineTotalPoints
  );

  console.log(
    "******************************Vegas Points******************************"
  );

  const vp = vegasOdds(
    // sport,
    moneyline,
    actualScore,
    pickedScore,
    spread,
    spreadPoints,
    vOU,
    vOUpoints,
    hOU,
    hOUpoints,
    moneylinePoints
    // visitorSpreadOdds,
    // homeSpreadOdds,
    // visitorOverUnderOdds,
    // HomeOverUnderOdds
  );
  console.log(
    "******************************Shutout Points******************************"
  );

  const sp = shutoutPoints(sport, pickedScore, actualScore);
  // console.log("result points", vp, ep, vistor_ap, home_ap, sp, ps);
  // console.log("perfect scores", ps);
  // return vp + ep + ap + sp + ps;
  return {
    vegasOdds: vp,
    endingsPoints: ep,
    accuracyPoints: { vistor: vistor_ap, home: home_ap },
    shutoutPoints: sp,
    perfectScore: ps,
  };
};

const accuracyPoints = (
  sport,
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  const p1s = picking1Score(
    pickedScore,
    actualScore,
    pickedWinner,
    moneylineTotalPoints,
    actualWinner
  );
  let p1s0, p2s0;
  if (sport != "basketball") {
    p1s0 = picking1Score0Points(pickedScore, actualScore);
  }
  if (sport == "football") {
    p2s0 = picking2Score0Points(pickedScore, actualScore);
  }
  if (sport == "baseball") {
    const p1s2p = picking1Score2Points(
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints,
      actualWinner
    );
    const p2s2p = picking2Score2Points(
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints,
      actualWinner
    );
    console.log("picking score", p1s, p1s0, p2s0, p1s2p, p2s2p);
    return { p1s, p1s0, p2s0, p1s2p, p2s2p };
  } else if (sport != "baseball" && sport != "hockey") {
    const p1s3p = picking1Score3Points(
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints,
      actualWinner
    );
    const p2s3p = picking2Score3Points(
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints,
      actualWinner
    );
    const p1s7p = picking1Score7Points(
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints,
      actualWinner
    );
    const p2s7p = picking2Score7Points(
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints,
      actualWinner
    );

    console.log("picking score", p1s, p1s0, p2s0, p1s3p, p2s3p, p1s7p, p2s7p);
    return { p1s, p1s0, p2s0, p1s3p, p2s3p, p1s7p, p2s7p };
  } else {
    console.log("picking score", p1s, p1s0, p2s0);
    return { p1s, p1s0, p2s0 };
  }
};

const endingsPoints = (
  sport,
  userpick,
  gameEnd,
  pickedScore,
  actualScore,
  userInnings,
  extraInnings
) => {
  let pr, po, pi, ps;
  if (userpick.toLowerCase() === "reg") {
    pr = pickRegulation(userpick, gameEnd, pickedScore, actualScore);
  }
  if (userpick.toLowerCase() === "ot") {
    po =
      sport != "baseball"
        ? pickOvertime(userpick, gameEnd, pickedScore, actualScore)
        : 0;
  }
  if (userpick.toLowerCase() === "ei") {
    pi =
      sport == "baseball"
        ? pickExtraInnings(
            userpick,
            gameEnd,
            pickedScore,
            actualScore,
            userInnings,
            extraInnings
          )
        : 0;
  }
  if (userpick.toLowerCase() === "so") {
    ps =
      sport == "hockey"
        ? pickShootout(
            userpick,
            gameEnd,
            pickedScore,
            actualScore,
            userInnings,
            extraInnings
          )
        : 0;
  }
  console.log("endings points", pr, po, pi, ps);
  return {
    pickRegulation: pr,
    pickOverTime: po,
    pickExtraInnings: pi,
    pickShootout: ps,
  };
};

const vegasOdds = (
  moneyline,
  actualScore,
  pickedScore,
  spread,
  spreadPoints,
  vOU,
  vOUpoints,
  hOU,
  hOUpoints,
  moneylinePoints
) => {
  const pf = pickingFavorite(
    moneyline.vml,
    moneyline.hml,
    actualScore.vScore,
    actualScore.hScore,
    pickedScore.pickVistor,
    pickedScore.pickHome,
    moneylinePoints
  );
  const pu = pickingUnderdog(
    moneyline.vml,
    moneyline.hml,
    actualScore.vScore,
    actualScore.hScore,
    pickedScore.pickVistor,
    pickedScore.pickHome,
    moneylinePoints
  );
  const ps = pickingSpread(
    spread.vSpread,
    spread.hSpread,
    actualScore.vScore,
    actualScore.hScore,
    pickedScore.pickVistor,
    pickedScore.pickHome,
    spreadPoints.vSpreadPoints,
    spreadPoints.hSpreadPoints
  );
  const po = pickingOver(
    actualScore.vScore,
    actualScore.hScore,
    pickedScore.pickVistor,
    pickedScore.pickHome,
    vOU,
    vOUpoints
  );

  const pUnder = pickingUnder(
    actualScore.vScore,
    actualScore.hScore,
    pickedScore.pickVistor,
    pickedScore.pickHome,
    hOU,
    hOUpoints
  );

  // console.log("vegas odds", pf, pu, ps, po, pUnder);
  return {
    pickingFavorite: pf,
    pickingUnderdog: pu,
    pickingSpread: ps,
    pickingOver: po,
    pickingUnder: pUnder,
  };
};

const shutoutPoints = (sport, pickedScore, actualScore) => {
  if (sport == "basketball") {
    const oneTS = oneTeamShutout(
      pickedScore.pickVistor,
      pickedScore.pickHome,
      actualScore.vScore,
      actualScore.hScore
    );
    const twoTS =
      sport == "football"
        ? twoTeamShutout(
            pickedScore.pickVistor,
            pickedScore.pickHome,
            actualScore.vScore,
            actualScore.hScore
          )
        : 0;

    console.log("shutout points", oneTS, twoTS);
    return { oneTeamShutout: oneTS, twoTeamShutout: twoTS };
  }
  return 0;
};
