const API = process.env.ODDS_API_URL;
const key = process.env.ODDS_API_KEY;
const axios = require("axios");

exports.getOdds = async (req, res) => {
  const { sport } = req.params || americanfootball_nfl;
  try {
    // const { data } = await axios.get(`${API}/odds`, {
    const { data } = await axios.get(
      `${API}/${sport}/odds/?apiKey=${key}&bookmakers=betmgm&markets=h2h,spreads&oddsFormat=american`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
