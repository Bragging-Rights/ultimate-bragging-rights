const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

// Middleware to check if user is admin
const checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this operation" });
  }
  next();
};

module.exports = { authenticateUser, checkAdmin }
