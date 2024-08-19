const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const { responseObject } = require("../utils/responseObject");
const generateOTP = require("../utils/optGenerator");
const { sendOTPEmail } = require("../utils/sendEmail");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.signUpController = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const user = req.body;
    const usermail = user.email;
    // Check if the email is unique
    const existingUser = await User.findOne({ email: usermail });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists. Please try another one",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    let refferal;
    if (user.referralName) {
      refferal = await User.findOne({ referralCode: user.referralName });
      if (!refferal) {
        return res.status(404).json({
          message: "Invalid referral code.",
          success: false,
        });
      }
    }
    const otp = generateOTP();
    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword, // Save the hashed password
      otp: otp,
      referredBy: refferal ? refferal._id : null,
      city: user.city,
      state: user.province,
      country: user.country,
      zipCode: user.postalCode,
      phone: user.phoneNumber,
      gender: user.gender,
      leagues: user.leagues.map((league) => {
        return {
          league: league.league,
          username: league.username,
          team: league.team,
        };
      }),
    });

    // Update the referral tree and tickets for direct referral
    const savedUser = await newUser.save();

    sendOTPEmail(user.email, otp);
    res.status(200).json(savedUser);
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).json({
      message: "Error registering user.",
      success: false,
    });
  }
};

exports.signInController = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);

  try {
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      return res
        .status(201)
        .json(responseObject({}, "Incorrect username or password.", true));
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
    console.log("checked password", checkPassword);
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
exports.useAffiliateController = async (req, res) => {
  try {
    const { affiliateCode } = req.body;

    // Find the current user based on a unique identifier (e.g., user ID)
    const userId = req.userId; // Assuming you have a way to identify the current user
    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    // Check if the current user has already used an affiliate code
    const currentUser = await User.findById(userId);
    if (currentUser.affiliateCode) {
      return res.status(400).json({
        message: "You have already used an affiliate code.",
        success: false,
      });
    }

    // Find the user associated with the provided affiliate code
    const affiliateUser = await User.findOne({ affiliateCode });

    if (!affiliateUser) {
      return res.status(404).json({
        message: "Invalid affiliate code.",
        success: false,
      });
    }

    // Update the affiliate user's balance
    affiliateUser.balance += 100;
    await affiliateUser.save();

    // Assign the affiliate code to the current user
    currentUser.affiliateCode = affiliateCode;
    await currentUser.save();

    res.status(200).json({
      message: "Affiliate code used successfully.",
      success: true,
    });
  } catch (err) {
    console.error("Error using affiliate code:", err);
    return res.status(500).json({
      message: "Error using affiliate code.",
      success: false,
    });
  }
};

exports.createCheckout = async (req, res) => {
  const { subscriptions } = req.body;

  try {
    const lineItems = subscriptions.map((subscription) => {
      return {
        price: subscription.priceId,
        quantity: subscription.quantity || 1,
      };
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "subscription",
      success_url: "https://ultimate-bragging-rights.vercel.app/success",
      cancel_url: "https://ultimate-bragging-rights.vercel.app/cancel",
    });

    // session ID
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Checkout session:", error);
    res.status(500).json({ error: "Failed to create Checkout session" });
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

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({
      message: "Error finding user.",
      success: false,
    });
  }
};
