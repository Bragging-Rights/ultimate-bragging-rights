const Nfl = require("../../models/leagues/nfl");

// Create
const createTeam = async (req, res) => {
  const newTeam = new Nfl(req.body);
  try {
    const team = await newTeam.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read
// const getTeams = async (req, res) => {
//   try {
//     const teams = await Nfl.find();
//     res.json(teams);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getTeams = async (req, res) => {
  try {
    let teams = await Nfl.find({}).sort({ displayName: 1 });
    res.json(teams);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Nfl.findById(req.params.id);
    if (team == null) {
      return res.status(404).json({ message: "Cannot find team" });
    }
    res.json(team);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update
const updateTeam = async (req, res) => {
  try {
    const team = await Nfl.findByIdAndUpdate(req.params.id, req.body, {
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
const deleteTeam = async (req, res) => {
  try {
    const team = await Nfl.findByIdAndRemove(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Cannot find team" });
    }
    res.json({ message: "Deleted team" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
