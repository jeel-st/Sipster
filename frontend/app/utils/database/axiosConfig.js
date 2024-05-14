import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://85.215.71.124"
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error("Request failed:", error)
        throw error
    }
);

export default axiosInstance;
