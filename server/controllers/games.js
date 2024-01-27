const Game = require("../models/games");
const mongoose = require("mongoose");
const { responseObject } = require("../utils/responseObject");
const { calculatePoints } = require("../calculations/point");
const { formatPoints } = require("../calculations/pointsFormatter");

// Create a new game
const createGame = async (req, res) => {
  // console.log(req.body);
  try {
    let data = req.body;
    console.log("data", data);
    const games = data.map((game) => {
      const points = calculatePoints(
        game.vML,
        game.hML,
        game.vSprd,
        game.hSprd,
        game.vOU,
        game.hOU
      );
      // console.log("points", points);
      return {
        league: game.league,
        seasonflag: game.season,
        gamedate: game.date,
        time: game.time,
        "v-ml": game.vML, //use these values
        "v-sprd": game.vSprd, //use these values
        "v-sprd-odds": game.vSprdOdds, //use these values
        "v-ou": game.vOU, //use these values
        "v-ou-odds": game.vOUOdds, //use these values
        "h-ml": game.hML, //use these values
        "h-sprd": game.hSprd, //use these values
        "h-sprd-odds": game.hSprdOdds, //use these values
        "h-ou": game.hOU, //use these values
        "h-ou-odds": game.hOUOdds, //use these values
        visitor: game.visitorTeam,
        home: game.homeTeam,

        ///
        "v-ml-points": formatPoints(points.vml_point),
        "h-ml-points": formatPoints(points.hml_point),
        "v-sprd-points": formatPoints(points.vsprd_point),
        "h-sprd-points": formatPoints(points.hsprd_point),
        "v-ou-points": formatPoints(points.vou_point),
        "h-ou-points": formatPoints(points.hou_point),
      };
    });

    const result = await Game.insertMany(games);
    console.log("games", result);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

const getTeamsOfLeaguesController = async (req, res) => {
  const model = mongoose.model(req.params.league, {}, req.params.league);
  try {
    const teams = await model.find({}, { displayName: 1, id: 1 });
    res
      .status(200)
      .json(responseObject(teams, "Data Fetched Successfully", false));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(responseObject(error, "An unknown error occured", true));
  }
};
// Get all games
// const getGames = async (req, res) => {
//   try {
//     const games = await Game.find().limit(100).sort({ gamedate: -1 });
//     res.json(games);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log(error);
//   }
// };
const getGames = async (req, res) => {
  console.log(req.params);
  try {
    // Calculate the start and end dates for the 24-hour window
    // const currentDate = new Date();
    // const endDate = new Date(currentDate);
    // const startDate = new Date(currentDate);
    // startDate.setHours(currentDate.getHours() - 24);
    // Use the calculated dates to query the database
    const games = await Game.find({
      league: req.params.league,
      gamedate: req.params.date,
    }).sort({ gamedate: 1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// Get a single game
const getGame = async (req, res) => {
  try {
    const game = await Game.findById({ id: req.params.id });
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
    const game = await Game.findById({ id: req.params._id });
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
    const game = await Game.findById({ id: req.params.id });
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
  getTeamsOfLeaguesController,
};
