import axios from "axios";
import { getAuthToken } from "~/utils/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers["x-token"] = token;
  }
  return config;
});

export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  msg: string;
}

export default apiClient;
