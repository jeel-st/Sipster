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
        const endPoint = `${HOST}/static/profilePictures/${getProfileFileName(friend)}?${refreshDate}`
        return endPoint
    } catch (error) {
        throw error;
    }
}

export function fetchProfilePictureCompressed(friend, refreshDate) {
    if(!refreshDate) refreshDate = friend.lastLogin
    try {
        const endPoint = `${HOST}/static/profilePictures/compressed/${getProfileFileName(friend)}?${refreshDate}`
        return endPoint
    } catch (error) {
        throw error;
    }
}

function getProfileFileName(friend) {
    if(friend.profilePicture == null) return "unknown.jpg"
    const name = friend.profilePicture.split("/")
    return name[name.length - 1]
}