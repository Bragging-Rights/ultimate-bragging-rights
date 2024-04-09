import api from "./api";

// Get all odds
export const getOdds = async (sport) => {
  const response = await api.get(`api/odds/getbySport/${sport}`);
  return response;
};
