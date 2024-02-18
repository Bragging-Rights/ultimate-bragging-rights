// Import the required modules
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");
const { responseObject } = require("../utils/responseObject");

// Define a middleware function to authenticate JWT tokens
AuthenticatorJWT = (req, res, next) => {
  // Get the token from the Authorization header
  const tokenWithBearer = req.headers?.authorization;
  const token = tokenWithBearer?.split(" ")[1];

  // If no token is present, return an error response
  if (!token) {
    res.status(404).json(responseObject({}, "No token. Access Denied", false));
  }

  try {
    // Verify the token using the JWT secret key
    const decoded = jwt.verify(token, jwtSecret);

    // If the token is valid, set the user property on the request object and call the next middleware
    req.user = decoded.user;
    next();
  } catch (error) {
    // If the token is invalid, return an error response
    res
      .status(400)
      .json(
        responseObject(
          {},
          "You cannot access this route due to invalid token.",
          true
        )
      );
  }
};

// Export the middleware function
module.exports = { AuthenticatorJWT };
