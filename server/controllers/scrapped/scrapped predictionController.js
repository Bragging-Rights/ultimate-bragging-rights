const db = require("../db/db");
const { responseObject } = require("../utils/responseObject");
const moment = require("moment");


exports.getLeaguesController = async (req, res) => {
    db.query("SELECT * FROM league", {}, (error, results) => {
        if (results) {
            res.status(200).json(responseObject(results, "Data Fetched Successfully", false));
        }
        else {
            return res.status(400).json(responseObject(error, 'An unknown error occured', true));
        }
    });
}

exports.getSeasonsController = async (req, res) => {
    db.query("SELECT * FROM seasons", {}, (error, results) => {
        if (results) {
            res.status(200).json(responseObject(results, "Data Fetched Successfully", false));
        }
        else {
            return res.status(400).json(responseObject(error, 'An unknown error occured', true));
        }
    });
}

exports.getGames = async (req, res) => {
    db.query("SELECT * FROM games", {}, (error, results) => {
        if (results) {
            res.status(200).json(responseObject(results?.slice(0, 1000), "Data Fetched Successfully", false));
        }
        else {
            return res.status(400).json(responseObject(error, 'An unknown error occured', true));
        }
    });
}

exports.addPrediction = async (req, res) => {
    console.log(req.body);
    const { user, gameid, gamedate, eldate, visitor_team, home_team, visitor_pick, home_pick, GameEndingPrediction, sports, league, GameEndingActual } = req.body;
    const query = `INSERT INTO gamePoints (id, user, gameid, gamedate, timestamping, eldate, visitor_team, home_team, visitor_pick, home_pick, GameEndingPrediction, sports, league, GameEndingActual) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    db.query(query, [1, user, gameid, gamedate, moment().format("YYYY-MM-DD HH:mm:ss"), eldate, visitor_team, home_team, visitor_pick, home_pick, GameEndingPrediction, sports, league, "Regular"], (err, results) => {
        if (err) {
            res.status(400).json(responseObject(err, 'Error in inserting prediction', true));
        } else {
            res.status(200).json(responseObject(results, "Prediction added successfully", false));
        }
    })
}


// Function to calculate points based on predictions and actual scores
const calculatePoints = (prediction, actual) => {
    let points = 0;

    // Check if both scores are predicted correctly
    if (prediction.visitor_score === actual.visitor_score && prediction.home_score === actual.home_score) {
        points += 15;
        prediction.get_both_score_right = 15;
    }

    // Check if the winner is predicted correctly
    if ((prediction.visitor_score > prediction.home_score && actual.visitor_score > actual.home_score) ||
        (prediction.visitor_score < prediction.home_score && actual.visitor_score < actual.home_score) ||
        (prediction.visitor_score === prediction.home_score && actual.visitor_score === actual.home_score)) {
        points += 3;
        prediction.get_winner_right = 3;
    }

    // Check if one score is predicted correctly
    if (prediction.visitor_score === actual.visitor_score || prediction.home_score === actual.home_score) {
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
        await db.query('SELECT * FROM gamePoints', {}, async (err, results) => {
            const rows = results;
            console.log(err, results);

            for (const prediction of rows) {
                // Update the actual scores
                prediction.visitor_score = visitor_score;
                prediction.home_score = home_score;

                // Calculate points and update other fields
                const points = calculatePoints(prediction, req.body);

                // Update the database with the new values
                await db.query('UPDATE gamePoints SET ? WHERE id = ?', [prediction, prediction.id]);
            }
            res.status(200).json({ message: 'Predictions updated successfully' });
        });
    } catch (error) {
        console.error('Error updating predictions:', error);
        res.status(500).json({ error: 'Internal Server Error', error });
    }
}


exports.addActualScores = async (req, res) => {
    const query = "UPDATE gamePoints SET `GameEndingActual` = ?, `visitor_score` = ?, `home_score` = ?, `GameEnding` = ?, "

    db.query(query, [user, gameid, gamedate, moment().format("YYYY-MM-DD HH:mm:ss"), eldate, visitor_team, home_team, visitor_pick, home_pick, GameEndingPrediction, sports, league], (err, results) => {
        if (err) {
            res.status(400).json(responseObject(error, 'Error in inserting prediction', true));
        } else {
            res.status(200).json(responseObject(results, "Prediction added successfully", false));
        }
    })
}


// user:saeed@gmail.com
// gameid:12234
// gamedate :10-10-23
// timestamping :10-10-23 10:20:30 
// eldate :10-10-23
// visitor_team :Pak
// home_team :ind
// visitor_pick :4
// home_pick :6
// GameEndingPrediction :Regular
// sports :Football
// league :Champions