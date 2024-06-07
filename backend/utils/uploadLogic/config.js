const path = require('path')

// Definiert Verzeichnisse zum Hochladen der Bilder

const uploadDir = path.join(process.cwd(), 'static/profilePictures')
const uploadDirCom = path.join(process.cwd(), "static/profilePictures/compressed")
const uploadStaticDir = path.join(process.cwd(), "static")
const uploadBeforePicture = path.join(process.cwd(), "static/beforePicture")
const uploadAfterPicture = path.join(process.cwd(), "static/afterPicture")


module.exports = {
  uploadStaticDir,
  uploadDir,
  uploadDirCom,
  uploadBeforePicture,
  uploadAfterPicture,
  uploadOptions: {
    uploadDir,
    uploadDirCom,
    uploadBeforePicture,
    uploadAfterPicture
  },
}