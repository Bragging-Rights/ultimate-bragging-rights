const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gamedate: String,
  time: String,
  visitor: String,
  home: String,
  seasonflag: String,
  league: String,
  /////////////////
  "v-ml": Number,
  "h-ml": Number,
  "v-sprd": Number,
  "h-sprd": Number,
  "v-sprd-odds": Number,
  "h-sprd-odds": Number,
  "v-ou": Number,
  "h-ou": Number,
  "v-ou-odds": Number,
  "h-ou-odds": Number,
  /////////////////////points below
  "v-ml-points": Number,
  "h-ml-points": Number,
  "v-sprd-points": Number,
  "h-sprd-points": Number,
  "v-ou-points": Number,
  "h-ou-points": Number,
  ///////////////////// needs to be done
  sports: String, //we will use this to determine which sport it is for calculations//create
  vFinalScore: String, //update
  hFinalScore: String, //update
  vPediction: String,
  hPediction: String,
  id: String, //create
  gameEnd: {
    //update
    type: String,
    enum: ["reg", "ot", "ei", "so"], //reg=regular,ot=overtime,ei=extra innings,so=shootout
  },
  extraInnings: {
    //update
    type: Number,
    default: 0,
  },
  overTime: {
    //update
    type: Number,
    default: 0,
  },
  winnerML: String, //calculated through points
  winnerSprd: String, //calculated through points
  winnerOU: String, //calculated through points
  suspended: Boolean, //update
  suspendedReason: String, //update
  //conference: String, //not using as of this time
  //devision: String, //not using as of this time
  week: Number, //create
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
