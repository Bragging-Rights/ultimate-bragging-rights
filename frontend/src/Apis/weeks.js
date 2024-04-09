import api from "./api";

// Create a new week
export const createWeek = async (week) => {
  const response = await api.post("api/weeks", JSON.stringify(week));
  return response;
};

// Get all weeks
export const getWeeks = async () => {
  const response = await api.get("api/weeks");
  return response;
};

// Get a week by id
export const getWeek = async (id) => {
  const response = await api.get(`api/weeks/${id}`);
  return response;
};

// Update a week by id
export const updateWeek = async (id, week) => {
  const response = await api.put(`api/weeks/${id}`, JSON.stringify(week));
  return response;
};

// Delete a week by id
export const deleteWeek = async (id) => {
  const response = await api.delete(`api/weeks/${id}`);
  return response;
};

export const getWeekByLeagueSeasonYear = async (league, season, year) => {
  const response = await api.get(`api/weeks/${league}/${season}/${year}`);
  return response;
};
