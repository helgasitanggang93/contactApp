const { verify } = require('../helpers/jwt');
const User = require('../models/user');

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
            next({ status: 403, message: 'Forbidden' })
          }
        })
        .catch(next)
    } else {
      next({ status: 401, message: 'Not Authentication' })
    }
  } catch (error) {
    next({ status: 401, message: 'Not Logged In' })
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
            next({ status: 403, message: 'Forbidden Access' })
          }
        })
        .catch(next)

    } else {
      next({ status: 400, message: 'Not Authentication' })
    }

  } catch (error) {
    next({ status: 401, message: 'Not Logged In' })
  }
}

module.exports = {authenticationContact, authenticationCommon}