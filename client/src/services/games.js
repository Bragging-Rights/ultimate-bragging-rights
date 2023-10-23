import api from "./api";

export const addGame = async (data) => {
  console.log(data);
  const response = await api.post(
    "api/admin/games/createGame",
    JSON.stringify(data)
  );

  return response;
};

export const getGames = async ({ queryKey }) => {
  const [_, date, leage] = queryKey;

  console.log("Games Fetched", date, leage);
  const response = await api.get(
    `api/admin/games/getAllGames/${leage}/${date}`
  );

  return response;
};

export const getGameById = async (id) => {
  const response = await api.get(`api/getGame/${id}`);

  return response;
};
