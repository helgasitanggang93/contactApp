const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const {sign} = require('../helpers/jwt')

class UserController {
  static signup(req, res ,next) {
    const {email, password} = req.body
    User
    .create({
      email,
      password
    })
    .then(() => {
      let newFormatEmail = email.toLowerCase()
      res.status(201).json({email: newFormatEmail})
    })
    .catch(next)
  }
}

module.exports = UserController