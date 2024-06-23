exports.perfectScore = (
  v_score,
  h_score,
  predicted_v_score,
  predicted_h_score,
  v_ml_points,
  h_ml_points
) => {
  // Convert all inputs to numbers to ensure proper comparison and calculation
  v_score = Number(v_score);
  h_score = Number(h_score);
  predicted_v_score = Number(predicted_v_score);
  predicted_h_score = Number(predicted_h_score);
  v_ml_points = Number(v_ml_points);
  h_ml_points = Number(h_ml_points);

  let points = 0;
  if (v_score === predicted_v_score && h_score === predicted_h_score) {
    points = v_ml_points + h_ml_points;
  }
  return points;
};
