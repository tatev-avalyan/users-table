import axios from "axios";
import headers from "./ApiHeaders";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  config.headers = headers();
  return config;
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

const service = {
  users: {
    getAll(params) {
      return instance({
        url: `api`,
        method: "get",
        params,
      });
    },
  },
};
export default service;
