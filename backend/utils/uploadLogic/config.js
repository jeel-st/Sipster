const path = require('path')

const uploadDir = path.join(process.cwd(), 'profilePictures')
const uploadDirCom = path.join(process.cwd(), "profilePictures/compressed")
module.exports = {
  uploadDir,
  uploadDirCom,
  uploadOptions: {
    uploadDir,
    uploadDirCom
  },
}