const express = require("express");
const router = express.Router();
const {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
  getTeamsOfLeaguesController,
  getGamesByDate,
} = require("../controllers/games");
const { authenticateUser, checkAdmin } = require("../middlewares/auth");
// const { authenticateUser, checkAdmin } = require("../middlewares/auth");

// Create a new game
router.post("/createGame", createGame);

// Get Teams of a league
router.get("/teams/:league", getTeamsOfLeaguesController);

// Get all games
router.get("/getAllGames/:league/:date", getGames);

// Get a single game
router.get("/getGame/:id", getGame);

// Update a game
router.patch("/updateGame/:id", updateGame);

// Delete a game
router.delete("/deleteGame/:id", deleteGame);

router.get("/getGameBydate/:gamedate", getGamesByDate);

module.exports = router;
