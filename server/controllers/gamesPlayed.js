const GamesPlayed = require("../models/gamesPlayed");

// Create a new game played record
exports.createGamePlayed = async (req, res) => {
  console.log("req.body:", req.body);
  try {
    const gamePlayed = new GamesPlayed(req.body);
    await gamePlayed.save();
    res.status(201).json({
      success: true,
      message: "Game played record created successfully.",
      data: gamePlayed,
    });
  } catch (err) {
    console.error("Error creating game played record:", err);
    res.status(500).json({
      success: false,
      message: "Error creating game played record.",
      error: err.message,
    });
  }
};

// Get all game played records
exports.getAllGamePlayed = async (req, res) => {
  try {
    const gamePlayed = await GamesPlayed.find();
    res.status(200).json({
      success: true,
      message: "Game played records retrieved successfully.",
      data: gamePlayed,
    });
  } catch (err) {
    console.error("Error retrieving game played records:", err);
    res.status(500).json({
      success: false,
      message: "Error retrieving game played records.",
      error: err.message,
    });
  }
};

// Get a single game played record by ID
exports.getGamePlayedById = async (req, res) => {
  try {
    const gamePlayed = await GamesPlayed.findById(req.params.id);
    if (!gamePlayed) {
      return res.status(404).json({
        success: false,
        message: "Game played record not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Game played record retrieved successfully.",
      data: gamePlayed,
    });
  } catch (err) {
    console.error("Error retrieving game played record:", err);
    res.status(500).json({
      success: false,
      message: "Error retrieving game played record.",
      error: err.message,
    });
  }
};

// Update a game played record by ID
exports.updateGamePlayedById = async (req, res) => {
  try {
    const gamePlayed = await GamesPlayed.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!gamePlayed) {
      return res.status(404).json({
        success: false,
        message: "Game played record not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Game played record updated successfully.",
      data: gamePlayed,
    });
  } catch (err) {
    console.error("Error updating game played record:", err);
    res.status(500).json({
      success: false,
      message: "Error updating game played record.",
      error: err.message,
    });
  }
};

// Delete a game played record by ID
exports.deleteGamePlayedById = async (req, res) => {
  try {
    const gamePlayed = await GamesPlayed.findByIdAndDelete(req.params.id);
    if (!gamePlayed) {
      return res.status(404).json({
        success: false,
        message: "Game played record not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Game played record deleted successfully.",
      data: gamePlayed,
    });
  } catch (err) {
    console.error("Error deleting game played record:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting game played record.",
      error: err.message,
    });
  }
};
