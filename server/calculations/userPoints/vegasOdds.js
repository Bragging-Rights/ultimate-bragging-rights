//0 is fav
//1 for ud

// Adding console logs and error checks

// Ensure all inputs are converted to numbers
exports.pickingFavorite = (
  vml,
  hml,
  finalscorevisitor,
  finalscorehome,
  pick_visitor,
  pick_home
) => {
  // Convert all inputs to numbers and check for NaN
  vml = Number(vml);
  hml = Number(hml);
  finalscorevisitor = Number(finalscorevisitor);
  finalscorehome = Number(finalscorehome);
  pick_visitor = Number(pick_visitor);
  pick_home = Number(pick_home);

  // Error checking for NaN
  if (
    isNaN(vml) ||
    isNaN(hml) ||
    isNaN(finalscorevisitor) ||
    isNaN(finalscorehome) ||
    isNaN(pick_visitor) ||
    isNaN(pick_home)
  ) {
    console.error("One or more inputs are not a number.");
    return;
  }

  let v = 1,
    h = 1; // Initialize as underdogs
  if (vml < 0) v = 0; // Favorite
  if (hml < 0) h = 0; // Favorite
  let value;
  if (
    finalscorevisitor > finalscorehome &&
    v === 0 &&
    pick_visitor > pick_home
  ) {
    console.log("Visitor has a greater score");
    value = Math.abs(vml); // Award points
  } else if (finalscorevisitor < finalscorehome && h === 0) {
    console.log("Home has a greater score");
    value = Math.abs(hml); // Award points
  } else {
    console.log("No points awarded");
  }
  return value;
};

exports.pickingUnderdog = (
  vml,
  hml,
  finalscorevisitor,
  finalscorehome,
  pick_visitor,
  pick_home
) => {
  // Convert all inputs to numbers and check for NaN
  vml = Number(vml);
  hml = Number(hml);
  finalscorevisitor = Number(finalscorevisitor);
  finalscorehome = Number(finalscorehome);
  pick_visitor = Number(pick_visitor);
  pick_home = Number(pick_home);

  // Error checking for NaN
  if (
    isNaN(vml) ||
    isNaN(hml) ||
    isNaN(finalscorevisitor) ||
    isNaN(finalscorehome) ||
    isNaN(pick_visitor) ||
    isNaN(pick_home)
  ) {
    console.error("One or more inputs are not a number.");
    return;
  }

  let v = 0,
    h = 0; // Initialize as favorites
  let value;
  if (vml > 0) v = 1; // Underdog
  if (hml > 0) h = 1; // Underdog

  if (
    finalscorevisitor > finalscorehome &&
    v === 1 &&
    pick_visitor < pick_home
  ) {
    console.log("Visitor has a greater score");
    value = Math.abs(vml); // Award points
  } else if (finalscorevisitor < finalscorehome && h === 1) {
    console.log("Home has a greater score");
    value = Math.abs(hml); // Award points
  } else {
    console.log("No points awarded");
  }
  return value;
};

exports.pickingSpread = (
  vSpread,
  hSpread,
  finalscorevisitor,
  finalscorehome,
  pick_visitor,
  pick_home,
  vSpreadPoints,
  hSpreadPoints
) => {
  // Convert all inputs to numbers and check for NaN
  vSpread = Number(vSpread);
  hSpread = Number(hSpread);
  finalscorevisitor = Number(finalscorevisitor);
  finalscorehome = Number(finalscorehome);
  pick_visitor = Number(pick_visitor);
  pick_home = Number(pick_home);
  vSpreadPoints = Number(vSpreadPoints);
  hSpreadPoints = Number(hSpreadPoints);

  // Error checking for NaN
  if (
    isNaN(vSpread) ||
    isNaN(hSpread) ||
    isNaN(finalscorevisitor) ||
    isNaN(finalscorehome) ||
    isNaN(pick_visitor) ||
    isNaN(pick_home) ||
    isNaN(vSpreadPoints) ||
    isNaN(hSpreadPoints)
  ) {
    console.error("One or more inputs are not a number.");
    // console.log(
    //   vSpread,
    //   hSpread,
    //   finalscorevisitor,
    //   finalscorehome,
    //   pick_visitor,
    //   pick_home,
    //   vSpreadPoints,
    //   hSpreadPoints
    // );
    return;
  }

  let value;
  if (
    vSpread + finalscorevisitor > hSpread + finalscorehome &&
    vSpread + pick_visitor > hSpread + pick_home
  ) {
    // console.log("Visitor spread condition met");
    value = { vSpreadPoints: vSpreadPoints };
  } else {
    // console.log("Home spread condition met");
    value = { hSpreadPoints: hSpreadPoints };
  }
  return value;
};

exports.pickingOver = (
  finalscorevisitor,
  finalscorehome,
  vPredicted,
  hPredicted,
  v_ou,
  v_ou_points
) => {
  // Convert all inputs to numbers and check for NaN
  finalscorevisitor = Number(finalscorevisitor);
  finalscorehome = Number(finalscorehome);
  vPredicted = Number(vPredicted);
  hPredicted = Number(hPredicted);
  v_ou = Number(v_ou);
  v_ou_points = Number(v_ou_points);

  // Error checking for NaN
  if (
    isNaN(finalscorevisitor) ||
    isNaN(finalscorehome) ||
    isNaN(vPredicted) ||
    isNaN(hPredicted) ||
    isNaN(v_ou) ||
    isNaN(v_ou_points)
  ) {
    console.error("One or more inputs are not a number.");
    return;
  }

  let actual_ou_total = finalscorevisitor + finalscorehome;
  let predicted_ou_total = vPredicted + hPredicted;
  let value;
  if (actual_ou_total > v_ou && predicted_ou_total > v_ou) {
    // console.log("Over condition met");
    value = v_ou_points;
  } else {
    // console.log("Over condition not met");
  }
  return value;
};

exports.pickingUnder = (
  finalscorevisitor,
  finalscorehome,
  vPredicted,
  hPredicted,
  h_ou,
  h_ou_points
) => {
  // Convert all inputs to numbers and check for NaN
  finalscorevisitor = Number(finalscorevisitor);
  finalscorehome = Number(finalscorehome);
  vPredicted = Number(vPredicted);
  hPredicted = Number(hPredicted);
  h_ou = Number(h_ou);
  h_ou_points = Number(h_ou_points);

  // Error checking for NaN
  if (
    isNaN(finalscorevisitor) ||
    isNaN(finalscorehome) ||
    isNaN(vPredicted) ||
    isNaN(hPredicted) ||
    isNaN(h_ou) ||
    isNaN(h_ou_points)
  ) {
    console.error("One or more inputs are not a number.");
    return;
  }

  let actual_ou_total = finalscorevisitor + finalscorehome;
  let predicted_ou_total = vPredicted + hPredicted;
  let value;
  if (actual_ou_total < h_ou && predicted_ou_total < h_ou) {
    // console.log("Under condition met");
    value = h_ou_points;
  } else {
    // console.log("Under condition not met");
  }
  return value;
};
