import api from "./api";

export const getTeasmByLeage = async ({ queryKey }) => {
  const [_, league] = queryKey;
  const response = await api.get(`api/leagues/${league}/teams`);
  console.log("league", league, "response", response);
  return response;
};
