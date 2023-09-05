import axios from 'axios';

const BASE_URL =   'https://bragging-rights-app-abab3385dc82.herokuapp.com';
const config = {
  headers: {
    'Content-type': 'text/json',
  }
};

const api = {
  get: async (url) => {
    return await axios.get(
      `${BASE_URL}${url}`,
      config
    );
  },

  post: async (url, data) => {
    return await axios.post(
      `${BASE_URL}${url}`,
      data,
      config
    );
  },
  put: async (url, data) => {
    return await axios.put(
      `${BASE_URL}${url}`,
      data,
      config
    );
  },
  delete: async (url, data) => {
    return await axios.delete(
      `${BASE_URL}${url}`
    );
  }
};

export default api;