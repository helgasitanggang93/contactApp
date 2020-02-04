const jwt = require('jsonwebtoken')

const sign = (payload) => {
  var token = jwt.sign(payload, process.env.SECRET)
  return token
}

const verify = (token) => {
  var decode = jwt.verify(token, process.env.SECRET) 
  return decode
}

module.exports = {
  sign,
  verify
}