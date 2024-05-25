//0 is fav
//1 for ud

exports.pickingFavorite = (
  vml,
  hml,
  finalscorevisitor,
  finalscorehome,
  pick_visitor,
  pick_home
) => {
  let v = 1,
    h = 1; // Initialize as underdogs

  if (vml < 0) v = 0; // Favorite
  if (hml < 0) h = 0; // Favorite

  if (
    finalscorevisitor > finalscorehome &&
    v === 0 &&
    pick_visitor > pick_home
  ) {
    console.log("Visitor has a greater score");
    return Math.abs(vml); // Award points
  } else if (finalscorevisitor < finalscorehome && h === 0) {
    console.log("Home has a greater score");
    return Math.abs(hml); // Award points
  }
};
exports.pickingUnderdog = (
  vml,
  hml,
  finalscorevisitor,
  finalscorehome,
  pick_visitor,
  pick_home
) => {
  let v = 0,
    h = 0; // Initialize as favorites

  if (vml > 0) v = 1; // Underdog
  if (hml > 0) h = 1; // Underdog

  if (
    finalscorevisitor > finalscorehome &&
    v === 1 &&
    pick_visitor < pick_home
  ) {
    console.log("Visitor has a greater score");
    return Math.abs(vml); // Award points
  } else if (finalscorevisitor < finalscorehome && h === 1) {
    console.log("Home has a greater score");
    return Math.abs(hml); // Award points
  }
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
  let value;
  if (
    vSpread + finalscorevisitor > hSpread + finalscorehome &&
    vSpread + pick_visitor > hSpread + pick_home
  ) {
    //visitor would be the underdog
    //add the abs value of spread to the underdog
    value = { vSpreadPoints: vSpreadPoints };
  } else {
    //home would be the underdog
    //add the abs value of spread to the underdog
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
  let actual_ou_total = finalscorevisitor + finalscorehome;
  let predicted_ou_total = vPredicted + hPredicted;

  if (actual_ou_total > v_ou) {
    if (predicted_ou_total > v_ou) {
      return v_ou_points;
    }
  }
};

exports.pickingUnder = (
  finalscorevisitor,
  finalscorehome,
  vPredicted,
  hPredicted,
  h_ou,
  h_ou_points
) => {
  let actual_ou_total = finalscorevisitor + finalscorehome;
  let predicted_ou_total = vPredicted + hPredicted;

  if (actual_ou_total < h_ou) {
    if (predicted_ou_total < h_ou) {
      return h_ou_points;
    }
  }
};
