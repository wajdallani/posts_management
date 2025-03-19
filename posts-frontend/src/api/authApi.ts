import axios from "axios";

const API_URL = "http://localhost:3000"; 

// Login User
export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        console.log("api send")
        return response.data; // { access_token: "..." }
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong");
      } 
};

// Register User
// export const registerUser = async (userData: { name: string; email: string; password: string }) => {
//   const response = await axios.post(`${API_URL}/auth/register`, userData);
//   return response.data;
// };

// Logout (Client-side only: Clears token)
export const logoutUser = () => {
  localStorage.removeItem("token"); // Clear token from storage
};
