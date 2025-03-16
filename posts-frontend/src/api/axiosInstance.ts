import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your NestJS backend URL if different
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
