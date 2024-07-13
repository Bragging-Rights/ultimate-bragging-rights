// exports.picking1Score = (sport) => {
//   //if you pick 1 score correct and you pick the winner correct you get 50% of moneyline total points that we calculated for the winning team
//   //if you pick 1 score correct and you do not  pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
// };

// exports.picking1Score2Points = (sport) => {
//   //if you pick 1 score  within 2 points of the actual final score (+2,-2) and you pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
//   //if you pick 1 score  within 2 points of the actual final score (+2,-2) and you do not  pick the winner correct you get 10% of moneyline total points that we calculated for the winning team
// };
// exports.picking2Score2Points = (sport) => {
//   //if you pick 2 score  within 2 points of the actual final score (+2,-2) and you pick the winner correct you get 40% of moneyline total points that we calculated for the winning team
//   //if you pick 2 score  within 2 points of the actual final score (+2,-2) and you do not  pick the winner correct you get 20% of moneyline total points that we calculated for the winning team
// };

// exports.picking1Score3Points = (sport) => {
//   //if you pick 1 score  within 3 points of the actual final score (+3,-3) and you pick the winner correct you get 50% of moneyline total points that we calculated for the winning team
//   //if you pick 1 score  within 3 points of the actual final score (+3,-3) and you do not  pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
// };
// exports.picking2Score3Points = (sport) => {
//   //if you pick 2 score  within 3 points of the actual final score (+3,-3) and you pick the winner correct you get 70% of moneyline total points that we calculated for the winning team
//   //if you pick 2 score  within 3 points of the actual final score (+3,-3) and you do not  pick the winner correct you get 40% of moneyline total points that we calculated for the winning team
// };
// exports.picking1Score7Points = (sport) => {
//   //if you pick 1 score  within 7 points of the actual final score (+7,-7) and you pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
//   //if you pick 1 score  within 7 points of the actual final score (+7,-7) and you do not  pick the winner correct you get 10% of moneyline total points that we calculated for the winning team
// };
// exports.picking2Score7Points = (sport) => {
//   //if you pick 2 score  within 7 points of the actual final score (+7,-7) and you pick the winner correct you get 40% of moneyline total points that we calculated for the winning team
//   //if you pick 2 score  within 7 points of the actual final score (+7,-7) and you do not  pick the winner correct you get 20% of moneyline total points that we calculated for the winning team
// };

exports.picking1Score = (
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  console.log("Function picking1Score called with inputs:", {
    pickedScore,
    actualScore,
    pickedWinner,
    moneylineTotalPoints,
    actualWinner,
  });
  let points = 0;

  // Convert inputs to numbers
  pickedScore = Number(pickedScore);
  console.log("Converted pickedScore to number:", pickedScore);

  actualScore = Number(actualScore);
  console.log("Converted actualScore to number:", actualScore);

  // Note: pickedWinner conversion to Number is commented out as it might be a string ("visitor" or "home")
  // pickedWinner = Number(pickedWinner);

  moneylineTotalPoints = Number(moneylineTotalPoints);
  console.log(
    "Converted moneylineTotalPoints to number:",
    moneylineTotalPoints
  );

  // Check if any of the inputs is NaN
  if (
    isNaN(pickedScore) ||
    isNaN(actualScore) ||
    // isNaN(pickedWinner) || // Commented out as pickedWinner conversion to Number is commented out
    isNaN(moneylineTotalPoints)
  ) {
    console.error("One or more inputs are not a number:", {
      pickedScore,
      actualScore,
      pickedWinner,
      moneylineTotalPoints,
    });
    return points;
  }

  if (pickedScore === actualScore) {
    points =
      actualWinner == pickedWinner
        ? moneylineTotalPoints * 0.5
        : moneylineTotalPoints * 0.25;
    console.log("Score matched. Points calculated:", points);
  } else {
    console.log("Score did not match. No points awarded.");
  }
  console.log("picking1Score points:", points);
  return points;
};

exports.picking1Score2Points = (
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  // Convert values to numbers
  pickedScore = Number(pickedScore);
  actualScore = Number(actualScore);
  // pickedWinner = Number(pickedWinner);
  moneylineTotalPoints = Number(moneylineTotalPoints);

  //only for baseball
  let points = 0;
  if (Math.abs(pickedScore - actualScore) <= 2) {
    points =
      actualWinner == pickedWinner
        ? moneylineTotalPoints * 0.25
        : moneylineTotalPoints * 0.1;
  }
  return points;
};

