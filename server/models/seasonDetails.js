const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for season details
const SeasonDetailsSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    league: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model from the schema
const SeasonDetails = mongoose.model("SeasonDetails", SeasonDetailsSchema);

module.exports = SeasonDetails;
