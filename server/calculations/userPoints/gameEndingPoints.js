exports.pickRegulation = (userpick, gameEnd, pickedScore, actualScore) => {
  // Convert scores to numbers
  pickedScore.pickVistor = Number(pickedScore.pickVistor);
  pickedScore.pickHome = Number(pickedScore.pickHome);
  actualScore.vScore = Number(actualScore.vScore);
  actualScore.hScore = Number(actualScore.hScore);

  const userWinner =
    pickedScore.pickVistor > pickedScore.pickHome ? "visitor" : "home";
  const gameWinner =
    actualScore.vScore > actualScore.hScore ? "visitor" : "home";

  if (userpick === gameEnd) {
    if (userWinner === gameWinner) {
      return 2; // Correct ending and winner
    } else {
      return 1; // Correct ending, incorrect winner
    }
  }
  return 0; // Incorrect ending
};

exports.pickOvertime = (userpick, gameEnd, pickedScore, actualScore) => {
  // Convert scores to numbers
  pickedScore.pickVistor = Number(pickedScore.pickVistor);
  pickedScore.pickHome = Number(pickedScore.pickHome);
  actualScore.vScore = Number(actualScore.vScore);
  actualScore.hScore = Number(actualScore.hScore);

  const userWinner =
    pickedScore.pickVistor > pickedScore.pickHome ? "visitor" : "home";
  const gameWinner =
    actualScore.vScore > actualScore.hScore ? "visitor" : "home";
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
  userpick,
  gameEnd,
  pickedScore,
  actualScore,
  userInnings,
  extraInnings
) => {
  // Convert scores and innings to numbers
  pickedScore.pickVistor = Number(pickedScore.pickVistor);
  pickedScore.pickHome = Number(pickedScore.pickHome);
  actualScore.vScore = Number(actualScore.vScore);
  actualScore.hScore = Number(actualScore.hScore);
  userInnings = Number(userInnings);
  extraInnings = Number(extraInnings);

  const userWinner =
    pickedScore.pickVistor > pickedScore.pickHome ? "visitor" : "home";
  const gameWinner =
    actualScore.vScore > actualScore.hScore ? "visitor" : "home";
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
  userpick,
  gameEnd,
  pickedScore,
  actualScore,
  userInnings,
  extraInnings
) => {
  // Convert scores and innings to numbers
  pickedScore.pickVistor = Number(pickedScore.pickVistor);
  pickedScore.pickHome = Number(pickedScore.pickHome);
  actualScore.vScore = Number(actualScore.vScore);
  actualScore.hScore = Number(actualScore.hScore);
  userInnings = Number(userInnings);
  extraInnings = Number(extraInnings);

  const userWinner =
    pickedScore.pickVistor > pickedScore.pickHome ? "visitor" : "home";
  const gameWinner =
    actualScore.vScore > actualScore.hScore ? "visitor" : "home";

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
  // Convert to numbers
  predictedNumOfInnings = Number(predictedNumOfInnings);
  pointValue = Number(pointValue);

  let point = pointValue;
  for (let i = 0; i < predictedNumOfInnings; i++) {
    if (predictedNumOfInnings == 1) {
      return point;
    }
    point = point + point;
  }
  return point;
};
