import api from "./api";

export const getTeasmByLeage = async ({ queryKey }) => {
  const [_, leage] = queryKey;

  const response = await api.get(`api/leagues/nhl/teams`);

  return response;
};
