const cloudinary = require('cloudinary').v2
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const Contact = require('../models/contact')
const {clearHash} = require('../helpers/cache');
const {messageHandler,stringType} = require('../helpers/constantType');

class ImagesController {
  
  static imageUpload(req, res, next) {

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    // console.log(req.file)
    if (!req.file) {
      throw { status: 400, message:  messageHandler.err400message}
    } else {
      cloudinary.uploader.upload(req.file.path)
        .then(result => {
          res.status(200).json({ link: result.url })
        })
        .catch(next)
    }
  }

  static async csvUpload(req, res, next) {
    const {createdBy} = req.body
    try {
      let dataFromCsv = await readFile(req.file.path)
      let arrayOfString = dataFromCsv.toString().split('\n').splice(1)
      let arrayOfObject = arrayOfString.map(element => {
          let eachContact = element.split(';')
          eachContact[1] = '+'+eachContact[1]
          return new ContactData(eachContact[0], eachContact[2], stringType.imageDefault, eachContact[1], createdBy)
    })
    Contact.collection.insert(arrayOfObject)
    .then(() => {
      clearHash(createdBy)
      return Contact.find({createdBy}).cache({key: createdBy})
    })
    .then(data => {
      res.status(200).json(data)
     
    })
    .catch(next)

    } catch (error) {
      next({status: 400, message: messageHandler.err400message})
    }
    
  }
}

class ContactData {
  constructor(fullName, address, image, phoneNumber, createdBy){
    this.fullName = fullName
    this.address = address,
    this.image = image || undefined
    this.phoneNumber = phoneNumber
    this.createdBy = createdBy
  }
}

module.exports = ImagesController