exports.pickRegulation = (sport, userpick, gameEnd, userWinner, gameWinner) => {
  if (userpick === gameEnd) {
    if (userWinner === gameWinner) {
      return 2; // Correct ending and winner
    } else {
      return 1; // Correct ending, incorrect winner
    }
  }
  return 0; // Incorrect ending
};

exports.pickOvertime = (sport, userpick, gameEnd, userWinner, gameWinner) => {
  if (userpick === gameEnd) {
    if (userWinner === gameWinner) {
      return 5; // Correct ending and winner
    } else {
      return 2.5; // Correct ending, incorrect winner
    }
  }
  return 0; // Incorrect ending
};

exports.pickExtraInnings = (
  sport,
  userpick,
  gameEnd,
  userWinner,
  gameWinner,
  userInnings,
  extraInnings
) => {
  let points = 0;
  if (userpick === gameEnd) {
    points += userWinner === gameWinner ? 5 : 2.5; // Add points for correct ending
    if (userInnings === extraInnings) {
      points += userInnings; // Add points for correct number of extra innings
    }
  }
  return points;
};

exports.pickShootout = (
  sport,
  userpick,
  gameEnd,
  userWinner,
  gameWinner,
  userInnings,
  extraInnings
) => {
  let points = 0;
  if (userpick === gameEnd) {
    points += userWinner === gameWinner ? 5 : 2.5; // Add points for correct ending
    if (userInnings === extraInnings) {
      points += userInnings * 0.2; // Add points for correct number of extra innings
    }
  }
  return points;
};

exports.inningsCalculator = (predictedNumOfInnings, pointValue) => {
  let point = pointValue;
  for (let i = 0; i < predictedNumOfInnings; i++) {
    if (predictedNumOfInnings == 1) {
      return point;
    }
    point = point + point;
  }
  return point;
};
