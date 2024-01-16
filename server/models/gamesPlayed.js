const mongoose = require("mongoose");

const gamesPlayedSchema = new mongoose.Schema(
  {
    gameData: String,
    pick_visitor: String,
    pick_home: String,
    gameEnding: String,
    userId: String,
    Pick_num_ot: String,
    Pick_so: String,
    Pick_ot: String,
    Pick_Reg: String,
    league: String,
  },

  { timestamps: true }
);

const GamesPlayed = mongoose.model("gamesPlayed", gamesPlayedSchema);

module.exports = GamesPlayed;
