exports.pickRegulation = (sport) => {
  //1-if they pick ending correctly and they also pick winner correctly they 2 points
  //2-if they pick ending correctly and they dont pick winner correctly they 1 points
  //3-if they pick ending incorrectly they get 0 points
  userpick === gameEnd;
};

exports.pickOvertime = (sport) => {
  //1-if they pick ending correctly and they also pick winner correctly they 5 points
  //2-if they pick ending correctly and they dont pick winner correctly they 2.5 points
  //3-if they pick ending incorrectly they get 0 points
  userpick === gameEnd;

  // overtime rules
  //1-in reg and pre season = only 1 ot in hockey and football(no dropdowns)
  //2-in playoffs theres a dropdown to pick how many ot's in hockey and football
  //3-in reg season (hockey only) after ot, they have a shootout and the shootout is same as extra innings and the shootout
  //points are the same
  //4-in pre,reg and playoff basketball and baseball rules are always the same and there's always a dropdown to choose from

  //same as extra innings for picking overtime e.g 1ot, 2ot, 3ot
};

exports.pickExtraInnings = (sport) => {
  //1-if they pick ending correctly and they also pick winner correctly they 5 points and
  //if they pick number of exter innings correctly they get 1 (pointValue) point for each inning (points double for each inning)

  //2-if they pick ending correctly and they did not pick winner correctly they 2.5 points and
  //if they pick number of exter innings correctly they get 0.5 (pointValue) point for each inning (points double for each inning )

  userpick === gameEnd;
  userInnings === extraInnings; //assign all points
  userInnings >= extraInnings; //assign points for extraInnings
};

exports.pickShootout = (sport) => {
  //1-if they pick ending correctly and they also pick winner correctly they 5 points and
  //if they pick number of exter innings correctly they get .2 (pointValue) point for each inning

  //2-if they pick ending correctly and they did not pick winner correctly they 2.5 points and
  //if they pick number of exter innings correctly they get 0.1 (pointValue) point for each inning

  userpick === gameEnd;
  userInnings === extraInnings; //assign all points
  userInnings >= extraInnings; //assign points for extraInnings
};

exports.inningsCalculator = (predictedNumOfInnings, pointValue) => {
  let point = pointValue;
  for (let i = 0; i < predictedNumOfInnings; i++) {
    if (predictedNumOfInnings == 1) {
      return;
    }
    point = point + point;
  }
  return point;
};
/////////////new code//////////////////////

exports.pickRegulation = (userpick, gameEnd) => {
  if (userpick === gameEnd) {
    return userpick ? 2 : 1; // if user also picked the winner correctly, they get 2 points, otherwise 1 point
  } else {
    return 0; // if user picked the ending incorrectly, they get 0 points
  }
};

exports.pickOvertime = (userpick, gameEnd) => {
  if (userpick === gameEnd) {
    return userpick ? 5 : 2.5; // if user also picked the winner correctly, they get 5 points, otherwise 2.5 points
  } else {
    return 0; // if user picked the ending incorrectly, they get 0 points
  }
};

exports.pickExtraInnings = (userpick, gameEnd, userInnings, extraInnings) => {
  let points = 0;
  if (userpick === gameEnd) {
    points += userpick ? 5 : 2.5; // if user also picked the winner correctly, they get 5 points, otherwise 2.5 points
  }
  if (userInnings === extraInnings) {
    // points += userpick ? 1 : 0.5; // if user picked the number of extra innings correctly, they get additional points
    // this one need to be fixed
  }
  return points;
};

exports.pickShootout = (userpick, gameEnd, userInnings, extraInnings) => {
  let points = 0;
  if (userpick === gameEnd) {
    points += userpick ? 7 : 3.5; // if user also picked the winner correctly, they get 5 points, otherwise 2.5 points
  }
  // if (userInnings === extraInnings) {
  //   points += userpick ? 0.2 : 0.1; // if user picked the number of extra innings correctly, they get additional points
  // }
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
