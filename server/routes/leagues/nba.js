const express = require("express");
const router = express.Router();
const {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} = require("./nflController");

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
