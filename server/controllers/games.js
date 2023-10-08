const Game = require("../models/games");

// Create a new game
const createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

// Get all games
const getGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ gamedate: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single game
const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a game
const updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    Object.assign(game, req.body);
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a game
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    await game.remove();
    res.json({ message: "Game deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
};
