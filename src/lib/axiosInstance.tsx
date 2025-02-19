import { envConfig } from "@/config/envConfig";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: envConfig.baseUrl,
});

async function getAccessToken() {
  
  const userData = localStorage.getItem("user_data_hiublue");
  const user =  userData ? JSON.parse(userData) : null;
  return user?.token;
}

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;