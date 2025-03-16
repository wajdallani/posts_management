import axios from "axios";

const API_URL = "http://localhost:3000"; // Update with your backend URL

// Fetch all Admin
export const getAdmin = async () => {
  const response = await axios.get(`${API_URL}/admins`);

  return response.data;
};

// Create a new Admin
export const createAdmin = async (userData: {name: string;  email: string; password: string ;role: "ADMIN" | "POSTER"}) => {
  const response = await axios.post(`${API_URL}/admins`, userData);
  return response.data;
};

// Update a Admin
export const updateAdmin = async (id: number, updatedData: {name?: string;  email?: string; password?: string ;role?: "ADMIN" | "POSTER"}) => {
  const response = await axios.put(`${API_URL}/admins/${id}`, updatedData);
  return response.data;
};

// Delete a Admin
export const deleteAdmin = async (id: number) => {
  await axios.delete(`${API_URL}/admins/${id}`);
};
// {name: string;  email: string; password: string ;role: "ADMIN" | "POSTER" }