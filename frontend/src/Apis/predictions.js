import api from "./api";

export const addPrediction = async (data) => {
  console.log("data", data);
  const response = await api.post(
    "api/user/gamesplayed/create",
    JSON.stringify(data)
  );
  return response;
};
