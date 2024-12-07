import axios from "axios";
import { tokenHelper } from "./helpers";

const BASE_URL = 'http://localhost:8000/api/'

const unauthApiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
      if (error.response.status === 401) {
          tokenHelper.tryRefreshToken().catch((err) => console.error(err));
          // error.config.headers.Authorization = `Bearer ${data.access}`;
          // return apiInstance(error.config);
      }
      return Promise.reject(error);
  }
);

export { apiInstance, unauthApiInstance };
