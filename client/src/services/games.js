import api from "./api";

export const addGame = async (data) => {
  console.log(data);
  const response = await api.post(
    "api/admin/games/createGame",
    JSON.stringify(data)
  );

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
