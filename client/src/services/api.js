import axios from "axios";
import { BACKEND_URL } from "../../config";

const BASE_URL = BACKEND_URL || "http://localhost:8000/";
const config = {
  headers: {
    Accept: "application/json", // Accept JSON response
    "Content-Type": "application/json", // Send JSON data in the request body
  },
};

const api = {
  get: async (url) => {
    console.log(`${BASE_URL}${url}`);
    return await axios.get(`${BASE_URL}${url}`, config);
  },

  post: async (url, data) => {
    console.log(`${BASE_URL}${url}`);
    return await axios.post(`${BASE_URL}${url}`, data, config);
  },
  put: async (url, data) => {
    console.log(`${BASE_URL}${url}`);
    return await axios.put(`${BASE_URL}${url}`, data, config);
  },
  delete: async (url, data) => {
    return await axios.delete(`${BASE_URL}${url}`);
  },
};

export default api;
