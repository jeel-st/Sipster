const path = require('path')

// Definiert Verzeichnisse zum Hochladen der Bilder

const uploadDir = path.join(process.cwd(), 'static/profilePictures')
const uploadDirCom200 = path.join(process.cwd(), "static/profilePictures/compressed200")
const uploadDirCom1080 = path.join(process.cwd(), "static/profilePictures/compressed1080")
const uploadStaticDir = path.join(process.cwd(), "static")
const uploadBeforePicture = path.join(process.cwd(), "static/beforePicture")
const uploadBeforePictureCom200 = path.join(process.cwd(), "static/beforePicture/compressed200")
const uploadBeforePictureCom1080 = path.join(process.cwd(), "static/beforePicture/compressed1080")
const uploadAfterPicture = path.join(process.cwd(), "static/afterPicture")
const uploadAfterPictureCom200 = path.join(process.cwd(), "static/afterPicture/compressed200")
const uploadAfterPictureCom1080 = path.join(process.cwd(), "static/afterPicture/compressed1080")


module.exports = {
  uploadStaticDir,
  uploadDir,
  uploadDirCom200,
  uploadDirCom1080,
  uploadAfterPicture,
  uploadBeforePicture,
  uploadBeforePictureCom200,
  uploadBeforePictureCom1080,
  uploadAfterPictureCom200,
  uploadAfterPictureCom1080,
  uploadOptions: {
    uploadDir,
    uploadDirCom200,
    uploadDirCom1080,
    uploadAfterPicture,
    uploadBeforePicture,
    uploadBeforePictureCom200,
    uploadBeforePictureCom1080,
    uploadAfterPictureCom200,
    uploadAfterPictureCom1080
  },
}