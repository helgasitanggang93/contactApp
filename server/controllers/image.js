const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const Contact = require("../models/contact");
const { clearHash } = require("../helpers/cache");
const { messageHandler, stringType } = require("../helpers/constantType");

/**
 *
 * @class ImagesController - to handle images
 */
class ImagesController {
  /**
   *
   *
   * @static - to handling image upload using thid party file hosting cloudinary and send it back to server
   * @param {*} req - receiving req.file (image file from from multer middleware)
   * @param {*} res - sending image url to front end
   * @param {*} next - to sending to errhandler
   * @memberof ImagesController
   */
  static imageUpload(req, res, next) {
    /**
     * cloudinary config using clodinary instance
     */
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    /**
     * checking the req.file
     * if the doesn't exist or undefined send the error message
     */
    if (!req.file) {
      /**
       * throw error to errhandler
       */
      throw { status: 400, message: messageHandler.err400message };
    } else {
      /**
       * sending file to the cloudinary file hosting
       * req.file.path - temporary directory provided by multer
       */
      cloudinary.uploader
        .upload(req.file.path)
        .then(result => {
          /**
           * sending url link from cloudinary
           */
          res.status(200).json({ link: result.url });
        })
        .catch(next); // sending error message to errhandler
    }
  }

  /**
   * BETA/UNSTABLE
   * @static - to handling csv file
   * @param {*} req - receving req.body {user Id}
   * @param {*} res - sending all of new data
   * @param {*} next - to sending to errhandler
   * @memberof ImagesController
   */
  static async csvUpload(req, res, next) {
    /**
     * Destructuring req.body
     */
    const { createdBy } = req.body;
    try {
      /**
       * using nodeJs module fs, and read file from temporary directory
       */
      let dataFromCsv = await readFile(req.file.path);
      /**
       * nodeJs fs module returning string type, so we should convert into array
       * after that splice index (1 - length of array - 1) because in 0 index only contain unused data
       */
      let arrayOfString = dataFromCsv
        .toString()
        .split("\n")
        .splice(1);
      /**
       * map arrayOfString same as contact model (should has properties such as fullName, address, etc)
       */
      let arrayOfObject = arrayOfString.map(element => {
        let eachContact = element.split(";");
        eachContact[1] = "+" + eachContact[1];
        return new ContactData(
          eachContact[0],
          eachContact[2],
          stringType.imageDefault,
          eachContact[1],
          createdBy
        );
      });
      /**
       * insert all of data into data base
       */
      Contact.collection
        .insert(arrayOfObject)
        .then(() => {
          /**
           * after data created, clear contact cache by userId
           */
          clearHash(createdBy);
          /**
           * Querying to find all of contact data by userId
           */
          return Contact.find({ createdBy }).cache({ key: createdBy });
        })
        .then(data => {
          /**
           * send all of contact data to front End
           */
          res.status(200).json(data);
        })
        .catch(next); // sending error message to errhandler
    } catch (error) {
      /**
       * send error to errHandler
       */
      next({ status: 400, message: messageHandler.err400message });
    }
  }
}

/**
 *
 *
 * @class ContactData - class helper for csvUpload
 */
class ContactData {
  constructor(fullName, address, image, phoneNumber, createdBy) {
    this.fullName = fullName;
    (this.address = address), (this.image = image || undefined);
    this.phoneNumber = phoneNumber;
    this.createdBy = createdBy;
  }
}

module.exports = ImagesController;
