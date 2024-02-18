const mongoose = require("mongoose");

// Define the schema for the rewards collection
const rewardsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "ID is required"],
  },
  user: {
    type: String,
    required: [true, "User is required"],
  },
  gameid: {
    type: String,
    required: [true, "Game ID is required"],
  },
  eldate: {
    type: String,
    required: [true, "Date is required"],
  },
  total_tickets: {
    type: Number,
    required: [true, "Total tickets is required"],
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
  visitor_score: {
    type: Number,
    required: [true, "Visitor score is required"],
  },
  home_score: {
    type: Number,
    required: [true, "Home score is required"],
  },
  get_winner_right: {
    type: Number,
    required: [true, "Winner right is required"],
  },
  get_one_score_right: {
    type: Number,
    required: [true, "One score right is required"],
  },
  get_both_score_right: {
    type: Number,
    required: [true, "Both scores right is required"],
  },
  get_visitor_score3pts: {
    type: Number,
    required: [true, "Visitor score 3 points is required"],
  },
  get_home_score3pts: {
    type: Number,
    required: [true, "Home score 3 points is required"],
  },
  get_visitor_score7pts: {
    type: Number,
    required: [true, "Visitor score 7 points is required"],
  },
  get_home_score7pts: {
    type: Number,
    required: [true, "Home score 7 points is required"],
  },
  league: {
    type: String,
    required: [true, "League is required"],
  },
  sports: {
    type: String,
    required: [true, "Sports is required"],
  },
  timestamping: {
    type: String,
    required: [true, "Timestamp is required"],
  },
});

// Create a model based on the schema
const Rewards = mongoose.model("a_rewards_bu", rewardsSchema);

// Export the model so that it can be used in other parts of the application
module.exports = Rewards;
