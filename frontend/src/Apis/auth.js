import api from "./api";

// Login function
export const login = async (data) => {
  try {
    const response = await api.post("api/users/signin", JSON.stringify(data));

    if (response?.status === 200 && response?.data?.token) {
      localStorage.setItem("token", response.data.token);

      // Check if 'userId' exists in the response
      if (response.data.userId) {
        localStorage.setItem("userId", response.data.userId);
      } else {
        console.error("User ID not found in the response.");
        // Optionally, handle this situation as needed
        // For example, you can show an error message or perform another action.
      }

      const role = response.data.role;
      if (role?.length) {
        localStorage.setItem("role", role[0]);
      } else {
        localStorage.removeItem("role");
      }
    } else {
      console.error("Login failed or token not found.");
    }

    return response;
  } catch (error) {
    console.error("An error occurred during login:", error);
    // Optionally, handle the error as needed
    return { error: "An error occurred during login." };
  }
};

// Registration function
export const Register = async (data) => {
  try {
    const response = await api.post("api/users/signup", JSON.stringify(data));
    console.log(response);
    return response;
  } catch (error) {
    console.error("An error occurred during registration:", error);
    // Optionally, handle the error as needed
    return { error: "An error occurred during registration." };
  }
};

// Fetch user by ID function
export const getUserById = async (id) => {
  try {
    const response = await api.get(`api/users/get-user-by-id/${id}`);
    return response;
  } catch (error) {
    console.error(
      `An error occurred while fetching user with ID ${id}:`,
      error
    );
    // Optionally, handle the error as needed
    return { error: `An error occurred while fetching user with ID ${id}.` };
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await api.post(
      "api/users/verify-otp",
      JSON.stringify(data)
    );
    return response;
  } catch (error) {
    console.error("An error occurred during OTP verification:", error);
    // Optionally, handle the error as needed
    return { error: "An error occurred during OTP verification." };
  }
};
