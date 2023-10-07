// server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mysql = require('mysql');
const userRoutes = require("./routes/userRoutes");
const predictionRoutes = require("./routes/gamesRoutes");
const gameRoutes = require("./routes/games");
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
  .then(() => console.log("DB Connected")).catch(err => {
    console.log("Error in db connection", err)
  })

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
app.use("/api/admin/games", gameRoutes);

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
 * /games-played:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get a list of games played.
 *     description: Retrieve a list of games played from the database (limited to the first 1000).
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
 *               email:
 *                 type: string
 *               id:
 *                 type: string
 *               ip:
 *                 type: string
 *               gamedate:
 *                 type: string
 *               sports:
 *                 type: string
 *               league:
 *                 type: string
 *               gameid:
 *                 type: integer
 *               visitor:
 *                 type: string
 *               home:
 *                 type: string
 *               pick_visitor:
 *                 type: integer
 *               pick_home:
 *                 type: integer
 *               GameEndingPrediction:
 *                 type: string
 *               balanced:
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
 * /games/league-games:
 *   post:
 *     summary: Get games of a specific league.
 *     tags:
 *       - Games
 *     requestBody:
 *       description: Get games of a specific league.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               league_name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully fetched games of a specific league.
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


/**
 * @swagger
 *  /games/results:
 *   get:
 *     summary: Get Results - Retrieve game results with pagination.
 *     description: Retrieve a paginated list of game results.
 *     tags:
 *       - Results
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default is 1).
 *     responses:
 *       '200':
 *         description: A successful response with paginated game results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GameResult'  # Define your schema
 *                 message:
 *                   type: string
 *                 error:
 *                   type: boolean
 *       '400':
 *         description: Bad request with error details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: boolean
 */




