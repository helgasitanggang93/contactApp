const Contact = require('../models/contact')

class ContactController {
  static create(req, res, next){
    const {
      fullName, 
      address, 
      image, 
      phoneNumber, 
      createdBy} = req.body

      Contact.create({
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

  static readAll(req, res, next){

  }

  static readOne(req, res, next){

  }

  static update(req, res, next) {

  }

  static delete(req, res, next) {

  }
}

module.exports = ContactController