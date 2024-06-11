const path = require('path')

// Definiert Verzeichnisse zum Hochladen der Bilder

const uploadDir = path.join(process.cwd(), 'static/profilePictures')
const uploadDirCom200 = path.join(process.cwd(), "static/profilePictures/compressed200")
const uploadDirCom800 = path.join(process.cwd(), "static/profilePictures/compressed600")
const uploadStaticDir = path.join(process.cwd(), "static")
const uploadBeforePicture = path.join(process.cwd(), "static/beforePicture")
const uploadAfterPicture = path.join(process.cwd(), "static/afterPicture")


module.exports = {
  uploadStaticDir,
  uploadDir,
  uploadDirCom200,
  uploadDirCom800,
  uploadBeforePicture,
  uploadAfterPicture,
  uploadOptions: {
    uploadDir,
    uploadDirCom200,
    uploadDirCom800,
    uploadBeforePicture,
    uploadAfterPicture
  },
}