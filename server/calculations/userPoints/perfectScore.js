exports.perfectScore = (
  v_score,
  h_score,
  predicted_v_score,
  predicted_h_score,
  moneylineTotalPoints
) => {
  console.log("Received inputs:", {
    v_score,
    h_score,
    predicted_v_score,
    predicted_h_score,
    moneylineTotalPoints,
  });

  // Convert all inputs to numbers and ensure they are positive
  v_score = Math.abs(Number(v_score));
  console.log("Converted and abs v_score:", v_score);

  h_score = Math.abs(Number(h_score));
  console.log("Converted and abs h_score:", h_score);

  predicted_v_score = Math.abs(Number(predicted_v_score));
  console.log("Converted and abs predicted_v_score:", predicted_v_score);

  predicted_h_score = Math.abs(Number(predicted_h_score));
  console.log("Converted and abs predicted_h_score:", predicted_h_score);

  moneylineTotalPoints = Math.abs(Number(moneylineTotalPoints));
  console.log("Converted and abs moneylineTotalPoints:", moneylineTotalPoints);

  let points = 0;
  if (v_score === predicted_v_score && h_score === predicted_h_score) {
    points = moneylineTotalPoints;
    console.log("Scores match, calculated points:", points);
  } else {
    console.log("Scores do not match, points remain:", points);
  }

  console.log("Final points returned:", points);
  return points;
};
