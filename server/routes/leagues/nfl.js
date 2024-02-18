const express = require("express");
const {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} = require("../../controllers/leagues/nfl");

const router = express.Router();

// Create
router.post("/teams", createTeam);

// Read
router.get("/teams", getTeams);
router.get("/teams/:id", getTeam);

// Update
router.put("/teams/:id", updateTeam);

// Delete
router.delete("/teams/:id", deleteTeam);

module.exports = router;
