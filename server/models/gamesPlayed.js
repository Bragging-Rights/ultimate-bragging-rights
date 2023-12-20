const mongoose = require("mongoose");

const gamesPlayedSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Id is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    gameid: {
      type: String,
      required: [true, "Game ID is required"],
    },
    gamedate: {
      type: String,
      required: [true, "Game date is required"],
    },
    tstamp: {
      type: String,
      default: Date.now,
    },
    visitor: {
      type: String,
      required: [true, "Visitor team is required"],
    },
    home: {
      type: String,
      required: [true, "Home team is required"],
    },
    pick_visitor: {
      type: Number,
      required: [true, "Visitor pick is required"],
    },
    pick_home: {
      type: Number,
      required: [true, "Home pick is required"],
    },
    GameEnding: {
      type: String,
      default: null,
    },
    ip: {
      type: String,
      required: [true, "IP address is required"],
    },
    league: {
      type: String,
      required: [true, "League is required"],
    },
    sports: {
      type: String,
      required: [true, "Sports is required"],
    },
    balanced: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const GamesPlayed = mongoose.model("gamesPlayed", gamesPlayedSchema);

module.exports = GamesPlayed;
