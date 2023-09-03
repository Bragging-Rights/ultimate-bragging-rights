const db = require("../db/db");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const { responseObject } = require("../utils/responseObject");


exports.signUpController = async (req, res) => {
    const { firstName, lastName, email, password, gender, city, state, country, zipCode, phone } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const query = `INSERT INTO users (firstName, lastName, email, password, gender, city, state, country, zipCode, phone) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    db.query(query, [firstName, lastName, email, hash, gender, city, state, country, zipCode, phone], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({}, 'Error registering user.', true);
        }
        return res.status(200).json(responseObject({}, 'User registered successfully.', false));
    });
}

exports.signInController = async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            if (results.length > 0) {
                const findUser = results[0];
                if (findUser) {
                    const checkPassword = bcrypt.compareSync(password, findUser.password);
                    if (checkPassword) {
                        const payload = {
                            user: {
                                id: findUser.id,
                                role: findUser?.role
                            }
                        }
                        delete findUser["password"];
                        jwt.sign(payload, config.jwtSecret, (err, token) => {
                            if (err) res.status(400).json(responseObject({}, 'Jwt Error', true));
                            else {
                                findUser.token = token;
                                res.status(200).json(responseObject(
                                    findUser,
                                    'Logged In Successfully',
                                    false
                                ));
                            }
                        });
                    } else {
                        res.status(201).json(responseObject({}, 'Incorrect username or password.', true))
                    }
                }
                else {
                    res.status(201).json(responseObject({}, 'Incorrect username or password.', true))
                }
            } else {
                res.status(404).send(responseObject({}, 'No Data Found', false)); // No matching row found
            }
        }
    });
}

