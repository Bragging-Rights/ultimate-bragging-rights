const db = require("../db/db");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const { responseObject } = require("../utils/responseObject");
const generateOTP = require("../utils/optGenerator");
const sendEmail = require("../utils/sendEmail");


exports.signUpController = async (req, res) => {
    const { firstName, lastName, email, password, gender, city, state, country, zipCode, phone } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], (error, user) => {
        if (user && user?.length > 0) {
            res.status(200).json(responseObject({}, 'Email already exists. Please try another one', false));
        } else if (user.length === 0) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const otp = generateOTP();
            const query = `INSERT INTO users (firstName, lastName, email, password, gender, city, state, country, zipCode, phone, otp, emailVerified) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

            db.query(query, [firstName, lastName, email, hash, gender, city, state, country, zipCode, phone, otp, false], (err, results) => {
                console.log(results);
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json(responseObject({}, 'Error registering user.', true));
                }
                else {
                    const userId = results.insertId;
                    db.query('SELECT * FROM users WHERE id = ?', [userId], (er, rows) => {
                        if (er) {
                            console.log("Error");
                        } else {
                            if (rows && rows?.length > 0) {
                                const user = rows[0];
                                delete user["password"];
                                delete user["otp"];
                                delete user["emailVerified"];
                                res.status(200).json(responseObject(user, 'User registered successfully.', false));
                                sendEmail(email, "OTP", `<div><p>Your OTP is: <b>${otp}</b></p><p style = "margin-top: 100px">Bragging Rights</p></div>`);
                            } else {
                                console.log("User not found after insertion.")
                            }
                        }
                    })
                }
            });
        } else {
            return res.status(400).json(responseObject({}, 'An unknown error occured', true));
        }
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

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], (error, results) => {
        if (error) {
            res.status(404).json(responseObject({}, "Error in finding user", true))
        } else {
            const user = results[0];
            if (otp === user?.otp) {
                db.query("UPDATE users SET `otp` = ?, ")
                res.status(200).json(responseObject({}, "OTP verified!", false));
            } else {
                res.status(200).json(responseObject({}, "Invalid OTP", false));
            }
        }
    })

}