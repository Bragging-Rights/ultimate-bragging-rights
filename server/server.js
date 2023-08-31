// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const routes = require('./routes/routes.js');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Rais5793@',
  database: 'test',
});

// Include routes
// app.use(routes);
app.use('/api/users', userRoutes);

app.get("/", async (req, res) => {
  // res.send("Server Running...")
  const query = "SELECT * FROM books";
  pool.query(query, (err, data) => {
    console.log(err, data)
    if (err) return res.json("Error")
    return res.send(data)
  })
})

app.get("/books", async (req, res) => {
  // const query = "SELECT * FROM books";
  // pool.query(query, (err, data) => {
  //   if (err) return res.json("Error")
  //   return res.send(data)
  // })

  res.send("Sent")
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
