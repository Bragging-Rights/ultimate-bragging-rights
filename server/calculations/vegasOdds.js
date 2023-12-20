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