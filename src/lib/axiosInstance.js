import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_APIS_URL_REMOTE;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Envia sempre cookies na comunicação
});

export default axiosInstance;
