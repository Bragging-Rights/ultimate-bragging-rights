const SeasonDetails = require("../models/seasonDetails");

// Controller to create a new season detail
exports.createSeasonDetail = async (req, res) => {
  try {
    const { startDate, endDate, league, season } = req.body;

    // Validate the input
    if (!startDate || !endDate || !league || !season) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new season detail
    const newSeasonDetail = new SeasonDetails({
      startDate,
      endDate,
      league,
      season,
    });

    // Save the season detail to the database
    const savedSeasonDetail = await newSeasonDetail.save();

    // Return the saved season detail
    res.status(201).json(savedSeasonDetail);
  } catch (error) {
    // Handle possible errors
    res
      .status(500)
      .json({ message: "Error creating season detail", error: error.message });
  }
};

// Controller to get all season details
exports.getAllSeasonDetails = async (req, res) => {
  try {
    const seasonDetails = await SeasonDetails.find();
    res.status(200).json(seasonDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching season details", error: error.message });
  }
};

// Controller to get a season detail by ID
exports.getSeasonDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const seasonDetail = await SeasonDetails.findById(id);

    if (!seasonDetail) {
      return res.status(404).json({ message: "Season detail not found" });
    }

    res.status(200).json(seasonDetail);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching season detail", error: error.message });
  }
};

// Controller to update a season detail by ID
exports.updateSeasonDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, league, season } = req.body;

    // Validate the input
    if (!startDate || !endDate || !league || !season) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedSeasonDetail = await SeasonDetails.findByIdAndUpdate(
      id,
      { startDate, endDate, league, season },
      { new: true }
    );

    if (!updatedSeasonDetail) {
      return res.status(404).json({ message: "Season detail not found" });
    }

    res.status(200).json(updatedSeasonDetail);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating season detail", error: error.message });
  }
};

// Controller to delete a season detail by ID
exports.deleteSeasonDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeasonDetail = await SeasonDetails.findByIdAndDelete(id);

    if (!deletedSeasonDetail) {
      return res.status(404).json({ message: "Season detail not found" });
    }

    res.status(200).json({ message: "Season detail deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting season detail", error: error.message });
  }
};
