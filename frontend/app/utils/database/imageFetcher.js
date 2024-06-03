import FormData from 'form-data'
import axiosInstance, { HOST } from './axiosConfig'

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

        console.log("[uploadProfilePicture] upload profile picture successfully")

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export function fetchProfilePicture(friend, refreshDate) {
    try {
        const endPoint = `${HOST}/static/profilePictures/${getProfileFileName(friend)}?${refreshDate}`
        return endPoint
    } catch (error) {
        throw error;
    }
}

export function fetchProfilePictureCompressed(friend, refreshDate) {
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