const mongoose = require("mongoose");
const moment = require("moment");

const gamesPlayedSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Id is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    gameid: {
        type: String,
        required: [true, "Game ID is required"],
    },
    gamedate: {
        type: String,
        required: [true, "Game date is required"],
    },
    tstamp: {
        type: String,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    visitor: {
        type: String,
        required: [true, "Visitor team is required"],
    },
    home: {
        type: String,
        required: [true, "Home team is required"],
    },
    pick_visitor: {
        type: Number,
        required: [true, "Visitor pick is required"],
    },
    pick_home: {
        type: Number,
        required: [true, "Home pick is required"],
    },
    ip: {
        type: String,
        required: [true, "IP is required"],
    },
    GameEndingPrediction: {
        type: String,
        required: [true, "Game ending prediction is required"],
    },
    sports: {
        type: String,
        required: [true, "Sports is required"],
    },
    league: {
        type: String,
        required: [true, "League is required"],
    },
    GameEndingActual: {
        type: String
    },
    lock_prediction: {
        type: Boolean,
        default: false
    },
    balanced: {
        type: String,
    }
});

// Create a model for the gamesPlayed collection
const GamePoints = mongoose.model("gamesPlayed", gamesPlayedSchema, "gamesPlayed");

module.exports = GamePoints;