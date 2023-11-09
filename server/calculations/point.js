// v-ml,h-ml,v-sprd,h-sprd,v-ou-odds,h-ou-odds,

exports.moneyline = (v_ml, h_ml, v_sprd, h_sprd, v_ou, h_ou) => {
  let vml_point;
  //convert moneyline into points
  if (v_ml > 0) {
    vml_point = v_ml * 2;
  } else if (v_ml < 0 && v_ml > -1.99) {
    vml_point = v_ml;
  } else {
    vml_point = v_ml / 2;
  }

  let hml_point;

  if (h_ml > 0) {
    hml_point = h_ml * 2;
  } else if (h_ml < 0 && h_ml > -1.99) {
    hml_point = h_ml;
  } else {
    hml_point = h_ml / 2;
  }

  let vsprd_point;

  if (v_sprd > 0) {
    vsprd_point = v_sprd * 2;
  } else if (v_sprd < 0 && v_sprd > -1.99) {
    vsprd_point = v_sprd;
  } else {
    vsprd_point = v_sprd / 2;
  }

  let hsprd_point;

  if (h_sprd > 0) {
    hsprd_point = h_sprd * 2;
  } else if (h_sprd < 0 && h_sprd > -1.99) {
    hsprd_point = h_sprd;
  } else {
    hsprd_point = h_sprd / 2;
  }

  let vou_point;

  if (v_ou > 0) {
    vou_point = v_ou * 2;
  } else if (v_ou < 0 && v_ou > -1.99) {
    vou_point = v_ou;
  } else {
    vou_point = v_ou / 2;
  }

  let hou_point;

  if (h_ou > 0) {
    hou_point = h_ou * 2;
  } else if (h_ou < 0 && h_ou > -1.99) {
    hou_point = h_ou;
  } else {
    hou_point = h_ou / 2;
  }

  return {
    vml_point,
    hml_point,
    vsprd_point,
    hsprd_point,
    vou_point,
    hou_point,
  };
};

// export const HspreadOddPoints = (h_sprd_odds) => {
//   let HspreadOddPoints = 0;
//   if (h_sprd_odds > 0) {
//     //this is positive
//     if (0 < h_sprd_odds < 1.99) {
//       //if it is in the hundreds
//       HspreadOddPoints = h_sprd_odds * 2;
//     } else {
//       //if it is greater than hundreds
//       HspreadOddPoints = h_sprd_odds * 2;
//     }
//   } else if (h_sprd_odds < 0) {
//     //this is for negative
//     if (h_sprd_odds < 0 && h_sprd_odds > -1.99) {
//       //if it is in the hundreds
//       HspreadOddPoints = h_sprd_odds;
//     } else {
//       //if it is greater than hundreds
//       HspreadOddPoints = h_sprd_odds / 2;
//     }
//   }
//   return HspreadOddPoints;
// };

// export const VspreadOddsPoints = (v_sprd_odds) => {
//   let VspreadOddsPoints = 0;
//   if (v_sprd_odds > 0) {
//     //this is positive
//     if (0 < v_sprd_odds < 1.99) {
//       //if it is in the hundreds
//       VspreadOddsPoints = v_sprd_odds * 2;
//     } else {
//       //if it is greater than hundreds
//       VspreadOddsPoints = v_sprd_odds * 2;
//     }
//   } else if (v_sprd_odds < 0) {
//     //this is for negative
//     if (v_sprd_odds < 0 && v_sprd_odds > -1.99) {
//       //if it is in the hundreds
//       VspreadOddsPoints = v_sprd_odds;
//     } else {
//       //if it is greater than hundreds
//       VspreadOddsPoints = v_sprd_odds / 2;
//     }
//   }
//   VspreadOddsPoints;
// };

// export const ou_spreadPoints = (finalscorevisitor,finalscorehome,) => {
//   let totalfinalScore=finalscorevisitor+finalscorehome;
//  if(totalfinalScore> v_ou){
//   //award the points
//  }

// };

// export const compareSpread = (
//   finalPickHome,
//   finalPickVisitor,
//   finalScoreHome,
//   finalScoreVisitor
// ) => {
//   //add spread points to final pick

//   if (finalScoreHome > finalScoreVisitor) {
//     finalPickHome == finalScoreHome;
//   } else {
//     finalPickVisitor == finalScoreVisitor;
//   }
// };
