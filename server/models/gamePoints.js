const mongoose = require("mongoose");
const moment = require("moment");

// Define the schema for the gamePoints collection
// const gamePointsSchema = new mongoose.Schema({
//   user: String,
//   gameid: String,
//   gamedate: String,
//   timestamping: String,
//   eldate: String,
//   visitor_team: String,
//   home_team: String,
//   visitor_pick: Number,
//   home_pick: Number,
//   GameEndingPrediction: String,
//   sports: String,
//   league: String,
//   GameEndingActual: String,
//   visitor_score: Number,
//   home_score: Number,
//   get_both_score_right: Number,
//   get_winner_right: Number,
//   get_one_score_right: Number,
//   get_visitor_score3pts: Number,
//   get_home_score3pts: Number,
//   lock_prediction: Boolean,
//   total_tickets: Number
// });
const gamePointsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "User is required"],
  },
  gameid: {
    type: String,
    required: [true, "Game ID is required"],
  },
  gamedate: {
    type: String,
    required: [true, "Game date is required"],
  },
  timestamping: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  eldate: {
    type: String,
    required: [true, "EL date is required"],
  },
  visitor_team: {
    type: String,
    required: [true, "Visitor team is required"],
  },
  home_team: {
    type: String,
    required: [true, "Home team is required"],
  },
  visitor_pick: {
    type: Number,
    required: [true, "Visitor pick is required"],
  },
  home_pick: {
    type: Number,
    required: [true, "Home pick is required"],
  },
  GameEndingPrediction: {
    type: String,
    required: [true, "Game ending prediction is required"],
  },
  sports: {
    type: String,
    required: [true, "Sports is required"],
  },
  league: {
    type: String,
    required: [true, "League is required"],
  },
  GameEndingActual: {
    type: String,
    required: [true, "Actual game ending is required"],
  },
  total_tickets: {
    type: Number,
    required: [true, "Total tickets is required"],
  },
  visitor_score: Number,
  home_score: Number,
  get_both_score_right: Number,
  get_winner_right: Number,
  get_one_score_right: Number,
  get_visitor_score3pts: Number,
  get_home_score3pts: Number,
  lock_prediction: Boolean
});

// Create a model for the gamePoints collection
const GamePoints = mongoose.model("gamePoints", gamePointsSchema, "gamePoints");

module.exports = GamePoints;
