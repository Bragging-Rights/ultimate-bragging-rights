const express = require("express");
const weekController = require("../controllers/weeks");
const router = express.Router();

// Create a new week
router.post("/", weekController.createWeek);

// Get all weeks
router.get("/", weekController.getWeeks);

// Get a week by id
router.get("/:id", weekController.getWeek);

// Update a week by id
router.put("/:id", weekController.updateWeek);

// Delete a week by id
router.delete("/:id", weekController.deleteWeek);

router.get("/:league/:season/:year", weekController.getWeekByLeagueSeasonYear);

module.exports = router;
