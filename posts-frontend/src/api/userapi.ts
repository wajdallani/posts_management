import axios from "axios";

const API_URL = "http://localhost:3000"; // Update with your backend URL

// Fetch all users
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);

  return response.data;
};

// Create a new user
export const createUser = async (userData: {name: string;  email: string; password: string ;role: "ADMIN" | "POSTER"}) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

// Update a user
export const updateUser = async (id: number, updatedData: {name?: string;  email?: string; password?: string ;role?: "ADMIN" | "POSTER"}) => {
  const response = await axios.put(`${API_URL}/users/${id}`, updatedData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/users/${id}`);
};
// {name: string;  email: string; password: string ;role: "ADMIN" | "POSTER" }