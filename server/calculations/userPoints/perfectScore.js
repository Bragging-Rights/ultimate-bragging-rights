exports.perfectScore = (
  v_score,
  h_score,
  predicted_v_score,
  predicted_h_score,
  v_ml_points,
  h_ml_points
) => {
  // Convert all inputs to numbers and ensure they are positive
  v_score = Math.abs(Number(v_score));
  h_score = Math.abs(Number(h_score));
  predicted_v_score = Math.abs(Number(predicted_v_score));
  predicted_h_score = Math.abs(Number(predicted_h_score));
  v_ml_points = Math.abs(Number(v_ml_points));
  h_ml_points = Math.abs(Number(h_ml_points));

  let points = 0;
  if (v_score === predicted_v_score && h_score === predicted_h_score) {
    points = v_ml_points + h_ml_points;
  }
  return points;
};
