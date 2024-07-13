exports.perfectScore = (
  v_score,
  h_score,
  predicted_v_score,
  predicted_h_score,
  moneylineTotalPoints
) => {
  // Convert all inputs to numbers and ensure they are positive
  v_score = Math.abs(Number(v_score));
  h_score = Math.abs(Number(h_score));
  predicted_v_score = Math.abs(Number(predicted_v_score));
  predicted_h_score = Math.abs(Number(predicted_h_score));

  let points = 0;
  if (v_score === predicted_v_score && h_score === predicted_h_score) {
    points = moneylineTotalPoints;
  }
  return points;
};
