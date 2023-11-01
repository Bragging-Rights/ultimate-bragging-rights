const express = require("express");
const router = express.Router();
const {
  createGamePlayed,
  getAllGamePlayed,
  getGamePlayedById,
  updateGamePlayedById,
  deleteGamePlayedById,
} = require("../controllers/gamesPlayed");

// Create a new game played record
router.post("/create", createGamePlayed);

// Get all game played records
router.get("/", getAllGamePlayed);

// Get a single game played record by ID
router.get("/:id", getGamePlayedById);

// Update a game played record by ID
router.put("/:id", updateGamePlayedById);

// Delete a game played record by ID
router.delete("/:id", deleteGamePlayedById);

module.exports = router;
