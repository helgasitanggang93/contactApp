const bcrypt = require("bcryptjs");

/**
 * Function to hash password into encrypted
 * inputPassword?: string - From user input
 */
const hash = inputPassword => {
  /**
   * return String - encrypted password
   * hashSync?: Function - Synchronously generates a hash for the given string.
   * inputPassword?: String - password from user
   * genSaltSync(<number|string>)?: function to generate hash
   */
  return bcrypt.hashSync(inputPassword, bcrypt.genSaltSync(10));
};

/**
 * Function to compare
 * inputPassword?: string - From user input
 * hashPassword?: String - existing encrypted password
 */
const compare = (inputPassword, hashPassword) => {
  /**
   * return boolean - true if the password match
   * compareSync?: Function - Synchronously tests a string against a hash.
   * inputPassword?: String - password from user
   * genSaltSync(<number|string>)?: function to generate hash
   * hashPassword?: String - existing encrypted password
   */
  return bcrypt.compareSync(inputPassword, hashPassword);
};

module.exports = {
  hash,
  compare
};
