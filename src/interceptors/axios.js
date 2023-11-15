import axios from "axios";
const baseUrl = import.meta.env.VITE_HOST_NAME;
console.log('base url =>', baseUrl);
axios.defaults.baseURL = baseUrl;
const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
