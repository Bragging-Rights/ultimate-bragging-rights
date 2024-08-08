import api from "./api";

// API to create a new season detail
export const createSeasonDetail = async (seasonDetail) => {
  const response = await api.post("api/season-details", seasonDetail);
  return response.data;
};

// API to get all season details
export const getAllSeasonDetails = async () => {
  const response = await api.get("api/season-details");
  return response.data;
};

// API to get a season detail by ID
export const getSeasonDetailById = async (id) => {
  const response = await api.get(`api/season-details/${id}`);
  return response.data;
};

// API to update a season detail by ID
export const updateSeasonDetailById = async (id, seasonDetail) => {
  const response = await api.put(`api/season-details/${id}`, seasonDetail);
  return response.data;
};

// API to delete a season detail by ID
export const deleteSeasonDetailById = async (id) => {
  const response = await api.delete(`api/season-details/${id}`);
  return response.data;
};
