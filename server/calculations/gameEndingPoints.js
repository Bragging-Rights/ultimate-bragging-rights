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
};

exports.pickExtraInnings = (sport) => {
  //1-if they pick ending correctly and they also pick winner correctly they 5 points and
  //if they pick number of exter innings correctly they get 1 (pointValue) point for each inning

  //2-if they pick ending correctly and they did not pick winner correctly they 2.5 points and
  //if they pick number of exter innings correctly they get 0.5 (pointValue) point for each inning

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
