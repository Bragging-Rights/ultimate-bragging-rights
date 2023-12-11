exports.perfectScore = () => {
  //if both scores are correctly then return
  //v_ml_points+h_ml_points
};

//////////////////////new code//////////////////////
exports.perfectScore = (
  v_ml_points,
  h_ml_points,
  v_score_correct,
  h_score_correct
) => {
  // if both scores are correct then return v_ml_points + h_ml_points
  if (v_score_correct && h_score_correct) {
    return v_ml_points + h_ml_points;
  }
  // if scores are not correct, return some default value or handle accordingly
  // return 0; // for example
};
