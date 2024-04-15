const express = require("express");
const router = express.Router();
const oddsController = require("../controllers/odds"); // Assuming the getOdds function is in oddsController

// Get odds by sport
router.get("/getbySport/:sport", oddsController.getOdds);

module.exports = router;
