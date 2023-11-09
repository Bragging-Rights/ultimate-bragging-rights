export const calculatePoints = (sport,moneyline,visitorSpreadOdds,homeSpreadOdds,visitorOverUnderOdds,HomeOverUnderOdds) => {
  // create skeleton for calculating points
  const vp = vegasOdds(sport ,moneyline,visitorSpreadOdds,homeSpreadOdds,visitorOverUnderOdds,HomeOverUnderOdds);
  const ep = endingsPoints(sport);
  const ap = accuracyPoints(sport);
  const sp = shoutoutPoints(sport);
  return vp + ep + ap + sp;
};

const vegasOdds = (sport,moneyline,visitorSpreadOdds,homeSpreadOdds,visitorOverUnderOdds,HomeOverUnderOdds) => {

  const pf = pickingFavorite(sport,moneyline);
  const pu = pickingUnderdog(sport);
  const ps = pickingSpread(sport);
  const po = pickingOver(sport);
  return pf + pu + ps + po;
};

const endingsPoints = (sport) => {
  const pr = pickingRegulation(sport);
  if (sport != "baseball") {
    const po = pickingOvertime(sport);
  } else {
    const po = 0;
  }
  if (sport == "baseball") {
    const pi = pickingInnings(sport);
  } else {
    const pi = 0;
  }
  if (sport == "hockey") {
    const ps = pickingShootout(sport);
  } else {
    const ps = 0;
  }
  return pr + po + pi + ps;
};

const accuracyPoints = (sport) => {
  const p1s = picking1Score(sport);
  if (sport == "baseball") {
    const p1s2p = picking1Score2Points(sport);
    const p2s2p = picking2Score2Points(sport);
    return  p1s2p + p2s2p;
  } else if(sport!="baseball"||sport!="hockey") {
    const p1s3p = picking1Score3Points(sport);
    const p2s3p = picking2Score3Points(sport);
    const p1s7p = picking1Score7Points(sport);
    const p2s7p = picking2Score7Points(sport);
    return p1s3p + p2s3p + p1s7p + p2s7p;
  }
};

const shoutoutPoints = (sport) => {
  const oneTS = oneTeamShutout(sport);
  if (sport == "football") {
    const twoTS = twoTeamShutout(sport);
  } else {
    const twoTS = 0;
  }
  return oneTS + twoTS;
};


const pickingFavorite=(sport,moneyline,)={  //determine who the favorite by looking at the money line/negative is fav
 //comparing final score fav to predicted fav
 // return result
const fml=v-ml;
const udml=h-ml;
const fav=null;


if(fml<0){
fav="fml";
}else if(udml<0){
  fav="udml";
}else if(fml<0 && udml<0){
  fav="both"
}
//convert moneyline into points
if(fml>0&& 0>fml<2){
const ponits =fml*2
}
if(fml>0&& fml>1.99){
  const ponits =fml*2
}


}

const pickingUnderdog=(sport,moneyline)={
  //determine whoe the underdog by looking at the money line/+ve is fav
  //comparing final score UD to predicted UD
  // return result

const fav=null
if()




}

const pickingSpread=()={
  //add whatever the spread is, 1.5(with one decimal) to team with +ve spreadodds 
}