exports.oneTeamShutout = (sport, v_score, h_score) => {
  // Award 10 points if one team scored 0
  if (v_score === 0 || h_score === 0) {
    return 10;
  }
};

exports.twoTeamShutout = (sport, v_score, h_score) => {
  // Award 30 points if both teams scored 0
  if (v_score === 0 && h_score === 0) {
    return 30;
  }
};
