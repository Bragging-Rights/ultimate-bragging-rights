const db = require("../db/db");
var bcrypt = require('bcryptjs');


exports.signUpController = async (req, res) => {
    const { firstName, lastName, email, password, gender, city, state, country, zipCode, phone } = req.body;
    console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const query = `INSERT INTO users (firstName, lastName, email, password, gender, city, state, country, zipCode, phone) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    db.query(query, [firstName, lastName, email, hash, gender, city, state, country, zipCode, phone], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Error registering user.' });
        }

        return res.status(200).json({ message: 'User registered successfully.' });
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
                                _id: findUser._id,
                                role: findUser?.role
                            }
                        }
                        jwt.sign(payload, config.jwtSecret, (err, token) => {
                            if (err) res.status(400).json({ errorMessage: 'Jwt Error' })
                            const {
                                _id,
                                role,
                                username,
                                email,
                                DudoCode,
                                Nookpoints,
                            } = findUser;
                            res.status(200).json({
                                _id,
                                role,
                                username,
                                email,
                                DudoCode,
                                Nookpoints,
                                token,
                                successMessage: 'Logged In Successfully',

                            });
                        });
                    } else {
                        res.status(201).json({ errorMessage: 'Incorrect username or password.' })
                    }
                }
                else {
                    res.status(201).json({ errorMessage: 'Incorrect username or password.' })
                }
            } else {
                res.status(404).send("No data found"); // No matching row found
            }
        }
    });
}