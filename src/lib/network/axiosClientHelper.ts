import axios from "axios";

export const axiosClientHelper = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
