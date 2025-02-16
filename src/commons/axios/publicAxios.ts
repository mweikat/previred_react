import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000 * 2,
    headers: {
    "Content-type": "application/json"
  }
});