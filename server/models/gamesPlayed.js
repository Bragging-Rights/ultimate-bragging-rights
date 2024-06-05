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
    innings: String,

    ///league data

    R: String, //rank from front
    W: String,
    L: String,
    T: String,
    GP: String,
    ML: String,
    Sprd: String,
    O_U: String,
    F: String,
    UD: String,
    UBR: String,
    "1S": String,
    "1S0": String, //needs to be implemented
    "1SW2": String,
    "2SW2": String,
    "1SW3": String,
    "2SW3": String,
    "1SW7": String,
    "2SW7": String,
    "2S0": String,
    NPT: String,
    WPT: String,
    GPT: String,
    SPT: String,
    GPT: String,
    Reg: String,
    OT: String,
    S_O: String,
    EI: String,
    GP: String,
    APG: String,
    APN: String,
    APS: String,
    APM: String,
    CS: String,
    LWS: String,
    LLS: String,
    GNP: String,
    APW: String,
    O: String,
    U: String,
    CPS: String,
    LPS: String,
    APT: String,
    PF: String,
    PA: String,
    PCT: String,
    ATS: String,
    Conf: String,
    Div: String,
    Team: String,
    Home: String,
    Road: String,
  },

  { timestamps: true }
);

const GamesPlayed = mongoose.model("gamesPlayed", gamesPlayedSchema);

module.exports = GamesPlayed;
