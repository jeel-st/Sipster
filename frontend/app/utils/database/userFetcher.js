// Imports
import axiosInstance from "./axiosConfig";
import { userLog } from "../logger/config";

/*
    Method to fetch a user

    @param username: string -> the username to fetch the user
    @return: object -> the user
*/
export async function fetchUser(username) {
    try {
        const reponse = await axiosInstance.get(`/user/${username}`)
        userLog.info("User data has been fetched successfully.")

        return reponse.data
    } catch (error) {
        userLog.error("User data could not fetched successfully.", error)
    }
}
