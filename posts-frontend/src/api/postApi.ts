import axios from "axios";

const API_URL = "http://localhost:3000"; // Update with your backend URL

// Fetch all Post
export const getPost = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

// Fetch Post by ID (GET)
export const getPostById = async (id : number) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

// Create a new Post
export const createPost = async (postData: {title: string;  body: string; img: string ;adminId: number}) => {
  const response = await axios.post(`${API_URL}/posts`, postData);
  return response.data;
};

// Update a Post
export const updatePost = async (id: number, updatedpostData: {title?: string;  body?: string; img?: string ;adminId?: number}) => {
  const response = await axios.patch(`${API_URL}/posts/${id}`, updatedpostData);
  return response.data;
};

// Delete a Post
export const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}/posts/${id}`);
};
