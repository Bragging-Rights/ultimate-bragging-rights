const mongoose = require("mongoose");

const mlbSchema = new mongoose.Schema(
  {
    id: { type: String },
    displayName: { type: String },
    conference: { type: String },
    division: { type: String },
    active: { type: String },
    previousName: { type: String },
    fullName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    abbreviation: { type: String },
    city: { type: String },
    province: { type: String },
    state: { type: String },
    country: { type: String },
    stadium: { type: String },
    relocatedFrom: { type: String },
    relocatedTo: { type: String },
  },
  { collection: "mlb" }
);

const mlb = mongoose.model("mlb", mlbSchema);

module.exports = mlb;
