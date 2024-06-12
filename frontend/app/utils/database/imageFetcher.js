import FormData from 'form-data'
import axiosInstance, { HOST } from './axiosConfig'
import { userLog } from '../logger/config'

export async function uploadProfilePicture(file, username) {
    const filename = file.uri.split("/").pop()

    let data = new FormData()
    data.append('username', username)
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

export function fetchProfilePicture(friend, refreshDate) {
    if(!refreshDate) refreshDate = friend.lastLogin
    try {
        const endPoint = `${HOST}/static/profilePictures/compressed1080/${getProfileFileName(friend)}?${refreshDate}`
        return endPoint
    } catch (error) {
        throw error;
    }
}

export function fetchProfilePictureCompressed(friend, refreshDate) {
    if(!refreshDate) refreshDate = friend.lastLogin
    try {
        const endPoint = `${HOST}/static/profilePictures/compressed200/${getProfileFileName(friend)}?${refreshDate}`
        return endPoint
    } catch (error) {
        throw error;
    }
}

function getProfileFileName(friend) {
    //if the friend has no profile picture, return the default image
    if(friend.profilePicture == null) return "unknown.webp"

    //get the name of the file without the extension
    const name = friend.profilePicture.split("/").pop().split(".").slice(0, -1).join(".");

    //return the name with the webp extension
    return name + ".webp"
}