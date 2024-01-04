// v-ml,h-ml,v-sprd,h-sprd,v-ou-odds,h-ou-odds,

exports.points = (v_ml, h_ml, v_sprd, h_sprd, v_ou, h_ou) => {
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

