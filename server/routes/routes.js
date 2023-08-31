// routes.js
const express = require('express');
const { signUpController } = require('../controllers/userController');
const pool = require('../db/db');

const router = express.Router();


// Route to get teams based on selected leagues
router.get('/api/teams', (req, res) => {
  const { leagues } = req.query;
  const leagueArray = leagues.split(',');

  const query = 'SELECT * FROM teams WHERE league IN (?)';
  pool.query(query, [leagueArray], (err, results) => {
    if (err) {
      console.error('Error fetching teams:', err);
      return res.status(500).json({ error: 'An error occurred while fetching teams.' });
    }

    return res.json(results);
  });
});

// Route to get teams based on selected leagues
router.get('/api/teams', (req, res) => {
  // ... (existing code)
});

// Route for user signup
// router.post('/api/signup', (req, res) => {
//   const formData = req.body;

//   const query = 'INSERT INTO user SET ?';
//   pool.query(query, formData, (err, results) => {
//     if (err) {
//       console.error('Error inserting user:', err);
//       return res.status(500).json({ error: 'An error occurred while signing up.' });
//     }

//     return res.json({ success: true, message: 'User registered successfully' });
//   });
// });

module.exports = router;

