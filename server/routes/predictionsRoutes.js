const express = require('express');
const { AuthenticatorJWT } = require('../middlewares/authenticator');
const { getLeaguesController, getSeasonsController, getGames, updateActualScoresAndCalculatePredictions, addPrediction } = require('../controllers/predictionController');
const router = express.Router();

router.get("/", getGames);
router.get("/leagues", getLeaguesController);
router.get("/seasons", getSeasonsController);
router.post("/add-prediction", addPrediction);
router.put("/update-actual-scores", updateActualScoresAndCalculatePredictions);


module.exports = router;