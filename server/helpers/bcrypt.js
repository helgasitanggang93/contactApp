const bcrypt = require('bcryptjs')

const hash = (inputPassword) => {
  return bcrypt.hashSync(inputPassword, bcrypt.genSaltSync(10))
}

const compare = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword)
}

module.exports = {
  hash,
  compare
}