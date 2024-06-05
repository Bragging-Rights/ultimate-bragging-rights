const GamesPlayed = require("../../models/gamesPlayed");
const Game = require("../../models/games");

exports.allotUserPoints = async (resultPoints) => {
  console.log("in allotUserPoints");
  console.log(resultPoints);

  resultPoints.forEach(async (r) => {
    const gamePlayed = await GamesPlayed.findOne({ _id: r.playedGame._id });
    console.log(gamePlayed);

    if (gamePlayed) {
      const OGgame = Game.findById(r.playedGame?.gameData);

      console.log(r.result?.endingsPoints);

      gamePlayed.UBR = r.perfectScore;
      gamePlayed.ML = OGgame["v-ml-points"] + OGgame["h-ml-points"];
      gamePlayed.O_U = OGgame["v-ou-points"] + OGgame["h-ou-points"];
      gamePlayed.Sprd = OGgame["v-sprd-points"] + OGgame["h-sprd-points"];

      let p1sVisitor = r.result?.accuracyPoints?.visitor?.p1s;
      let p1sHome = r.result?.accuracyPoints?.home?.p1s;
      if (!isNaN(p1sVisitor) && !isNaN(p1sHome)) {
        gamePlayed["1S"] = p1sVisitor + p1sHome;
      } else if (!isNaN(p1sVisitor)) {
        gamePlayed["1S"] = p1sVisitor;
      } else if (!isNaN(p1sHome)) {
        gamePlayed["1S"] = p1sHome;
      }

      gamePlayed.Reg = r.result?.endingsPoints?.pickRegulation;
      gamePlayed.EI = r.result?.endingsPoints.pickRegulation;

      gamePlayed.save();
    }
  });
};
