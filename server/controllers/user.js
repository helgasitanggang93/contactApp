const User = require("../models/user");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const { messageHandler } = require("../helpers/constantType");

/**
 *
 *
 * @class UserController - to handling User
 */
class UserController {
  /**
   * @static - method for user register
   * @param {*} req - receiving req.body (user values from user)
   * @param {*} res - sending res.json(user email)
   * @param {*} next - to sending to errhandler
   * @memberof UserController
   */
  static signup(req, res, next) {
    /**
     * Destructuring req.body
     */
    const { email, password } = req.body;
    /**
     * create new user data
     */
    User.create({
      email,
      password
    })
      .then(() => {
        /**
         * convert an email into lowercase
         */
        let newFormatEmail = email.toLowerCase();
        /**
         * sending new user email
         */
        res.status(201).json({ email: newFormatEmail });
      })
      .catch(next); // sending error message to errhandler
  }

  /**
   * @static - method for user login
   * @param {*} req - receiving req.body (user values from user)
   * @param {*} res - sending res.json(user token)
   * @param {*} next - to sending to errhandler
   * @memberof UserController
   */
  static login(req, res, next) {
    /**
     * Destructuring req.body
     */
    let { email, password } = req.body;
    /**
     * convert an email into lowercase
     */
    email = email.toLowerCase();
    /**
     * Querying find userdata by email
     */
    User.findOne({ email })
      .then(data => {
        /**
         * check if data doesn't exist or wrong password send the error message
         */
        if (!data || !compare(password, data.password)) {
          throw { status: 401, message: messageHandler.err401message };
        } else {
          /**
           * destructuring data to get an user email
           */
          const { email } = data;
          /**
           * include an user email into token
           */
          const token = sign({ email });
          /**
           * send the token
           */
          res.status(200).json({ token });
        }
      })
      .catch(next); // sending error message to errhandler
  }
}

module.exports = UserController;
