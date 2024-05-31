const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const { responseObject } = require("../utils/responseObject");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.signUpController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, username, referralCode } =
      req.body;

    // Check if the email is unique
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists. Please try another one",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Save the hashed password
      username,
    });

    // Update the referral tree and tickets for direct referral
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        newUser.referredBy = referrer._id;
        referrer.directReferrals.push(newUser._id);
        referrer.tickets += 2; // Add 2 tickets for direct referral
        await referrer.save();
      }
    }

    // Save the user
    const savedUser = await newUser.save();

    // Update the referral tree and tickets for indirect referral
    if (savedUser.referredBy) {
      const indirectReferrer = await User.findById(savedUser.referredBy);
      if (indirectReferrer) {
        // Check if the indirect referrer has its own referrer
        const grandReferrer = await User.findById(indirectReferrer.referredBy);
        if (grandReferrer) {
          grandReferrer.indirectReferrals.push(savedUser._id);
          grandReferrer.tickets += 1; // Add 1 ticket for indirect referral
          await grandReferrer.save();
        }
      }
    }

    res.status(200).json(savedUser);
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).json({
      message: "Error registering user.",
      success: false,
    });
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

exports.signInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
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

// gender: data.gender, //
// city: data.city, //
// state: data.province, //
// country: data.country, //
// zipCode: data.postalCode,
// phone: data.phoneNumber,
// league: data.leagues[0]?.league || null,
// username: data.leagues[0]?.username || null,
// team: data.leagues[0]?.team || null,
// league1: data.leagues[1]?.league || null,
// username1: data.leagues[1]?.username || null,
// team1: data.leagues[1]?.team || null,
// league2: data.leagues[2]?.league || null,
// username2: data.leagues[2]?.username || null,
// team2: data.leagues[2]?.team || null,
// league3: data.leagues[3]?.league || null,
// username3: data.leagues[3]?.username || null,
// team3: data.leagues[3]?.team || null,
// referralName: data.referralName,

// Check if the username is unique for each league
// const leagues = [
//   data.leagues[0]?.league || null,
//   data.leagues[1]?.league || null,
//   data.leagues[2]?.league || null,
//   data.leagues[3]?.league || null,
// ];
// const usernames = [
//   data.leagues[0]?.team || null,
//   data.leagues[1]?.team || null,
//   data.leagues[2]?.team || null,
//   data.leagues[3]?.team || null,
// ];

// for (let i = 0; i < leagues.length; i++) {
//   if (
//     usernames != null &&
//     usernames[i] != null &&
//     leagues != null &&
//     leagues[i] != null
//   ) {
//     try {
//       const existingUser = await User.findOne({
//         username: usernames[i],
//         league: leagues[i],
//       });
//       if (existingUser) {
//         return res
//           .status(409)
//           .json(
//             responseObject(
//               {},
//               `Username ${usernames[i]} already exists in league ${leagues[i]}. Please try another one`,
//               false
//             )
//           );
//       }
//     } catch (error) {
//       console.error("Error finding user:", error);
//       return res
//         .status(500)
//         .json(responseObject({}, "Error registering user.", true));
//     }
//   }
// }

// const userId = savedUser._id;

// const foundUser = await User.findById(userId);
// if (foundUser) {
//   const user = foundUser.toObject();
//   delete user.password;

//   delete user.otp;
//   delete user.isVerified;
//   res
//     .status(200)
//     .json(responseObject(user, "User registered successfully.", false));

//   sendEmail(
//     email,
//     "OTP",
//     `<div><p>Your OTP is: <b>${otp}</b></p><p style = "margin-top: 100px">Bragging Rights</p></div>`
//   );
// } else {
//   console.log("User not found after insertion.");
// }
// const salt = await bcrypt.genSalt(10);
// const hash = await bcrypt.hash(user.password, salt);

//otp
// const otp = generateOTP();
// user.otp = otp;
// user.isVerified = false;
// user.password = hash;

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
