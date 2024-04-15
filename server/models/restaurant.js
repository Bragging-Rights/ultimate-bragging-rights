
const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  contestName: {
    type: String,
    required: true,
  },
  prizeName: {
    type: String,
    required: true,
  },
  prizeDescription: String,
  repeatAutomatically: {
    type: Boolean,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  runThePoolOn: {
    type: String,
    required: true,
  },
  whichStatsWin: {
    type: String,
    required: true,
  },
  interactionType: {
    type: String,
    required: true,
  },
});

const branchSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  branchCode: {
    type: String,
    required: true,
  },
  mainAddress: {
    address: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  manager: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  pools: [poolSchema],
});

const restaurantSchema = new mongoose.Schema({
  user: {
    Title: {
      type: String,
    },
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
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  category: {
    cat: {
      type: String,
      required: true,
    },
    subcat: {
      type: String,
      required: true,
    },
  },
  company: {
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    multipleLocations: {
      type: Boolean,
      required: true,
    },
    numOfLocations: {
      type: Number,
    },
  },
  mainLocation: {
    address: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  branches: [branchSchema], 
});

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = restaurantModel;