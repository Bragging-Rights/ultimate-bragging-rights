const mongoose = require("mongoose");

const mlbSchema = new mongoose.Schema({
  id: String,
  displayName: String,
  conference: String,
  division: String,
  active: String,
  previousName: String,
  fullName: String,
  startDate: Date,
  endDate: Date,
  abbreviation: String,
  city: String,
  province: String,
  state: String,
  country: String,
  stadium: String,
  relocatedFrom: String,
  relocatedTo: String,
});

const mlb = mongoose.model("mlb", mlbSchema);

module.exports = mlb;
