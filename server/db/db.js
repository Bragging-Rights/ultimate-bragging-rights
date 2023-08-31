// db.js
const mysql = require('mysql');

// Create a MySQL pool for handling connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Rais5793@',
  database: 'test',
});

module.exports = pool;
