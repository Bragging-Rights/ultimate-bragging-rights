const mongoose = require("mongoose");
const crypto = require("crypto");
const { genSalt } = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: {
    type: String,
    default: () => crypto.randomBytes(16).toString("hex"),
    unique: true,
  },
  // affiliateCode: {
  //   type: String,
  //   unique: true,
  // },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  zipCode: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  leagues: [
    {
      league: {
        type: String,
        required: true,
      },
      team: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  // data for future
  directReferrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  indirectReferrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tickets: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.referralCode) {
    // Generate referral code from last 3 characters of MongoDB ID
    this.referralCode = this._id.toString().slice(-5);
  }
  if (!this.affiliateCode) {
    // Generate affiliate code from last 5 characters of MongoDB ID
    this.affiliateCode = this._id.toString().slice(-7);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// team: {
//   type: String,
//   required: true,
// },

// league1: {
//   type: String,
//   enum: ["nba", "nfl", "mlb", "nhl", null],
//   // required: true,
// },
// username1: {
//   type: String,
//   // required: true,
//   // unique: true,
// },
// team1: {
//   type: String,
//   // required: true,
// },

// league2: {
//   type: String,
//   enum: ["nba", "nfl", "mlb", "nhl", null],
//   // required: true,
// },
// username2: {
//   type: String,
//   // required: true,
//   // unique: true,
// },
// team2: {
//   type: String,
//   // required: true,
// },

// league3: {
//   type: String,
//   enum: ["nba", "nfl", "mlb", "nhl", null],
//   // required: true,
// },
// username3: {
//   type: String,
//   // required: true,
//   // unique: true,
// },
// team3: {
//   type: String,
//   // required: true,
// },
// isAdmin: {
//   type: Boolean,
//   default: false,
// },
// isVerified: {
//   type: Boolean,
//   default: false,
// },
// referralName: {
//   type: String,
//   default: null,
// },
//},
// { collection: "user_temp" }
// gender: {
//   //this is decleared
//   type: String,
//   enum: ["male", "female", "other"],
//   required: true,
// },
// city: {
//   //this is decleared
//   type: String,
//   required: true,
// },
// state: {
//   //this is decleared
//   type: String,
//   required: true,
// },
// country: {
//   //this is decleared
//   type: String,
//   required: true,
// },
// zipCode: {
//   //this is decleared
//   type: String,
//   required: true,
// },
// phone: {
//   //this is decleared
//   type: String,
//   required: true,
// },
// otp: {
//   type: String,
//   required: true,
// },
// // emailVerified: {
// //   type: Boolean,
// //   required: true,
// // },
// league: {
//   type: String,
//   enum: ["nba", "nfl", "mlb", "nhl", null],
//   required: true,
// },
