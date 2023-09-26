const GamePoints = require("../models/gamePoints");
const moment = require("moment");
const { responseObject } = require("../utils/responseObject");

exports.getLeaguesController = async (req, res) => {
  try {
    const leagues = await GamePoints.distinct("league");
    res
      .status(200)
      .json(responseObject(leagues, "Data Fetched Successfully", false));
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "An unknown error occured", true));
  }
};

exports.getSeasonsController = async (req, res) => {
  try {
    const seasons = await GamePoints.distinct("eldate");
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
    const games = await GamePoints.find().limit(1000);
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
  console.log(req.body);
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
    GameEndingActual,
  } = req.body;

  const gamePoints = new GamePoints({
    user,
    gameid,
    gamedate,
    timestamping: moment().format("YYYY-MM-DD HH:mm:ss"),
    eldate,
    visitor_team,
    home_team,
    visitor_pick,
    home_pick,
    GameEndingPrediction,
    sports,
    league,
    GameEndingActual,
  });

  try {
    const savedGamePoints = await gamePoints.save();
    res
      .status(200)
      .json(
        responseObject(savedGamePoints, "Prediction added successfully", false)
      );
  } catch (error) {
    res
      .status(400)
      .json(responseObject(error, "Error in inserting prediction", true));
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
