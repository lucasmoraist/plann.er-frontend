import axios from "axios";

const apiUrl = 'http://localhost:8080';

export const api = axios.create({
    baseURL: apiUrl,
})
