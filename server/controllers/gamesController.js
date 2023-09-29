const GamePoints = require("../models/gamePoints");
const GamesPlayed = require("../models/gamesPlayed");
const mongoose = require("mongoose");
const { responseObject } = require("../utils/responseObject");


const seasonModel = mongoose.model('seasons', {});
const gamesModel = mongoose.model('games', {});
const League = mongoose.model('league', {}, "league");


exports.getLeaguesController = async (req, res) => {
  try {
    const leagues = await League.find();
    res
      .status(200)
      .json(responseObject(leagues, "Data Fetched Successfully", false));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(responseObject(error, "An unknown error occured", true));
  }
};

exports.getSeasonsController = async (req, res) => {
  try {
    const seasons = await seasonModel.find();
    res
      .status(200)
      .json(responseObject(seasons, "Data Fetched Successfully", false));
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "An unknown error occured", true));
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await gamesModel.find().limit(1000);
    res
      .status(200)
      .json(responseObject(games, "Data Fetched Successfully", false));
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "An unknown error occured", true));
  }
};

exports.getGamesPlayed = async (req, res) => {
  try {
    const games = await GamesPlayed.find().limit(1000);
    res
      .status(200)
      .json(responseObject(games, `Data Fetched Successfully`, false));
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "An unknown error occured", true));
  }
};

exports.getLeagueGames = async (req, res) => {
  try {
    const games = await gamesModel.find({ league: req.body.league_name }).limit(1000);
    res
      .status(200)
      .json(responseObject(games, "Data Fetched Successfully", false));
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "An unknown error occured", true));
  }
};

exports.addPrediction = async (req, res) => {
  const {
    id,
    ip,
    email,
    gameid,
    gamedate,
    visitor,
    home,
    pick_visitor,
    pick_home,
    GameEndingPrediction,
    sports,
    league,
    GameEndingActual,
  } = req.body;

  const gamesPlayed = new GamesPlayed({
    id,
    ip,
    email,
    gameid,
    gamedate,
    visitor,
    home,
    pick_visitor,
    pick_home,
    GameEndingPrediction,
    sports,
    league,
    GameEndingActual,
  });

  try {
    const savedGamesPlayed = await gamesPlayed.save();
    res
      .status(200)
      .json(
        responseObject(savedGamesPlayed, "Prediction added successfully", false)
      );
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "Error in inserting prediction", true));
  }
};

exports.lockPrediction = async (req, res) => {
  const {
    lock_prediction
  } = req.body;

  const getGame = GamePoints.findOne({ _id: req.params.id });
  try {
    getGame.lock_prediction = lock_prediction;
    getGame.save();
    res
      .status(200)
      .json(
        responseObject(getGame, "Prediction locked successfully", false)
      );
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "Error in locking prediction", true));
  }
};

// Function to calculate points based on predictions and actual scores
const calculatePoints = (prediction, actual) => {
  let points = 0;

  // Check if both scores are predicted correctly
  if (
    prediction.visitor_score === actual.visitor_score &&
    prediction.home_score === actual.home_score
  ) {
    points += 15;
    prediction.get_both_score_right = 15;
  }

  // Check if the winner is predicted correctly
  if (
    (prediction.visitor_score > prediction.home_score &&
      actual.visitor_score > actual.home_score) ||
    (prediction.visitor_score < prediction.home_score &&
      actual.visitor_score < actual.home_score) ||
    (prediction.visitor_score === prediction.home_score &&
      actual.visitor_score === actual.home_score)
  ) {
    points += 3;
    prediction.get_winner_right = 3;
  }

  // Check if one score is predicted correctly
  if (
    prediction.visitor_score === actual.visitor_score ||
    prediction.home_score === actual.home_score
  ) {
    points += 2;
    prediction.get_one_score_right = 2;
  }

  // Check if visitor score is predicted correctly
  if (prediction.visitor_score === actual.visitor_score) {
    points += 3;
    prediction.get_visitor_score3pts = 3;
  }

  // Check if home score is predicted correctly
  if (prediction.home_score === actual.home_score) {
    points += 3;
    prediction.get_home_score3pts = 3;
  }

  return points;
};

// Route to update game score and calculate points for all entries
exports.updateActualScoresAndCalculatePredictions = async (req, res) => {
  const { visitor_score, home_score } = req.body;

  try {
    // Get all predictions from the database
    const predictions = await GamePoints.find();

    for (const prediction of predictions) {
      // Update the actual scores
      prediction.visitor_score = visitor_score;
      prediction.home_score = home_score;

      // Calculate points and update other fields
      const points = calculatePoints(prediction, req.body);

      // Save the updated prediction to the database
      await prediction.save();
    }

    res.status(200).json({ message: "Predictions updated successfully" });
  } catch (error) {
    console.error("Error updating predictions:", error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.addActualScores = async (req, res) => {
  const {
    user,
    gameid,
    gamedate,
    eldate,
    visitor_team,
    home_team,
    visitor_pick,
    home_pick,
    GameEndingPrediction,
    sports,
    league,
  } = req.body;

  try {
    const gamePoints = await GamePoints.findOneAndUpdate(
      {
        user,
        gameid,
        gamedate,
        eldate,
        visitor_team,
        home_team,
        visitor_pick,
        home_pick,
        GameEndingPrediction,
        sports,
        league,
      },
      { GameEndingActual },
      { new: true }
    );

    res
      .status(200)
      .json(
        responseObject(gamePoints, "Prediction updated successfully", false)
      );
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "Error in updating prediction", true));
  }
};
