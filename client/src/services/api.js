// api.js

import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_APP_BACKEND_URL // For production
    : import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8000/"; // For development fallback

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const api = {
  get: async (url) => {
    return await axios.get(`${BASE_URL}${url}`, config);
  },

  post: async (url, data) => {
    return await axios.post(`${BASE_URL}${url}`, data, config);
  },

  patch: async (url, data) => {
    return await axios.patch(`${BASE_URL}${url}`, data, config);
  },

  put: async (url, data) => {
    return await axios.put(`${BASE_URL}${url}`, data, config);
  },

  delete: async (url, data) => {
    return await axios.delete(`${BASE_URL}${url}`);
  },
};

export default api;
