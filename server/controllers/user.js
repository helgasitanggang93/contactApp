const User = require('../models/user');
const {compare} = require('../helpers/bcrypt');
const {sign} = require('../helpers/jwt');
const {messageHandler} = require('../helpers/constantType');

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

  static login(req, res, next) {
    let {email, password} = req.body
    email = email.toLowerCase()
    User
    .findOne({email})
    .then(data => {
      if(!data || !compare(password, data.password)){
        throw({status: 401, message: messageHandler.err401message})
      }else{
        const {email} = data
        const token = sign({email})
        res.status(200).json({token})
      }
    })
    .catch(next)
  }
}

module.exports = UserController