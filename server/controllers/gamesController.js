const GamePoints = require("../models/gamePoints");
const GamesPlayed = require("../models/gamesPlayed");
const mongoose = require("mongoose");
const { responseObject } = require("../utils/responseObject");


const seasonModel = mongoose.model('seasons', {});
const gamesModel = mongoose.model('games', {}, "games");
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

// exports.getGames = async (req, res) => {
//   try {
//     const games = await gamesModel.find().limit(100);
//     res
//       .status(200)
//       .json(responseObject(games, "Data Fetched Successfully", false));
//   } catch (error) {
//     console.log(error)
//     res
//       .status(400)
//       .json(responseObject(error, "An unknown error occured", true));
//   }
// };

exports.getGames = async (req, res) => {
  try {
    // Define the page size and current page number
    const pageSize = 50;
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;

    // Calculate the skip value to fetch the appropriate data
    const skip = (currentPage - 1) * pageSize;

    // Fetch games data with pagination
    const games = await gamesModel.find().skip(skip).limit(pageSize);

    // Count the total number of games in the database
    const totalGamesCount = await gamesModel.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalGamesCount / pageSize);

    // Prepare the response object
    const responseObject = {
      currentPage: currentPage,
      totalPages: totalPages,
      data: games,
      message: "Data Fetched Successfully",
      error: false
    };

    res.status(200).json(responseObject);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      data: null,
      message: "An unknown error occurred",
      error: true,
    });
  }
};

