import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://chepe-srv-db95dgjodcbs73d2i26g.onrender.com');

const API = axios.create({ baseURL });

export default API;