/************************* Games *********************/

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the game.
 *         gamedate:
 *           type: string
 *           description: The date of the game in string format (e.g., "2023-10-10").
 *         day:
 *           type: string
 *           description: The day of the week for the game (e.g., "Monday").
 *         date:
 *           type: string
 *           description: The date of the game in string format (e.g., "10").
 *         month:
 *           type: string
 *           description: The month of the game (e.g., "October").
 *         time:
 *           type: string
 *           description: The time of the game (e.g., "10:00 AM").
 *         cutofftime:
 *           type: string
 *           description: The cutoff time for the game (e.g., "9:30 AM").
 *         gametime:
 *           type: string
 *           description: The game time (e.g., "Regular").
 *         visitor:
 *           type: string
 *           description: The name of the visitor team.
 *         home:
 *           type: string
 *           description: The name of the home team.
 *         seasonflag:
 *           type: string
 *           description: The season flag.
 *         lock1:
 *           type: string
 *           description: The lock status.
 *         finalscorevisitor:
 *           type: string
 *           description: The final score of the visitor team.
 *         sports:
 *           type: string
 *           description: The sports category.
 *         league:
 *           type: string
 *           description: The league of the game.
 *         finalscorehome:
 *           type: string
 *           description: The final score of the home team.
 *         vagainstspreadpoints:
 *           type: string
 *           description: The points against the spread for the visitor team.
 *         hagagnstspreadpoints:
 *           type: string
 *           description: The points against the spread for the home team.
 *         voverunderrate:
 *           type: string
 *           description: The over/under rate for the visitor team.
 *         hoverunderrate:
 *           type: string
 *           description: The over/under rate for the home team.
 *         gameended:
 *           type: string
 *           description: The game ended status.
 *         vpickscorepoints:
 *           type: string
 *           description: The pick score points for the visitor team.
 *         hpickscorepoints:
 *           type: string
 *           description: The pick score points for the home team.
 *         vpickwinnerpoints:
 *           type: string
 *           description: The pick winner points for the visitor team.
 *         hpickwinnerppoints:
 *           type: string
 *           description: The pick winner points for the home team.
 *         vagainstthespreadrate:
 *           type: string
 *           description: The against the spread rate for the visitor team.
 *         hagainstthesreadrate:
 *           type: string
 *           description: The against the spread rate for the home team.
 *         hoverunderpoints:
 *           type: string
 *           description: The over/under points for the home team.
 *         voverunderpoints:
 *           type: string
 *           description: The over/under points for the home team.
 *         "v-ml":
 *           type: string
 *           description: The moneyline for the visitor team.
 *         "h-ml":
 *           type: string
 *           description: The moneyline for the home team.
 *         "v-sprd":
 *           type: string
 *           description: The spread for the visitor team.
 *         "h-sprd":
 *           type: string
 *           description: The spread for the home team.
 *         "v-sprd-odds":
 *           type: string
 *           description: The spread odds for the visitor team.
 *         "h-sprd-odds":
 *           type: string
 *           description: The spread odds for the home team.
 *         "v-ou":
 *           type: string
 *           description: The over/under for the visitor team.
 *         "h-ou":
 *           type: string
 *           description: The over/under for the home team.
 *         "v-ou-odds":
 *           type: string
 *           description: The over/under odds for the visitor team.
 *         "h-ou-odds":
 *           type: string
 *           description: The over/under odds for the home team.
 *         winner:
 *           type: string
 *           description: The winner of the game.
 *         ptsregualtion:
 *           type: string
 *           description: The points in regulation time.
 *         ptsovertime:
 *           type: string
 *           description: The points in overtime.
 *         ptsshootout:
 *           type: string
 *           description: The points in a shootout.
 *         bothpickscore:
 *           type: string
 *           description: The score picked by both teams.
 *         scoreentered:
 *           type: string
 *           description: The score entered status.
 *         PredictionDateTimeStarting:
 *           type: string
 *           description: The prediction date and time starting.
 *         eldatetime:
 *           type: string
 *           description: The EL date and time.
 *         oddsset:
 *           type: string
 *           description: The odds set status.
 *         oddssetdate:
 *           type: string
 *           description: The odds set date.
 *         oddssettime:
 *           type: string
 *           description: The odds set time.
 *         postponeflag:
 *           type: string
 *           description: The postpone flag.
 *         orggamedate:
 *           type: string
 *           description: The original game date.
 *         suspended:
 *           type: string
 *           description: The suspended status.
 *         vresult:
 *           type: string
 *           description: The result for the visitor team.
 *         hresult:
 *           type: string
 *           description: The result for the home team.
 *         nflweek:
 *           type: string
 *           description: The NFL week.
 *         conference:
 *           type: string
 *           description: The conference of the game.
 *         devision:
 *           type: string
 *           description: The division of the game.
 *         timestamp:
 *           type: string
 *           description: The timestamp of the game.
 * security:
 *   - BearerAuth: []  # Indicates that Bearer token is required in headers
 * paths:
 *   /admin/games/createGame:
 *     post:
 *       summary: Create a new game.
 *       tags:
 *         - admin
 *       security:
 *         - BearerAuth: []  # Requires Bearer token in headers
 *       requestBody:
 *         description: Game data to be created.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       responses:
 *         200:
 *           description: Game created successfully.
 *         400:
 *           description: Bad request.
 */



/**
 * @swagger
 * /admin/games/getAllGames:
 *   get:
 *     summary: Get all games
 *     tags:
 *       - admin
 *     responses:
 *       200:
 *         description: Successful response with a list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Internal server error.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for paginated results.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of items to return per page.
 */

/**
 * @swagger
 * /admin/games/getGame:{id}:
 *   get:
 *     summary: Get a single game
 *     tags:
 *       - admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with the game details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/games/deleteGame:{id}:
 *   delete:
 *     summary: Delete a game
 *     tags:
 *       - admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game to delete.
 *     responses:
 *       200:
 *         description: Game deleted successfully.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/games/updateGame:{id}:
 *   patch:
 *     summary: Update a game
 *     tags:
 *       - admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game to update.
 *     requestBody:
 *       description: Updated game data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game' # Reference to your Game schema
 *     responses:
 *       200:
 *         description: Game updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/games/teams/{league}:
 *   get:
 *     summary: Get teams of a specific league.
 *     tags:
 *       - admin
 *     parameters:
 *       - in: path
 *         name: league
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the league.
 *     responses:
 *       '200':
 *         description: Successful response. Returns teams' data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       displayName:
 *                         type: string
 *                       id:
 *                         type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: boolean
 *       '400':
 *         description: Bad request. An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 */