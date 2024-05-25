exports.oneTeamShutout = (
  v_score,
  h_score,
  actualVisitorScore,
  actualHomeScore
) => {
  // Award 10 points if one team scored 0 and the user predicted it
  if (
    (v_score === 0 && actualVisitorScore === 0) ||
    (h_score === 0 && actualHomeScore === 0)
  ) {
    return 10;
  }
  return 0; // return 0 if no shutout was correctly predicted
};

exports.twoTeamShutout = (
  v_score,
  h_score,
  actualVisitorScore,
  actualHomeScore
) => {
  // Award 30 points if both teams scored 0 and the user predicted it
  if (
    v_score === 0 &&
    h_score === 0 &&
    actualVisitorScore === 0 &&
    actualHomeScore === 0
  ) {
    return 30;
  }
  return 0; // return 0 if no shutout was correctly predicted
};
