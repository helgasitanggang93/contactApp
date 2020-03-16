const { verify } = require('../helpers/jwt');
const User = require('../models/user');
const {messageHandler} = require('../helpers/constantType');
const authenticationContact = (req, res, next) => {
  try {
    if (req.headers.hasOwnProperty('token')) {
      let payload = verify(req.headers.token, process.env.SECRET);
      User
        .findOne({ email: payload.email })
        .then(data => {
          if (data) {
            req.body.createdBy = data._id
            next()
          } else {
            next({ status: 403, message: messageHandler.err403message })
          }
        })
        .catch(next)
    } else {
      next({ status: 401, message: messageHandler.err401message })
    }
  } catch (error) {
    next({ status: 401, message: messageHandler.err401message })
  }
}

const authenticationCommon = (req, res, next) => {
  try {
    if (req.headers.hasOwnProperty('token')) {
      let payload = verify(req.headers.token, process.env.SECRET);
      User.findOne({ email: payload.email })
        .then(data => {
          if (data) {
            next()
          } else {
            next({ status: 403, message: messageHandler.err403message })
          }
        })
        .catch(next)

    } else {
      next({ status: 401, message: messageHandler.err401message })
    }

  } catch (error) {
    next({ status: 401, message: messageHandler.err401message })
  }
}

module.exports = {authenticationContact, authenticationCommon}