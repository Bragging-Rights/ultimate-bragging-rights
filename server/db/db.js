// db.js
const mysql = require('mysql');
const config = require('../config/keys');

// Create a MySQL pool for handling connections
let pool;
if (process.env.JAWSDB_URL) {
  pool = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  });
}

module.exports = pool;
