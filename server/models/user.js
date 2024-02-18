const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      //this is decleared
      type: String,
      required: true,
    },
    lastName: {
      //this is decleared
      type: String,
      required: true,
    },
    email: {
      //this is decleared
      type: String,
      required: true,
      unique: true,
    },

    password: {
      //this is decleared
      type: String,
      required: true,
    },
    gender: {
      //this is decleared
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    city: {
      //this is decleared
      type: String,
      required: true,
    },
    state: {
      //this is decleared
      type: String,
      required: true,
    },
    country: {
      //this is decleared
      type: String,
      required: true,
    },
    zipCode: {
      //this is decleared
      type: String,
      required: true,
    },
    phone: {
      //this is decleared
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    // emailVerified: {
    //   type: Boolean,
    //   required: true,
    // },
    league: {
      type: String,
      enum: ["nba", "nfl", "mlb", "nhl", null],
      required: true,
    },
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    team: {
      type: String,
      required: true,
    },

    league1: {
      type: String,
      enum: ["nba", "nfl", "mlb", "nhl", null],
      // required: true,
    },
    username1: {
      type: String,
      // required: true,
      // unique: true,
    },
    team1: {
      type: String,
      // required: true,
    },

    league2: {
      type: String,
      enum: ["nba", "nfl", "mlb", "nhl", null],
      // required: true,
    },
    username2: {
      type: String,
      // required: true,
      // unique: true,
    },
    team2: {
      type: String,
      // required: true,
    },

    league3: {
      type: String,
      enum: ["nba", "nfl", "mlb", "nhl", null],
      // required: true,
    },
    username3: {
      type: String,
      // required: true,
      // unique: true,
    },
    team3: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    referralName: {
      type: String,
      default: null,
    },
  },
  { collection: "user_temp" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
