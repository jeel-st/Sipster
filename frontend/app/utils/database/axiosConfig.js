// Imports
import axios from "axios";
import { rootLog } from "../logger/config";

// The base URL for the API
export const HOST = "http://85.215.71.124";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: HOST
});

// Add a response interceptor to log errors and rethrow them
axiosInstance.interceptors.response.use(
    response => response, // If the response is successful, return the response
    error => {
        // Log the error using rootLog
        rootLog.error("Request failed:", error);
        // Throw the error to be handled by the calling code
        throw error;
    }
);

export default axiosInstance;
