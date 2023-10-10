const nhl = require("../../models/leagues/nhl");

// Create a new team
const createTeam = async (req, res) => {
  try {
    const team = new nhl(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all teams
const getTeams = async (req, res) => {
  try {
    const teams = await nhl.find({});
    // console.log(teams);
    res.json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single team by ID
const getTeamById = async (req, res) => {
  try {
    const team = await nhl.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a team by ID
const updateTeamById = async (req, res) => {
  try {
    const team = await nhl.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    Object.assign(team, req.body);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a team by ID
const deleteTeamById = async (req, res) => {
  try {
    const team = await nhl.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    await team.remove();
    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
