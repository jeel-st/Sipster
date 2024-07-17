const path = require('path')

// Definiert Verzeichnisse zum Hochladen der Bilder

const uploadDir = path.join(process.cwd(), 'static/profilePictures')
const uploadDirCom200 = path.join(process.cwd(), "static/profilePictures/compressed200")
const uploadDirCom1080 = path.join(process.cwd(), "static/profilePictures/compressed1080")
const uploadStaticDir = path.join(process.cwd(), "static")
const uploadBeforePicture = path.join(process.cwd(), "static/beforePicture")
const uploadBeforePictureCom80 = path.join(process.cwd(), "static/beforePicture/compressed80")
const uploadBeforePictureCom1080 = path.join(process.cwd(), "static/beforePicture/compressed1080")
const uploadAfterPicture = path.join(process.cwd(), "static/afterPicture")
const uploadAfterPictureCom80 = path.join(process.cwd(), "static/afterPicture/compressed80")
const uploadAfterPictureCom1080 = path.join(process.cwd(), "static/afterPicture/compressed1080")


module.exports = {
  uploadStaticDir,
  uploadDir,
  uploadDirCom200,
  uploadDirCom1080,
  uploadAfterPicture,
  uploadBeforePicture,
  uploadBeforePictureCom80,
  uploadBeforePictureCom1080,
  uploadAfterPictureCom80,
  uploadAfterPictureCom1080,
  uploadOptions: {
    uploadDir,
    uploadDirCom200,
    uploadDirCom1080,
    uploadAfterPicture,
    uploadBeforePicture,
    uploadBeforePictureCom80,
    uploadBeforePictureCom1080,
    uploadAfterPictureCom80,
    uploadAfterPictureCom1080
  },
}