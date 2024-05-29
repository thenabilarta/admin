import axios from "axios";
import { MAIN_URL } from "../constants";
import { getCookie } from "./utils";

const axiosInstance = () => {
  const defaultOptions = {
    baseURL: MAIN_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = getCookie("access_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

export default axiosInstance();
