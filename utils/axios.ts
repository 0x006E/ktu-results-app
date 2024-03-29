import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 1000,
});
export default axiosClient;
