const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const { responseObject } = require('../utils/responseObject');

AuthenticatorJWT = (req, res, next) => {
    const tokenWithBearer = req.headers?.authorization;
    const token = tokenWithBearer?.split(' ')[1];
    if (!token) {
        res.status(404).json(responseObject({}, 'No token. Access Denied', false));
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(400).json(responseObject({}, 'You cannot access this route due to invalid token.', true));
    }
}

module.exports = { AuthenticatorJWT };