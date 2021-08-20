import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://morales-devlog.herokuapp.com/api/",
});