exports.getGamesPlayed = async (req, res) => {
  try {
    // Define the page size and current page number
    const pageSize = 50;
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;

    // Calculate the skip value to fetch the appropriate data
    const skip = (currentPage - 1) * pageSize;
    const totalGamesCount = await gamesModel.countDocuments();
    const games = await GamesPlayed.find().skip(skip).limit(pageSize);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalGamesCount / pageSize);

    res
      .status(200)
      .json(responseObject({
        currentPage: currentPage,
        totalPages: totalPages,
        data: games,
        message: `Data Fetched Successfully`,
        error: false
      }));
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

exports.getResults = async (req, res) => {
  try {
    // Define the page size and current page number
    const pageSize = 50;
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;

    // Calculate the skip value to fetch the appropriate data
    const skip = (currentPage - 1) * pageSize;
    const totalGamesCount = await gamesModel.countDocuments();
    const games = await GamePoints.find().skip(skip).limit(pageSize);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalGamesCount / pageSize);

    res
      .status(200)
      .json(responseObject({
        currentPage: currentPage,
        totalPages: totalPages,
        data: games,
        message: `Data Fetched Successfully`,
        error: false
      }));
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


// // Route to update game score and calculate points for all entries
// exports.updateActualScoresAndCalculatePredictions = async (req, res) => {
//   try {
//     const moneyLineOdds = req.body.moneyLineOdds;
//     const isFavorite = moneyLineOdds < 0;
//     const impliedProbability = isFavorite
//       ? 100 / (Math.abs(moneyLineOdds) / (Math.abs(moneyLineOdds) + 1))
//       : 100 / (moneyLineOdds / (moneyLineOdds + 1));

//     const getWinnerRightPoints = (100 - impliedProbability) / 10;

//     // You can associate the points with a user and save them to the database here
//     // For this example, we're just returning the points in the response
//     // res.json({ getWinnerRightPoints });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
// Route to update game score and calculate points for all entries
exports.updateActualScoresAndCalculatePredictions = async (req, res) => {
  try {
    // console.log(req.body)
    // Retrieve user's prediction data and game data from the request
    const { username, predictionData, gameData } = req.body;

    // Implement point calculation logic based on the provided formulas

    // Calculate implied probability for favorite and underdog
    const impliedProbabilityFavorite =
      100 / (Math.abs(gameData.moneyLineOddsFavorite) / (Math.abs(gameData.moneyLineOddsFavorite) + 1));

    const impliedProbabilityUnderdog =
      100 / (gameData.moneyLineOddsUnderdog / (gameData.moneyLineOddsUnderdog + 1));

    // Calculate points for picking the winner correctly
    let winnerPoints = 0;

    if (predictionData.winnerPrediction === gameData.actualWinner) {
      winnerPoints = (100 - impliedProbabilityFavorite) / 10;
    } else {
      winnerPoints = (100 - impliedProbabilityUnderdog) / 10;
    }

    // Calculate implied probability for point spread
    const impliedProbabilitySpreadFavorite =
      100 / (gameData.pointSpreadOddsFavorite / (gameData.pointSpreadOddsFavorite + 1));

    const impliedProbabilitySpreadUnderdog =
      100 / (gameData.pointSpreadOddsUnderdog / Math.abs(gameData.pointSpreadOddsUnderdog + 1));

    // Calculate points for picking the spread correctly
    let spreadPoints = 0;

    if (predictionData.spreadPrediction > 0 && gameData.actualSpread > 0) {
      // Picked the favorite to win by more than the spread
      spreadPoints = (100 - impliedProbabilitySpreadFavorite) / 10;
    } else if (predictionData.spreadPrediction < 0 && gameData.actualSpread < 0) {
      // Picked the underdog to lose by less than the spread
      spreadPoints = (100 - impliedProbabilitySpreadUnderdog) / 10;
    }

    // Calculate implied probability for over/under
    const impliedProbabilityOver =
      100 / (gameData.overUnderOdds / (gameData.overUnderOdds + 1));

    const impliedProbabilityUnder =
      100 / (gameData.overUnderOdds / Math.abs(gameData.overUnderOdds + 1));

    // Calculate points for picking over/under correctly
    let overUnderPoints = 0;

    if (predictionData.overUnderPrediction === 'Over' && gameData.actualScore > gameData.overUnderLine) {
      overUnderPoints = (100 - impliedProbabilityOver) / 10;
    } else if (predictionData.overUnderPrediction === 'Under' && gameData.actualScore < gameData.overUnderLine) {
      overUnderPoints = (100 - impliedProbabilityUnder) / 10;
    }

    let scores2Points = 0;

    if (predictionData.scorePrediction1 === gameData.actualScore1 && predictionData.scorePrediction2 === gameData.actualScore2) {
      // Picked both scores correctly
      scores2Points = Math.abs(gameData.moneyLineOddsLosingTeam);
    } else {
      scores2Points = 0
    }

    // Calculate score1Points
    let score1Points = 0;

    if (predictionData.scorePrediction1 === gameData.actualScore1) {
      // Picked score1 correctly
      if (predictionData.winnerPrediction === gameData.actualWinner) {
        // Picked the winner correctly
        score1Points = (Math.abs(gameData.moneyLineOddsFavorite) / 2) * 0.5;
      } else {
        // Did not pick the winner correctly
        score1Points = (Math.abs(gameData.moneyLineOddsFavorite) / 2) * 0.25;
      }
    }
    let score1PointsForBaseball = 0;

    if (predictionData.winnerPrediction === gameData.actualWinner) {
      // Picked the winner correctly
      const totalPointsWinner = gameData.totalPointsWinner; // Adjust this based on your data model
      score1PointsForBaseball = predictionData.winnerPrediction === gameData.favoriteTeam
        ? (totalPointsWinner * 0.25) // 25% of total points available for the winning team
        : (totalPointsWinner * 0.10); // 10% of total points available for the winning team
    }

    let shutoutPoints = 0;

    if (gameData.sport === 'Hockey') {
      if (gameData.wentToShutOut) {
        shutoutPoints = 6;
      }
      // For Hockey
      if (predictionData.shutoutPrediction === 'OneTeam' && gameData.actualScoreTeam1 === 0) {
        // Picked a shutout for one team, and that team scored 0 points
        shutoutPoints = 10;
      }
    } else if (gameData.sport === 'Football') {
      // For Football
      if (predictionData.shutoutPrediction === 'TwoTeams' && gameData.actualScoreTeam1 === 0 && gameData.actualScoreTeam2 === 0) {
        // Picked a shutout for both teams, and both teams scored 0 points
        shutoutPoints = 50;
      }
    }

    // Calculate points for picking overtime
    let overtimePoints = 0;

    if (predictionData.overtimePrediction === 'Overtime' && gameData.wentToOvertime) {
      // Picked overtime correctly and the game actually went to overtime
      overtimePoints = 4;
    }

    console.log(
      "winner", winnerPoints,
      "spread", spreadPoints,
      "overUnder", overUnderPoints,
      "score1Points", score1Points,
      "score2Points", scores2Points,
      "score1PointsBaseball", score1PointsForBaseball,
      "shutOutPoints", shutoutPoints,
      "overTimePoints", overtimePoints,
    )
    // Calculate total points
    // const totalPoints = winnerPoints + spreadPoints + overUnderPoints;

    // // Save the calculated points in the user's data

    // // Respond with the calculated points
    // res.json({ points: totalPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// // Function to calculate points based on predictions and actual scores
// const calculatePoints = (prediction, actual) => {
//   let points = 0;

//   // Check if both scores are predicted correctly
//   if (
//     prediction.visitor_score === actual.visitor_score &&
//     prediction.home_score === actual.home_score
//   ) {
//     points += 15;
//     prediction.get_both_score_right = 15;
//   }

//   // Check if the winner is predicted correctly
//   if (
//     (prediction.visitor_score > prediction.home_score &&
//       actual.visitor_score > actual.home_score) ||
//     (prediction.visitor_score < prediction.home_score &&
//       actual.visitor_score < actual.home_score) ||
//     (prediction.visitor_score === prediction.home_score &&
//       actual.visitor_score === actual.home_score)
//   ) {
//     points += 3;
//     prediction.get_winner_right = 3;
//   }

//   // Check if one score is predicted correctly
//   if (
//     prediction.visitor_score === actual.visitor_score ||
//     prediction.home_score === actual.home_score
//   ) {
//     points += 2;
//     prediction.get_one_score_right = 2;
//   }

//   // Check if visitor score is predicted correctly
//   if (prediction.visitor_score === actual.visitor_score) {
//     points += 3;
//     prediction.get_visitor_score3pts = 3;
//   }

//   // Check if home score is predicted correctly
//   if (prediction.home_score === actual.home_score) {
//     points += 3;
//     prediction.get_home_score3pts = 3;
//   }

//   return points;
// };
// exports.updateActualScoresAndCalculatePredictions = async (req, res) => {
//   const { visitor_score, home_score } = req.body;

//   try {
//     // Get all predictions from the database
//     const predictions = await GamePoints.find();

//     for (const prediction of predictions) {
//       // Update the actual scores
//       prediction.visitor_score = visitor_score;
//       prediction.home_score = home_score;

//       // Calculate points and update other fields
//       const points = calculatePoints(prediction, req.body);

//       // Save the updated prediction to the database
//       await prediction.save();
//     }

//     res.status(200).json({ message: "Predictions updated successfully" });
//   } catch (error) {
//     console.error("Error updating predictions:", error);
//     res.status(500).json({ error: "Internal Server Error", error });
//   }
// };

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


// _id: "6512a36f8737bbcac785b157"
// id: "41"
// user: "peter@e-partner.com"
// gameid: "95513"
// eldate: "2018-05-07"
// total_tickets: "37"
// visitor_team: "Chicago Sky 1"
// home_team: "Indiana Fever"
// visitor_pick: "33"
// home_pick: "36"
// GameEndingPrediction: ""
// GameEndingActual: ""
// visitor_score: "33"
// home_score: "40"
// get_both_score_right: "0"
// get_winner_right: "2"
// get_one_score_right: "25"
// get_visitor_score3pts: "0"
// get_home_score3pts: "0"
// get_visitor_score7pts: "0"
// get_home_score7pts: "10"
// GameEnding: "0"
// league: "WNBA"
// sports: "Basketball"
// timestamping: "2023-09-03 09:33:05"
// gamedate: "2018-05-07"


