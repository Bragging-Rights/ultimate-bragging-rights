const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const { responseObject } = require("../utils/responseObject");
const generateOTP = require("../utils/optGenerator");
const sendEmail = require("../utils/sendEmail");

exports.signUpController = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    gender,
    city,
    state,
    country,
    zipCode,
    phone,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json(
          responseObject(
            {},
            "Email already exists. Please try another one",
            false
          )
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const otp = generateOTP();

    const user = new User({
      firstName,
      lastName,
      email,
      username,
      password: hash,
      gender,
      city,
      state,
      country,
      zipCode,
      phone,
      otp,
      emailVerified: false,
    });

    const savedUser = await user.save();
    const userId = savedUser._id;

    const foundUser = await User.findById(userId);
    if (foundUser) {
      const user = foundUser.toObject();
      delete user.password;
      delete user.otp;
      delete user.emailVerified;
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

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(201)
        .json(responseObject({}, "Incorrect username or password.", true));
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
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
    jwt.sign(payload, config.jwtSecret, (err, token) => {
      if (err) res.status(400).json(responseObject({}, "Jwt Error", true));
      else {
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
