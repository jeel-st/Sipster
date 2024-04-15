const path = require('path')

const uploadDir = path.join(process.cwd(), 'profilePictures')

module.exports = {
  uploadDir,
  uploadOptions: {
    uploadDir,
  },
}