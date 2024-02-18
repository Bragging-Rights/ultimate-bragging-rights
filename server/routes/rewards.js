const express = require("express");
const router = express.Router();
const {
  createRewards,
  getRewards,
  getRewardsById,
  updateRewardsById,
  deleteRewardsById,
} = require("../controllers/rewards");

// Route to create a new rewards record
router.post("/rewards", createRewards);

// Route to get all rewards records
router.get("/rewards", getRewards);

// Route to get a single rewards record by ID
router.get("/rewards/:id", getRewardsById);

// Route to update a single rewards record by ID
router.put("/rewards/:id", updateRewardsById);

// Route to delete a single rewards record by ID
router.delete("/rewards/:id", deleteRewardsById);

// Export the router so that it can be used in other parts of the application
module.exports = router;
