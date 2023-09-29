const express = require('express');
const { AuthenticatorJWT } = require('../middlewares/authenticator');
const { getLeaguesController, getSeasonsController, getGames, updateActualScoresAndCalculatePredictions, addPrediction, lockPrediction, getLeagueGames, getGamesPlayed } = require('../controllers/gamesController');
const router = express.Router();

router.get("/", getGames);
router.post("/league-games", getLeagueGames);
router.get("/leagues", getLeaguesController);
router.get("/seasons", getSeasonsController);
router.post("/lock-prediction/:id", lockPrediction);

router.get("/games-played", getGamesPlayed);
router.post("/add-prediction", addPrediction);
router.put("/update-actual-scores", updateActualScoresAndCalculatePredictions);


module.exports = router;