const Rewards = require("../models/rewards");

// Controller function to create a new rewards record
const createRewards = async (req, res) => {
  try {
    const rewards = new Rewards(req.body);
    await rewards.save();
    res.status(201).json(rewards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to get all rewards records
const getRewards = async (req, res) => {
  try {
    const rewards = await Rewards.find();
    res.status(200).json(rewards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to get a single rewards record by ID
const getRewardsById = async (req, res) => {
  try {
    const rewards = await Rewards.findById(req.params.id);
    if (!rewards) {
      return res.status(404).json({ error: "Rewards not found" });
    }
    res.status(200).json(rewards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to update a rewards record by ID
const updateRewardsById = async (req, res) => {
  try {
    const rewards = await Rewards.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rewards) {
      return res.status(404).json({ error: "Rewards not found" });
    }
    res.status(200).json(rewards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete a rewards record by ID
const deleteRewardsById = async (req, res) => {
  try {
    const rewards = await Rewards.findByIdAndDelete(req.params.id);
    if (!rewards) {
      return res.status(404).json({ error: "Rewards not found" });
    }
    res.status(200).json({ message: "Rewards deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export the controller functions so that they can be used in other parts of the application
module.exports = {
  createRewards,
  getRewards,
  getRewardsById,
  updateRewardsById,
  deleteRewardsById,
};
