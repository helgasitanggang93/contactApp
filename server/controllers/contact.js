const Contact = require('../models/contact')

class ContactController {
  static create(req, res, next) {
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
        res.status(201).json(data)
      })
      .catch(next)
  }

  static readAll(req, res, next) {
    const { createdBy } = req.body
    Contact.find({ createdBy })
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
        res.status(200).json(data)
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
      next({ status: 401, message: 'Nothing Change' })
    } else {
      Contact
        .findOneAndUpdate({ _id: id }, obj)
        .then(() => {

          return Contact.findOne({ _id: id })
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
  }

  static delete(req, res, next) {
    const {id} = req.params
         Portofolio
         .findOneAndDelete({_id: id})
         .then(data => {
            res.status(201).json(data)
         })
         .catch(next)

    }
}

module.exports = ContactController