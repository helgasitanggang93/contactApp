const Contact = require("../models/contact");
const { clearHash } = require("../helpers/cache");
const { messageHandler } = require("../helpers/constantType");

/**
 * @class ContactController - to handling contact
 */
class ContactController {
  /**
   * @static - method to create contact Data
   * @param {*} req - receiving req.body (contact values from user)
   * @param {*} res - sending res.json(contact Data)
   * @param {*} next - to sending to errhandler
   * @memberof ContactController
   */
  static create(req, res, next) {
    /**
     * Destructuring req.body
     */
    const { fullName, address, image, phoneNumber, createdBy } = req.body;

    /**
     * create new contact data
     */
    Contact.create({
      fullName,
      address,
      image,
      phoneNumber,
      createdBy
    })
      .then(data => {
        /**
         * sending created contact data
         */
        res.status(201).json(data);
        /**
         * clear contact data cache by createdBy
         */
        clearHash(data.createdBy);
      })
      .catch(next); // sending error message to errhandler
  }

  /**
   * @static - method to read all contact data
   * @param {*} req - receiving req.body (user Id)
   * @param {*} res - sending res.json(array of contact data)
   * @param {*} next - to sending to errhandler
   * @memberof ContactController
   */
  static readAll(req, res, next) {
    /**
     * Destructuring req.body
     */
    const { createdBy } = req.body;
    /**
     * Querying find contactData by user id
     * checking in cache by user id
     */
    Contact.find({ createdBy })
      .cache({ key: createdBy })
      .then(data => {
        /**
         * sending all contact data
         */
        res.status(200).json(data);
      })
      .catch(next); // sending error message to errhandler
  }

  /**
   * @static - method for read one contact data by contact Id
   * @param {*} req - receiving req.params (contact Id)
   * @param {*} res - sending res.json(object of one contact data)
   * @param {*} next - to sending to errhandler
   * @memberof ContactController
   */
  static readOne(req, res, next) {
    /**
     * Destructuring req.params
     */
    const { id } = req.params;
    /**
     * Querying find contactData by contact id
     */
    Contact.findOne({ _id: id })
      .then(data => {
        /**
         * checking if the data doesn't exist send error message
         */
        if (Object.keys(data).length === 0) {
          next({ status: 404, message: messageHandler.err404message });
        } else {
          /**
           * sending one contact data
           */
          res.status(200).json(data);
        }
      })
      .catch(next); // sending error message to errhandler
  }

  /**
   * @static - method for update one contact data by contact id
   * @param {*} req - receiving req.params (contact Id) and req.body (contact values from user)
   * @param {*} res - sending res.json(object of updated contact data)
   * @param {*} next - to sending to errhandler
   * @memberof ContactController
   */
  static update(req, res, next) {
    /**
     * Destructuring req.params
     */
    const { id } = req.params;
    /**
     * Destructuring req.body
     */
    const { fullName, address, image, phoneNumber } = req.body;

    /**
     * storing values into obejct
     */
    let obj = {
      fullName,
      address,
      image,
      phoneNumber
    };

    /**
     * iterate and checking the object to check undefined properties
     * if the undefined property found, property will delete immediately
     */
    for (const key in obj) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }

    /**
     * handling for empty object, it means front end sending empty object
     */
    if (Object.keys(obj).length === 0) {
      /**
       * send error message
       */
      next({ status: 403, message: messageHandler.err403message });
    } else {
      /**
       * update data by contact Id
       */
      Contact.findOneAndUpdate({ _id: id }, obj)
        .then(() => {
          /**
           * querying to get one data (user can get the updated data)
           */
          return Contact.findOne({ _id: id });
        })
        .then(data => {
          /**
           * sending updated contact data
           */
          res.status(200).json(data);
          /**
           * clear contact data cache by createdBy
           */
          clearHash(data.createdBy);
        })
        .catch(next); // sending error message to errhandler
    }
  }

  /**
   * @static - method for delete one contact data by contact id
   * @param {*} req - receiving req.params (contact Id)
   * @param {*} res - sending res.json(object of deleted contact data)
   * @param {*} next - to sending to errhandler
   * @memberof ContactController
   */
  static delete(req, res, next) {
    /**
     * Destructuring req.params
     */
    const { id } = req.params;
    Contact
      /**
       * delete contact data by contact Id
       */
      .findOneAndDelete({ _id: id })
      .then(data => {
        /**
         * sending deleted contact data
         */
        res.status(201).json(data);
        /**
         * clear contact data cache by createdBy
         */
        clearHash(data.createdBy);
      })
      .catch(next); // sending error message to errhandler
  }
}

module.exports = ContactController;
