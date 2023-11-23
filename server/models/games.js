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
  "v-ml-points": String,
  "h-ml-points": String,
  "v-sprd-points": String,
  "h-sprd-points": String,
  "v-ou-points": String,
  "h-ou-points": String,
  ///////////////////// needs to be done
  sports: String, //we will use this to determine which sport it is for calculations//create
  vFinalScore: String, //update
  hFinalScore: String, //update

  vPediction: String,
  hPediction: String,
  id: String,
  gameEnd: {
    type: String,
    enum: ["reg", "ot", "ei", "so"], //reg=regular,ot=overtime,ei=extra innings,so=shootout
  },
  extraInnings: {
    type: Number,
    default: 0,
  },
  overTime: {
    type: Number,
    default: 0,
  },
  winnerML: String, //calculated through points
  winnerSprd: String, //calculated through points
  winnerOU: String, //calculated through points
  suspended: Boolean,
  suspendedReason: String,
  conference: String,
  devision: String,
  week: Number,
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
