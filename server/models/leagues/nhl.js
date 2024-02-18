const mongoose = require("mongoose");

const nhlSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    displayName: {
      type: String,
    },
    conference: {
      type: String,
    },
    division: {
      type: String,
    },
    active: {
      type: String,
    },
    abbreviation: {
      type: String,
    },
    fullName: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    stadium: {
      type: String,
    },
    relocatedFrom: {
      type: String,
    },
    relocatedTo: {
      type: String,
    },
    previousName: {
      type: String,
    },
  },
  { collection: "nhl" }
); // set collection name to 'nhl'

const nhl = mongoose.model("nhl", nhlSchema);
module.exports = nhl;
