const path = require('path')

const uploadDir = path.join(process.cwd(), 'static/profilePictures')
const uploadDirCom = path.join(process.cwd(), "static/profilePictures/compressed")
const uploadStaticDir = path.join(process.cwd(), "static")
const uploadBeforePicture = path.join(process.cwd(), "static/beforePicture")

module.exports = {
  uploadStaticDir,
  uploadDir,
  uploadDirCom,
  uploadBeforePicture,
  uploadOptions: {
    uploadDir,
    uploadDirCom,
    uploadBeforePicture
  },
}