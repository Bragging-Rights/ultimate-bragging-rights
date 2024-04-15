const Week = require("../models/weeks");

// Create a new week
exports.createWeek = async (req, res) => {
  const weeks = Array.isArray(req.body) ? req.body : [req.body];

  const savedWeeks = [];
  const errors = [];

  for (const weekData of weeks) {
    const { league, season, startDate, endDate } = weekData;

    // Check if a week with the same league and season already exists
    const existingWeek = await Week.findOne({ league, season });
    if (existingWeek) {
      errors.push({
        error: "A week with this league and season already exists.",
        week: weekData,
      });
      continue;
    }

    const week = new Week({
      league,
      season,
      startDate,
      endDate,
    });

    try {
      const savedWeek = await week.save();
      savedWeeks.push(savedWeek);
    } catch (err) {
      console.error(err);
      errors.push({ error: err.toString(), week: weekData });
    }
  }

  if (errors.length > 0) {
    return res.status(500).json({ errors });
  }

  res.json(savedWeeks);
};

// Get all weeks
exports.getWeeks = async (req, res) => {
  const weeks = await Week.find();
  res.json(weeks);
};

// Get a week by id
exports.getWeek = async (req, res) => {
  const week = await Week.findById(req.params.id);
  if (!week) return res.status(404).json({ error: "Week not found." });
  res.json(week);
};

// Update a week by id
exports.updateWeek = async (req, res) => {
  const { league, season, startDate, endDate } = req.body;
  const week = await Week.findById(req.params.id);
  if (!week) return res.status(404).json({ error: "Week not found." });

  week.league = league;
  week.season = season;
  week.startDate = startDate;
  week.endDate = endDate;

  try {
    const updatedWeek = await week.save();
    res.json(updatedWeek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a week by id
exports.deleteWeek = async (req, res) => {
  const week = await Week.findById(req.params.id);
  if (!week) return res.status(404).json({ error: "Week not found." });

  try {
    await week.remove();
    res.json({ message: "Week deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a week by league, season, and year
exports.getWeekByLeagueSeasonYear = async (req, res) => {
  const { league, season, year } = req.params;

  const week = await Week.findOne({ league, season, year });
  if (!week) return res.status(404).json({ error: "Week not found." });

  res.json(week);
};
