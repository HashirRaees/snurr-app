import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://157.245.61.220:8000",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
