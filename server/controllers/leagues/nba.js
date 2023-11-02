const Nba = require("../../models/leagues/nba");

// Create
exports.createTeam = async (req, res) => {
  const newTeam = new Nba(req.body);
  try {
    const team = await newTeam.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read
exports.getTeams = async (req, res) => {
  try {
    const teams = await Nba.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await Nba.findById(req.params.id);
    if (team == null) {
      return res.status(404).json({ message: "Cannot find team" });
    }
    res.json(team);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateTeam = async (req, res) => {
  try {
    const team = await Nba.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) {
      return res.status(404).json({ message: "Cannot find team" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Nba.findByIdAndRemove(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Cannot find team" });
    }
    res.json({ message: "Deleted team" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
