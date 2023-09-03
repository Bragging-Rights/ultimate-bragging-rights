// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const config = require('./config/keys');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: config.user,
//   password: config.password,
//   database: config.database,
// });

// Include routes
// app.use(routes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
