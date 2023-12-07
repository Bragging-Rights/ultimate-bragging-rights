exports.picking1Score = (sport) => {
  //if you pick 1 score correct and you pick the winner correct you get 50% of moneyline total points that we calculated for the winning team
  //if you pick 1 score correct and you do not  pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
};

exports.picking1Score2Points = (sport) => {
  //if you pick 1 score  within 2 points of the actual final score (+2,-2) and you pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
  //if you pick 1 score  within 2 points of the actual final score (+2,-2) and you do not  pick the winner correct you get 10% of moneyline total points that we calculated for the winning team
};
exports.picking2Score2Points = (sport) => {
  //if you pick 2 score  within 2 points of the actual final score (+2,-2) and you pick the winner correct you get 40% of moneyline total points that we calculated for the winning team
  //if you pick 2 score  within 2 points of the actual final score (+2,-2) and you do not  pick the winner correct you get 20% of moneyline total points that we calculated for the winning team
};

exports.picking1Score3Points = (sport) => {
  //if you pick 1 score  within 3 points of the actual final score (+3,-3) and you pick the winner correct you get 50% of moneyline total points that we calculated for the winning team
  //if you pick 1 score  within 3 points of the actual final score (+3,-3) and you do not  pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
};
exports.picking2Score3Points = (sport) => {
  //if you pick 2 score  within 3 points of the actual final score (+3,-3) and you pick the winner correct you get 70% of moneyline total points that we calculated for the winning team
  //if you pick 2 score  within 3 points of the actual final score (+3,-3) and you do not  pick the winner correct you get 40% of moneyline total points that we calculated for the winning team
};
exports.picking1Score7Points = (sport) => {
  //if you pick 1 score  within 7 points of the actual final score (+7,-7) and you pick the winner correct you get 25% of moneyline total points that we calculated for the winning team
  //if you pick 1 score  within 7 points of the actual final score (+7,-7) and you do not  pick the winner correct you get 10% of moneyline total points that we calculated for the winning team
};
exports.picking2Score7Points = (sport) => {
  //if you pick 2 score  within 7 points of the actual final score (+7,-7) and you pick the winner correct you get 40% of moneyline total points that we calculated for the winning team
  //if you pick 2 score  within 7 points of the actual final score (+7,-7) and you do not  pick the winner correct you get 20% of moneyline total points that we calculated for the winning team
};

exports.picking1Score = (
  sport,
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints
) => {
  let points = 0;
  if (pickedScore === actualScore) {
    points = pickedWinner
      ? moneylineTotalPoints * 0.5
      : moneylineTotalPoints * 0.25;
  }
  return points;
};

exports.picking1Score2Points = (
  sport,
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints
) => {
  //only for baseball
  let points = 0;
  if (Math.abs(pickedScore - actualScore) <= 2) {
    points = pickedWinner
      ? moneylineTotalPoints * 0.25
      : moneylineTotalPoints * 0.1;
  }
  return points;
};

exports.picking2Score2Points = (
  sport,
  pickedScores,
  actualScores,
  pickedWinner,
  moneylineTotalPoints
) => {
  //only for baseball
  let points = 0;
  let closeScores = pickedScores.filter(
    (score, index) => Math.abs(score - actualScores[index]) <= 2
  );
  if (closeScores.length === 2) {
    points = pickedWinner
      ? moneylineTotalPoints * 0.4
      : moneylineTotalPoints * 0.2;
  }
  return points;
};

exports.picking1Score3Points = (
  sport,
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints
) => {
  //only for football & basketball
  let points = 0;
  if (Math.abs(pickedScore - actualScore) <= 3) {
    points = pickedWinner
      ? moneylineTotalPoints * 0.5
      : moneylineTotalPoints * 0.25;
  }
  return points;
};

exports.picking2Score3Points = (
  sport,
  pickedScores,
  actualScores,
  pickedWinner,
  moneylineTotalPoints
) => {
  let points = 0;
  let closeScores = pickedScores.filter(
    (score, index) => Math.abs(score - actualScores[index]) <= 3
  );
  if (closeScores.length === 2) {
    points = pickedWinner
      ? moneylineTotalPoints * 0.7
      : moneylineTotalPoints * 0.4;
  }
  return points;
};

exports.picking1Score7Points = (
  sport,
  pickedScore,
  actualScore,
  pickedWinner,
  moneylineTotalPoints
) => {
  let points = 0;
  if (Math.abs(pickedScore - actualScore) <= 7) {
    points = pickedWinner
      ? moneylineTotalPoints * 0.25
      : moneylineTotalPoints * 0.1;
  }
  return points;
};

exports.picking2Score7Points = (
  sport,
  pickedScores,
  actualScores,
  pickedWinner,
  moneylineTotalPoints
) => {
  let points = 0;
  let closeScores = pickedScores.filter(
    (score, index) => Math.abs(score - actualScores[index]) <= 7
  );
  if (closeScores.length === 2) {
    points = pickedWinner
      ? moneylineTotalPoints * 0.4
      : moneylineTotalPoints * 0.2;
  }
  return points;
};
