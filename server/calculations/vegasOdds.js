//0 is fav
//1 for ud


exports.pickingFavorite=(sport,moneyline)=>{
    //picking favourite 
    if(v_moneyline_odds<0){
        v =0;
    }
    if(h_moneyline_odds<0){
        h=0
    }
    //determin if the favourite actually won by looking at score
    if (finalscorevisitor > finalscorehome) {
        console.log("Visitor has a greater score");
        if(v==0){//award points
//we need to do the absolute value of the moneyline
        }
      } else if (finalscorevisitor < finalscorehome) {
        console.log("Home has a greater score");
        if(h==0){//award points
//we need to do the absolute value of the moneyline
        }
      } 

   
}
exports.pickingUnderdog(sport){

    if(v_moneyline_odds>0){
        v =1;
    }
    if(h_moneyline_odds>0){
        h=1;    }

        //determin if the favourite actually won by looking at score
    if (finalscorevisitor > finalscorehome) {
        console.log("Visitor has a greater score");
        if(v==1){//award points
//we need to do the absolute value of the moneyline
        }
      } else if (finalscorevisitor < finalscorehome) {
        console.log("Home has a greater score");
        if(h==1){//award points
//we need to do the absolute value of the moneyline
        }
      } 

}
exports.pickingSpread=(sport)=>{
  //which moneyline team got more points
if(vml_point>hml_point)
{ //visitor would be the underdog
//add the abs value of spred to the underdog
value = vml_point + abs(vagainstspreadpoints);

}else{ //home would be the underdog
    //add the abs value of spred to the underdog
value=hml_point+ abs(hagagnstspreadpoints);
}

    return 
}


exports.pickingOver=(sport)=>{
let actual_ou_total =finalscorevisitor+finalscorehome;
//v-ou and h-ou  are both +ve
let predicted_ou_total = vPredicted+ hPredicted;

if(actual_ou_total>v-ou){
//award the points that we calulated for the visitor overunder
if(predicted_ou_total>v-ou){
return v-ou_points;
}
}
}

exports.pickingUnder=(sport)=>{
    let actual_ou_total =finalscorevisitor+finalscorehome;
    //v-ou and h-ou  are both +ve
    let predicted_ou_total = vPredicted+ hPredicted;
    
    if(actual_ou_total<h-ou){
    //award the points that we calulated for the visitor overunder
    if(predicted_ou_total<h-ou){
    return h-ou_points;
    }
    }
    }


    //////////////////////new code//////////////////////

    exports.pickingFavorite = (sport, v_moneyline_odds, h_moneyline_odds, finalscorevisitor, finalscorehome) => {
        let v = v_moneyline_odds < 0 ? 0 : 1;
        let h = h_moneyline_odds < 0 ? 0 : 1;

        if (finalscorevisitor > finalscorehome && v === 0) {
            return Math.abs(v_moneyline_odds);
        } else if (finalscorevisitor < finalscorehome && h === 0) {
            return Math.abs(h_moneyline_odds);
        } else {
            return 0;
        }
    };

    exports.pickingUnderdog = (sport, v_moneyline_odds, h_moneyline_odds, finalscorevisitor, finalscorehome) => {
        let v = v_moneyline_odds > 0 ? 1 : 0;
        let h = h_moneyline_odds > 0 ? 1 : 0;

        if (finalscorevisitor > finalscorehome && v === 1) {
            return Math.abs(v_moneyline_odds);
        } else if (finalscorevisitor < finalscorehome && h === 1) {
            return Math.abs(h_moneyline_odds);
        } else {
            return 0;
        }
    };

    exports.pickingSpread = (sport, vml_point, hml_point, vagainstspreadpoints, hagagnstspreadpoints) => {
        let value;
        if (vml_point > hml_point) {
            value = vml_point + Math.abs(vagainstspreadpoints);
        } else {
            value = hml_point + Math.abs(hagagnstspreadpoints);
        }
        return value;
    };

    exports.pickingOver = (sport, finalscorevisitor, finalscorehome, vPredicted, hPredicted, v_ou, v_ou_points) => {
        let actual_ou_total = finalscorevisitor + finalscorehome;
        let predicted_ou_total = vPredicted + hPredicted;

        if (actual_ou_total > v_ou && predicted_ou_total > v_ou) {
            return v_ou_points;
        } else {
            return 0;
        }
    };

    exports.pickingUnder = (sport, finalscorevisitor, finalscorehome, vPredicted, hPredicted, h_ou, h_ou_points) => {
        let actual_ou_total = finalscorevisitor + finalscorehome;
        let predicted_ou_total = vPredicted + hPredicted;

        if (actual_ou_total < h_ou && predicted_ou_total < h_ou) {
            return h_ou_points;
        } else {
            return 0;
        }
    };