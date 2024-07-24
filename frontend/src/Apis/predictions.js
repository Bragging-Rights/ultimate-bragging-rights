import api from "./api";

export const addPrediction = async (data) => {
  console.log("data", data);
  const response = await api.post(
    "api/user/gamesplayed/create",
    JSON.stringify(data)
  );
  return response;
};

export const getGamePlayedByUserId = async (userId) => {
  const response = await api.get(`api/user/gamesplayed/gamePlayed/${userId}`);
  return response;
};

export const getGamesPlayedByDate = async (date) => {
  const response = await api.get(
    `api/user/gamesplayed/games-played-by-date/${date}`
  );
  return response;
};
