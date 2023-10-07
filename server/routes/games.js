const express = require("express");
const router = express.Router();
const {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
} = require("../controllers/games");
const { authenticateUser, checkAdmin } = require("../middlewares/auth");
// const { authenticateUser, checkAdmin } = require("../middlewares/auth");

// Create a new game
router.post("/createGame", authenticateUser, checkAdmin, createGame);

// Get all games
router.get("/getAllGames", getGames);

// Get a single game
router.get("/getGame:id", getGame);

// Update a game
router.patch("/updateGame:id", authenticateUser, checkAdmin, updateGame);

// Delete a game
router.delete("/deleteGame:id", authenticateUser, checkAdmin, deleteGame);

module.exports = router;
