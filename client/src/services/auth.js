import api from "./api";

export const login = async (data) => {
  const response = await api.post("api/users/signin", JSON.stringify(data));

  //   if (response?.data?.token) {
  //     localStorage.setItem("token", response?.data?.token);
  //     const role = response?.data?.role;

  //     role?.length
  //       ? localStorage.setItem("role", role[0])
  //       : localStorage.removeItem("role");
  //   }

  return response;
};
