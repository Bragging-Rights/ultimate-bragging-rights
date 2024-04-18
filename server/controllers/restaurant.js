const restaurantModel = require("../models/restaurant");

const restaurantSignUpController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      jobTitle,
      category,
      company,
      mainLocation,
      password,
    } = req.body;

    const requiredFields = [
      firstName,
      lastName,
      email,
      phoneNumber,
      category,
      company,
      mainLocation,
      password,
    ];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingRestaurant = await restaurantModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ error: "Email or phone number already exists." });
    }

    // Create new restaurant instance
    const newRestaurant = new restaurantModel({
      user: {
        firstName,
        lastName,
        email,
        phoneNumber,
        jobTitle,
        password,
      },
      category,
      company,
      mainLocation,
    });

    await newRestaurant.save();

    res.json(newRestaurant);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBranchController = async (req, res) => {
  try {
    const { restaurantId, branchData } = req.body;
    if (!restaurantId || !branchData) {
      return res
        .status(400)
        .json({ error: "restaurantId and branchData are required." });
    }

    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    const { branchCode, mainAddress, manager } = branchData;
    if (!branchCode || !mainAddress || !manager) {
      return res
        .status(400)
        .json({ error: "All required fields in branchData are necessary." });
    }

    restaurant.branches.push(branchData);

    await restaurant.save();

    res.json(restaurant);
  } catch (error) {
    console.error("Error adding branch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addPoolsController = async (req, res) => {
  try {
    const { restaurantId, branchId, poolsData } = req.body;

    if (!restaurantId || !branchId || !poolsData) {
      return res
        .status(400)
        .json({ error: "restaurantId, branchId, and poolsData are required." });
    }

    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    const branch = restaurant.branches.find(
      (branch) => branch._id.toString() === branchId
    );
    if (!branch) {
      return res.status(404).json({ error: "Branch not found." });
    }

    branch.pools.push(...poolsData);

    await restaurant.save();

    res.json(restaurant);
  } catch (error) {

    console.error("Error adding pools:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  restaurantSignUpController,
  getAllRestaurantController,
  addBranchController,
  addPoolsController,
};
