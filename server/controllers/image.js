const cloudinary = require('cloudinary').v2

class ImagesController {
  
  static imageUpload(req, res, next) {

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    if (!req.file) {
      throw { status: 400, message: 'Required Image' }
    } else {
      cloudinary.uploader.upload(req.file.path)
        .then(result => {
          res.status(200).json({ link: result.url })
        })
        .catch(next)
    }
  }
}

module.exports = ImagesController