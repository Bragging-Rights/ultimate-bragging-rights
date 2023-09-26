const mongoose = require("mongoose");

// Define the schema for the gamePoints collection
const gamePointsSchema = new mongoose.Schema({
  user: String,
  gameid: String,
  gamedate: String,
  timestamping: String,
  eldate: String,
  visitor_team: String,
  home_team: String,
  visitor_pick: Number,
  home_pick: Number,
  GameEndingPrediction: String,
  sports: String,
  league: String,
  GameEndingActual: String,
  visitor_score: Number,
  home_score: Number,
  get_both_score_right: Number,
  get_winner_right: Number,
  get_one_score_right: Number,
  get_visitor_score3pts: Number,
  get_home_score3pts: Number,
});

// Create a model for the gamePoints collection
const GamePoints = mongoose.model("GamePoints", gamePointsSchema);
