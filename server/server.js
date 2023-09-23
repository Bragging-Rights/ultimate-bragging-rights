// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mysql = require('mysql');
const config = require("./config/keys");
const userRoutes = require("./routes/userRoutes");
const predictionRoutes = require("./routes/predictionsRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const mongoose = require("mongoose");
const moragn = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const clientURL = process.env.CLIENT_URL;

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"));

let corsOptions = {
  origin: ["http://localhost:3000"] || [clientURL],
};

app.use(moragn("dev"));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: config.user,
//   password: config.password,
//   database: config.database,
// });

// db.ge((err, con) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Connected Successfully")
//   }
// })

// Include routes
// app.use(routes);
app.use("/api/users", userRoutes);
app.use("/api/games", predictionRoutes);

app.get("/", async (req, res) => {
  res.send("Server is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/********* Auth *******/
/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user.
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: An unknown error occurred.
 *       500:
 *         description: Error registering user.
 */

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - User
 *     summary: Log in a user.
 *     description: Log in a user with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged In Successfully.
 *       201:
 *         description: Incorrect username or password.
 *       400:
 *         description: Jwt Error.
 *       404:
 *         description: Error Logging in.
 *       500:
 *         description: An unknown error occurred.
 */

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     tags:
 *       - User
 *     summary: Verify OTP.
 *     description: Verify OTP for a user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified!
 *       404:
 *         description: Error in finding user.
 *       500:
 *         description: An unknown error occurred.
 */

/***************************************************** Predictions *************************************************************/

/**
 * @swagger
 * /games/leagues:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get a list of leagues.
 *     description: Retrieve a list of leagues from the database.
 *     responses:
 *       200:
 *         description: Data Fetched Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/League'
 *       400:
 *         description: An unknown error occurred.
 */

/**
 * @swagger
 * /games/seasons:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get a list of seasons.
 *     description: Retrieve a list of seasons from the database.
 *     responses:
 *       200:
 *         description: Data Fetched Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Season'
 *       400:
 *         description: An unknown error occurred.
 */

/**
 * @swagger
 * /games:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get a list of games.
 *     description: Retrieve a list of games from the database (limited to the first 1000).
 *     responses:
 *       200:
 *         description: Data Fetched Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       400:
 *         description: An unknown error occurred.
 */

/**
 * @swagger
 * /games/add-prediction:
 *   post:
 *     summary: Create a game score prediction.
 *     tags:
 *       - Games
 *     requestBody:
 *       description: Prediction data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               gameid:
 *                 type: integer
 *               eldate:
 *                 type: string
 *                 format: date
 *               total_tickets:
 *                 type: integer
 *               visitor_team:
 *                 type: string
 *               home_team:
 *                 type: string
 *               visitor_pick:
 *                 type: integer
 *               home_pick:
 *                 type: integer
 *               GameEndingPrediction:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created prediction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prediction'
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /games/update-actual-scores:
 *   put:
 *     summary: Update actual scores and calculate points for all predictions.
 *     tags:
 *       - Games
 *     requestBody:
 *       description: Actual scores data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitor_score:
 *                 type: integer
 *               home_score:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Predictions updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     examples:
 *       '200':
 *         summary: Predictions updated successfully.
 *         value:
 *           message: Predictions updated successfully
 *       '500':
 *         summary: Internal Server Error.
 *         value:
 *           error: Internal Server Error
 */
