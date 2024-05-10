const path = require('path')

const uploadDir = path.join(process.cwd(), 'static/profilePictures')
const uploadDirCom = path.join(process.cwd(), "static/profilePictures/compressed")
const uploadStaticDir = path.join(process.cwd(), "static")
module.exports = {
  uploadStaticDir,
  uploadDir,
  uploadDirCom,
  uploadOptions: {
    uploadDir,
    uploadDirCom
  },
}