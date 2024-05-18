import axios from "axios";

export const HOST = "http://85.215.71.124"

const axiosInstance = axios.create({
    baseURL: HOST
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error("Request failed:", error)
        throw error
    }
);

export default axiosInstance;