exports.picking2Score2Points = (
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  // Convert values to numbers
  pickedScore = Number(pickedScore);
  actualScore = Number(actualScore);
  // pickedWinner = Number(pickedWinner);
  moneylineTotalPoints = Number(moneylineTotalPoints);

  //only for baseball
  let points = 0;
  let closeScore = Math.abs(pickedScore - actualScore) <= 2;
  if (closeScore) {
    points =
      actualWinner == pickedWinner
        ? moneylineTotalPoints * 0.4
        : moneylineTotalPoints * 0.2;
  }
  return points;
};

exports.picking1Score3Points = (
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  // Convert values to numbers
  pickedScore = Number(pickedScore);
  actualScore = Number(actualScore);
  // pickedWinner = Number(pickedWinner);
  moneylineTotalPoints = Number(moneylineTotalPoints);

  //only for football & basketball
  let points = 0;
  if (Math.abs(pickedScore - actualScore) <= 3) {
    points =
      actualWinner == pickedWinner
        ? moneylineTotalPoints * 0.5
        : moneylineTotalPoints * 0.25;
  }
  return points;
};

exports.picking2Score3Points = (
  pickedScore1,
  actualScore1,
  pickedScore2,
  actualScore2,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  // Convert values to numbers
  pickedScore1 = Number(pickedScore1);
  actualScore1 = Number(actualScore1);
  pickedScore2 = Number(pickedScore2);
  actualScore2 = Number(actualScore2);
  // pickedWinner = Number(pickedWinner);
  moneylineTotalPoints = Number(moneylineTotalPoints);

  //only for football & basketball
  let points = 0;
  let closeScore1 = Math.abs(pickedScore1 - actualScore1) <= 3;
  let closeScore2 = Math.abs(pickedScore2 - actualScore2) <= 3;
  if (closeScore1 && closeScore2) {
    points =
      actualWinner == pickedWinner
        ? moneylineTotalPoints * 0.7
        : moneylineTotalPoints * 0.4;
  }
  return points;
};

exports.picking1Score7Points = (
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  // Convert values to numbers
  pickedScore = Number(pickedScore);
  actualScore = Number(actualScore);
  // pickedWinner = Number(pickedWinner);
  moneylineTotalPoints = Number(moneylineTotalPoints);

  //only for football & basketball
  let points = 0;
  if (Math.abs(pickedScore - actualScore) <= 7) {
    points =
      actualWinner == pickedWinner
        ? moneylineTotalPoints * 0.25
        : moneylineTotalPoints * 0.1;
  }
  return points;
};

exports.picking2Score7Points = (
  pickedScore1,
  actualScore1,
  pickedScore2,
  actualScore2,
  pickedWinner,
  moneylineTotalPoints,
  actualWinner
) => {
  // Convert values to numbers
  pickedScore1 = Number(pickedScore1);
  actualScore1 = Number(actualScore1);
  pickedScore2 = Number(pickedScore2);
  actualScore2 = Number(actualScore2);
  // pickedWinner = Number(pickedWinner);
  moneylineTotalPoints = Number(moneylineTotalPoints);

  //only for football & basketball
  let points = 0;
  let closeScore1 = Math.abs(pickedScore1 - actualScore1) <= 7;
  let closeScore2 = Math.abs(pickedScore2 - actualScore2) <= 7;
  if (closeScore1 && closeScore2) {
    points =
      actualWinner == pickedWinner
        ? moneylineTotalPoints * 0.4
        : moneylineTotalPoints * 0.2;
  }
  return points;
};

exports.picking1Score0Points = (pickedScore, actualScore, pickedWinner) => {
  // Convert values to numbers
  pickedScore = Number(pickedScore);
  actualScore = Number(actualScore);
  // pickedWinner = Number(pickedWinner);

  let points = 0;
  if (
    (pickedScore.pickVistor === 0 && actualScore.vScore === 0) ||
    (pickedScore.pickHome === 0 && actualScore.hScore === 0)
  ) {
    points = 10;
  }
  return points;
};

exports.picking2Score0Points = (pickedScore, actualScore, pickedWinner) => {
  // Convert values to numbers
  pickedScore = Number(pickedScore);
  actualScore = Number(actualScore);
  // pickedWinner = Number(pickedWinner);

  let points = 0;
  if (
    pickedScore.pickVistor === 0 &&
    actualScore.vScore === 0 &&
    pickedScore.pickHome === 0 &&
    actualScore.hScore === 0
  ) {
    points = 50;
  }
  return points;
};
