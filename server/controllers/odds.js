const API = process.env.ODDS_API_URL;
const key = process.env.ODDS_API_KEY;
const axios = require("axios");

exports.getOdds = async (req, res) => {
  console.log(req.params.sport);
  console.log(API);
  console.log(key);
  const sport = req.params.sport || "icehockey_nhl";
  try {
    // const { data } = await axios.get(`${API}/odds`, {
    const { data } = await axios.get(
      `${process.env.ODDS_API_URL}/${sport}/odds/?apiKey=${process.env.ODDS_API_KEY}&bookmakers=betmgm&markets=h2h,spreads,totals&oddsFormat=decimal`
    );
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};
