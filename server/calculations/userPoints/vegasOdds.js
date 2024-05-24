//0 is fav
//1 for ud

exports.pickingFavorite = (
  sport,
  v_moneyline_odds,
  h_moneyline_odds,
  finalscorevisitor,
  finalscorehome
) => {
  let v = 1,
    h = 1; // Initialize as underdogs

  if (v_moneyline_odds < 0) v = 0; // Favorite
  if (h_moneyline_odds < 0) h = 0; // Favorite

  if (finalscorevisitor > finalscorehome && v === 0) {
    console.log("Visitor has a greater score");
    return Math.abs(v_moneyline_odds); // Award points
  } else if (finalscorevisitor < finalscorehome && h === 0) {
    console.log("Home has a greater score");
    return Math.abs(h_moneyline_odds); // Award points
  }
};
exports.pickingUnderdog = (
  sport,
  v_moneyline_odds,
  h_moneyline_odds,
  finalscorevisitor,
  finalscorehome
) => {
  let v = 0,
    h = 0; // Initialize as favorites

  if (v_moneyline_odds > 0) v = 1; // Underdog
  if (h_moneyline_odds > 0) h = 1; // Underdog

  if (finalscorevisitor > finalscorehome && v === 1) {
    console.log("Visitor has a greater score");
    return Math.abs(v_moneyline_odds); // Award points
  } else if (finalscorevisitor < finalscorehome && h === 1) {
    console.log("Home has a greater score");
    return Math.abs(h_moneyline_odds); // Award points
  }
};
exports.pickingSpread = (
  sport,
  vml_point,
  hml_point,
  vagainstspreadpoints,
  hagainstspreadpoints
) => {
  let value;
  if (vml_point > hml_point) {
    //visitor would be the underdog
    //add the abs value of spread to the underdog
    value = vml_point + Math.abs(vagainstspreadpoints);
  } else {
    //home would be the underdog
    //add the abs value of spread to the underdog
    value = hml_point + Math.abs(hagainstspreadpoints);
  }
  return value;
};

exports.pickingOver = (
  sport,
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
  sport,
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
