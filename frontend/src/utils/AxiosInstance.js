import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev-sea.vercel.app/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
