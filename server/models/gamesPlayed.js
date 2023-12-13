const mongoose = require("mongoose");

const gamesPlayedSchema = new mongoose.Schema(
  {
    gameData: String,
    pick_visitor: String,
    pick_home: String,
    gameEnding: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
    Pick_num_ot: String,
    Pick_so: Boolean,
    Pick_ot: Boolean,
    Pick_Reg: Boolean,
  },
  { timestamps: true }
);

const GamesPlayed = mongoose.model("gamesPlayed", gamesPlayedSchema);

module.exports = GamesPlayed;
