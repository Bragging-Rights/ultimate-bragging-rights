const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const { responseObject } = require("../utils/responseObject");
const generateOTP = require("../utils/optGenerator");
const sendEmail = require("../utils/sendEmail");

exports.signUpController = async (req, res) => {
  console.log(req.body);
  data = req.body;
  const user = {
    firstName: data.firstName, //
    lastName: data.lastName, //
    email: data.email, //
    password: data.password, //
    // gender: data.gender, //
    // city: data.city, //
    // state: data.province, //
    // country: data.country, //
    // zipCode: data.postalCode,
    // phone: data.phoneNumber,
    league: data.leagues[0]?.league || null,
    username: data.leagues[0]?.username || null,
    team: data.leagues[0]?.team || null,
    league1: data.leagues[1]?.league || null,
    username1: data.leagues[1]?.username || null,
    team1: data.leagues[1]?.team || null,
    league2: data.leagues[2]?.league || null,
    username2: data.leagues[2]?.username || null,
    team2: data.leagues[2]?.team || null,
    league3: data.leagues[3]?.league || null,
    username3: data.leagues[3]?.username || null,
    team3: data.leagues[3]?.team || null,
    referralName: data.referralName,
  };

  // Check if the username is unique for each league
  const leagues = [
    data.leagues[0]?.league || null,
    data.leagues[1]?.league || null,
    data.leagues[2]?.league || null,
    data.leagues[3]?.league || null,
  ];
  const usernames = [
    data.leagues[0]?.team || null,
    data.leagues[1]?.team || null,
    data.leagues[2]?.team || null,
    data.leagues[3]?.team || null,
  ];

  for (let i = 0; i < leagues.length; i++) {
    if (
      usernames != null &&
      usernames[i] != null &&
      leagues != null &&
      leagues[i] != null
    ) {
      try {
        const existingUser = await User.findOne({
          username: usernames[i],
          league: leagues[i],
        });
        if (existingUser) {
          return res
            .status(409)
            .json(
              responseObject(
                {},
                `Username ${usernames[i]} already exists in league ${leagues[i]}. Please try another one`,
                false
              )
            );
        }
      } catch (error) {
        console.error("Error finding user:", error);
        return res
          .status(500)
          .json(responseObject({}, "Error registering user.", true));
      }
    }
  }

  // Check if the email is unique
  const email = user.email;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json(
          responseObject(
            {},
            "Email already exists. Please try another one",
            false
          )
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    //otp
    const otp = generateOTP();
    user.otp = otp;
    user.isVerified = false;
    user.password = hash;

    const newUser = new User(user);
    const savedUser = await newUser.save();
    const userId = savedUser._id;

    const foundUser = await User.findById(userId);
    if (foundUser) {
      const user = foundUser.toObject();
      delete user.password;

      delete user.otp;
      delete user.isVerified;
      res
        .status(200)
        .json(responseObject(user, "User registered successfully.", false));

      sendEmail(
        email,
        "OTP",
        `<div><p>Your OTP is: <b>${otp}</b></p><p style = "margin-top: 100px">Bragging Rights</p></div>`
      );
    } else {
      console.log("User not found after insertion.");
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    return res
      .status(500)
      .json(responseObject({}, "Error registering user.", true));
  }
};

exports.signInController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  console.log(email, password);

  try {
    const foundUser = await User.findOne({ email });
    console.log(foundUser);
    if (!foundUser) {
      return res
        .status(201)
        .json(responseObject({}, "Incorrect username or password.", true));
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
    console.log(checkPassword);
    if (!checkPassword) {
      return res
        .status(201)
        .json(responseObject({}, "Incorrect username or password.", true));
    }

    const payload = {
      user: {
        id: foundUser._id,
        role: foundUser?.role,
      },
    };
    delete foundUser.password;
    delete foundUser.otp;
    console.log(config);
    // jwt.sign(payload, config.jwtSecret, (err, token) => {
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        res.status(400).json(responseObject({}, "Jwt Error", true));
        console.log(err);
      } else {
        foundUser.token = token;
        res
          .status(200)
          .json(responseObject(foundUser, "Logged In Successfully", false));
      }
    });
  } catch (err) {
    res.status(404).send(responseObject({}, "Error Logging in", false));
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(404)
        .json(responseObject({}, "Error in finding user", true));
    }

    if (otp === foundUser?.otp) {
      foundUser.otp = "";
      foundUser.emailVerified = true;
      await foundUser.save();
      res.status(200).json(responseObject({}, "OTP verified!", false));
    } else {
      res.status(200).json(responseObject({}, "Invalid OTP", false));
    }
  } catch (err) {
    res.status(404).json(responseObject({}, "Error in finding user", true));
  }
};
