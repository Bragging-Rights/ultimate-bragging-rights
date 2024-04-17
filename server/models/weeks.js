const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
  league: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;
