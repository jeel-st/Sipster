import axios from "axios"
import FormData from 'form-data'

export async function uploadProfilePicture(file) {
    console.log(file)
    const filename = file.uri.split("/").pop()

    let data = new FormData()
    data.append('username', 'gamsa')
    data.append('file', { uri: file.uri, name: filename, type: file.mimeType })

    try {
        const response = await axios.post("http://85.215.71.124/imageUpload", data, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
        // handle success
        console.log("[uploadProfilePicture] upload profile picture successfully")
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}