const Contact = require('../models/contact');
const {clearHash} = require('../helpers/cache');
const {messageHandler} = require('../helpers/constantType');
/**
 *
 *
 * @class ContactController
 */
class ContactController {
  /**
   *
   * static method to create contact Data
   * @static
   * @param {*} req - receiving req.body
   * @param {*} res - sending res.json(contact Data)
   * @param {*} next - to sending to errhandler
   * @memberof ContactController
   */
  static create(req, res, next) {
    /**
     * Destructuring req.body
     */
    const {
      fullName,
      address,
      image,
      phoneNumber,
      createdBy } = req.body

    Contact
      .create({
        fullName,
        address,
        image,
        phoneNumber,
        createdBy
      })
      .then((data) => {
        /**
         * sending created contact data
         */
        res.status(201).json(data)
        /**
         * clear contact data cache by createdBy
         */
        clearHash(data.createdBy)
      })
      .catch(next) // sending error message to errhandler
  }

  /**
   *
   * static method to read all contact data
   * @static
   * @param {*} req receiving req.body (user Id)
   * @param {*} res sending res.json(array of contact data)
   * @param {*} next
   * @memberof ContactController
   */
  static readAll(req, res, next) {
    /**
     * Destructuring req.body
     */
    const { createdBy } = req.body
    Contact.find({ createdBy }).cache({key: createdBy})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    const { id } = req.params

    Contact
      .findOne({ _id: id })
      .then(data => {
        if(Object.keys(data).length === 0){
          next({status: 404, message: messageHandler.err404message})
        }else {
          res.status(200).json(data)
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { id } = req.params
    const {
      fullName,
      address,
      image,
      phoneNumber, } = req.body

    let obj = {
      fullName,
      address,
      image,
      phoneNumber,
    }

    for (const key in obj) {
      if (obj[key] === undefined) {
        delete obj[key]
      }
    }
    
    if (Object.keys(obj).length === 0) {
      
      next({ status: 403, message: messageHandler.err403message })
    } else {
      Contact
        .findOneAndUpdate({ _id: id }, obj)
        .then(() => {
          return Contact.findOne({ _id: id })
        })
        .then(data => {
          res.status(200).json(data)
          clearHash(data.createdBy)
        })
        .catch(next)
    }
  }

  static delete(req, res, next) {
    const {id} = req.params
         Contact
         .findOneAndDelete({_id: id})
         .then(data => {
            res.status(201).json(data)
            clearHash(data.createdBy)
         })
         .catch(next)

    }
}

module.exports = ContactController