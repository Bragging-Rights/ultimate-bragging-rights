const mongoose = require("mongoose");
const crypto = require("crypto");
const { genSalt } = require("bcryptjs");
const { options } = require("../routes/userRoutes");

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
  otp: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
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
        sparse: true,
        // unique: true,
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
