import api from "./api";

export const addGame = async (data) => {
  const response = await api.post("api/games/create-game", data);

  return response;
};

export const getGames = async () => {
  const response = await api.get("api/games");

  return response;
};

export const getGameById = async (id) => {
  const response = await api.get(`api/getGame/${id}`);

  return response;
};
