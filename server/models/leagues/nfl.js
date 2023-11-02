const mongoose = require("mongoose");

const nflSchema = new mongoose.Schema({
  id: String,
  displayName: String,
  teamLname: String,
  previousName: String,
  conference: String,
  division: String,
  active: String,
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

const nfl = mongoose.model("nfl", nflSchema);

module.exports = nfl;
