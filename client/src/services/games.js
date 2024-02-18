import api from "./api";

export const addGame = async (data) => {
  const response = await api.post(
    "api/admin/games/createGame",
    JSON.stringify(data)
  );

  return response;
};

export const updateGame = async (data) => {
  const response = await api.patch(
    `api/admin/games/updateGame/${data._id}`,
    JSON.stringify(data)
  );

  return response;
};

export const getGames = async ({ queryKey }) => {
  const [_, date, selectedLeague] = queryKey;
  const response = await api.get(
    `api/admin/games/getAllGames/${selectedLeague}/${date}`
  );

  return response;
};

export const getGameById = async (id) => {
  const response = await api.get(`api/getGame/${id}`);

  return response;
};

export const enterGameResults = async (gameId, results) => {
  const response = await api.put(
    `api/admin/games/enterResults/${gameId}`,
    JSON.stringify(results)
  );

  return response;
};
