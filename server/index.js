// server.js

const express = require("express");
const cors = require("cors");
const colors = require("colors")
const bodyParser = require("body-parser");
// const mysql = require('mysql');
const userRoutes = require("./routes/userRoutes");
const predictionRoutes = require("./routes/gamesRoutes");
const gameRoutes = require("./routes/games");
const nhlTeams = require("./routes/leagues/nhl");
const nflTeams = require("./routes/leagues/nfl");
const nbaTeams = require("./routes/leagues/nba");
const mlbTeams = require("./routes/leagues/mlb");
const gamesPlayed = require("./routes/gamesPlayed");
const weekRoutes = require("./routes/weeks");
const oddsRoutes = require("./routes/odds");

const mongoose = require("mongoose");
const moragn = require("morgan");
const router = require("./routes/restaurants");
const User = require("./models/user");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const clientURL = process.env.CLIENT_URL;

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected".bgYellow))
  .catch((err) => {
    console.log("Error in db connection".bgRed, err);
  });

// let corsOptions = {
//   origin: ["http://127.0.0.1:5173"] || [clientURL],
// };

app.use(moragn("dev"));
// app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Include routes
// app.use(routes);
app.use("/api/users", userRoutes);
app.use("/api/games", predictionRoutes);
app.use("/api/admin/games", gameRoutes);
app.use("/api/leagues/nhl", nhlTeams);
app.use("/api/leagues/nba", nbaTeams);
app.use("/api/leagues/nfl", nflTeams);
app.use("/api/leagues/mlb", mlbTeams);
app.use("/api/user/gamesplayed", gamesPlayed);
app.use("/api/restaurant", router);

app.use("/api/weeks", weekRoutes);

app.use("/api/odds", oddsRoutes);

app.get("/", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send(users);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen);
});
