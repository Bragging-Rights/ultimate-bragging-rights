const express = require("express");
const router = express.Router();
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
} = require("../../controllers/leagues/nhl");

// Create a new team
router.post("/teams", createTeam);

// Get all teams
router.get("/teams", getTeams);

// Get a single team by ID
router.get("/teams/:id", getTeamById);

// Update a team by ID
router.patch("/teams/:id", updateTeamById);

// Delete a team by ID
router.delete("/teams/:id", deleteTeamById);

module.exports = router;
