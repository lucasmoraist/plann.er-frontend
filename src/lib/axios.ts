import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

console.log(apiUrl);

export const api = axios.create({
    baseURL: apiUrl,
})