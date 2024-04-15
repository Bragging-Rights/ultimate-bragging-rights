const express=require("express");
const { restaurantSignUpController } = require("../controllers/restaurant");

const router = express.Router();

router.post("/signUpRestaurant",restaurantSignUpController);
router.get("getAllRestaurant",restaurantSignUpController);

module.exports = router;

