// Imports
import FormData from 'form-data'
import axiosInstance, { HOST } from './axiosConfig'
import { userLog } from '../logger/config'

/*
    Method to upload a profile picture

    @param file: object -> the image to upload
    @param user: object -> the user to upload the image
    @return: string -> the image name
*/
export async function uploadProfilePicture(file, user) {
    // Get the filename from the URI
    const filename = file.uri.split("/").pop()

    // Create FormData for the image upload
    let data = new FormData()
    data.append('userID', user._id)
    data.append('file', { uri: file.uri, name: filename, type: file.mimeType })

    try {
        const response = await axiosInstance.post("/imageUpload", data, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })

        userLog.debug("Profile picture has been uploaded successfully.")

        return response.data
    } catch (error) {
        userLog.error("Profile picture could not be uploaded.", error)
        throw error
    }
}

/*
    Method to fetch a profile picture

    @param friend: object -> the friend to fetch the profile picture
    @param refreshDate: string -> the date to refresh the image
    @return: string -> the profile picture
*/
export function fetchProfilePicture(friend, refreshDate) {
    if(!refreshDate) refreshDate = friend.lastLogin
    try {
        // Create the endpoint for the profile picture
        const endPoint = `${HOST}/static/profilePictures/compressed1080/${getProfileFileName(friend)}?${refreshDate}`
        return endPoint
    } catch (error) {
        throw error;
    }
}

/*
    Method to fetch a compressed profile picture

    @param friend: object -> the friend to fetch the profile picture
    @param refreshDate: string -> the date to refresh the image
    @return: string -> the compressed profile picture
*/
export function fetchProfilePictureCompressed(friend, refreshDate) {
    if(!refreshDate) refreshDate = friend.lastLogin
    try {
        // Create the endpoint for the compressed profile picture
        const endPoint = `${HOST}/static/profilePictures/compressed200/${getProfileFileName(friend)}?${refreshDate}`
        return endPoint
    } catch (error) {
        throw error;
    }
}

/*
    Method to get the profile file name

    @param friend: object -> the friend to get the profile file name
    @return: string -> the profile file name
*/
function getProfileFileName(friend) {
    //if the friend has no profile picture, return the default image
    if(friend.profilePicture == null) return "unknown.webp"

    //get the name of the file without the extension
    const name = friend.profilePicture.split("/").pop().split(".").slice(0, -1).join(".");

    //return the name with the webp extension
    return name + ".webp"
}