import api from "./api";

export const login = async (data) => {
  const response = await api.post("api/users/signin", JSON.stringify(data));

  if (response?.data?.token) {
    localStorage.setItem("token", response?.data?.token);

    // Check if 'userId' exists in the response
    if (response?.data?.userId) {
      const userId = response?.data?.userId;
      localStorage.setItem("userId", userId);
    } else {
      console.error("User ID not found in the response.");
      // Optionally, handle this situation as needed
      // For example, you can show an error message or perform another action.
    }

    const role = response?.data?.role;
    role?.length
      ? localStorage.setItem("role", role[0])
      : localStorage.removeItem("role");
  }

  return response;
};

export const Register = async (data) => {
  const response = await api.post("api/users/signup", JSON.stringify(data));

  console.log(response);
  return response;
};
