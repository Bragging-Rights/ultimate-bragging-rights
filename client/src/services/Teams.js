import api from "./api";

export const getTeasmByLeage = async ({ queryKey }) => {
  const [_, leage] = queryKey;

  console.log("leage", leage);
  const response = await api.get(`api/leagues/${leage}/teams`);

  return response;
};
