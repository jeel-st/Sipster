// imports
import axiosInstance from "./axiosConfig";
import { userLog } from "../logger/config";


export async function fetchUser(username) {
    try {
        const reponse = await axiosInstance.get(`/user/${username}`)
        userLog.info("User data has been fetched successfully.")

        return reponse.data
    } catch (error) {
        userLog.error("User data could not fetched successfully.", error)
    }
}
