// server/routes/users.js
const express = require('express');
const router = express.Router();
const { signUpController, signInController, verifyOTP, useAffiliateController, createCheckout } = require('../controllers/userController');

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.post("/verify-otp", verifyOTP);
router.post("/useAffiliate",useAffiliateController);
router.post("/create-checkout",createCheckout);
// API endpoint for user registration
// router.post('/signup', (req, res) => {
//   const { firstName, lastName, email, password, /* ...other fields */ } = req.body;

//   // Insert the user data into the database
//   const query = `INSERT INTO users (_id, firstName, lastName, email, password, /* ...other fields */) 
//                  VALUES (?, ?, ?, ?, /* ...other values */);`;

//   pool.query(query, [1, firstName, lastName, email, password, /* ...other values */], (err, results) => {
//     console.log(err, results)
//     if (err) {
//       console.error('Error inserting user:', err);
//       return res.status(500).json({ message: 'Error registering user.' });
//     }

//     return res.status(200).json({ message: 'User registered successfully.' });
//   });
// });

module.exports = router;
