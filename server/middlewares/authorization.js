const Contact = require("../models/contact");
const User = require("../models/user");
const { verify } = require("../helpers/jwt");
const { messageHandler } = require("../helpers/constantType");

let secret = process.env.SECRET_PRODUCTION || process.env.SECRET_DEVELOPMENT
/**
 * this authorization implement in create contact and get all contact data
 * req {*} - receiving req.headres (token from frontEnd)
 * res {*} -
 * next - move to next middleware
 */
const authorizationContact = (req, res, next) => {
  /**
   * check if the headers has token property
   */
  if (req.headers.hasOwnProperty("token")) {
    /**
     * verify the token using jwt verify, if match payload will contain user information
     */
    let payload = verify(req.headers.token, secret);
    /**
     * Destructuring payload
     */
    let { email } = payload;
    /**
     * Destructuring req.params
     */
    const { id } = req.params;
    /**
     * Querying find user data by email
     */
    let promiseUser = User.findOne({ email: email });
    /**
     * Querying find contact data by contact id
     */
    let promiseContact = Contact.findOne({ _id: id });
    /**
     * run promiseUser and promiseContact with Promise.all
     */
    Promise.all([promiseUser, promiseContact])
      .then(values => {
        /**
         * Destructuring array
         */
        const [user, Contact] = values;
        /**
         * check if user id equal with createdBy (it means contact data belong to this user)
         * move to next middleware
         */
        if (String(user._id) === String(Contact.createdBy)) {
          next();
        } else {
          /**
           * send error message
           */
          throw { status: 401, message: messageHandler.err401message };
        }
      })
      .catch(next); // sending error message to errhandler
  } else {
    /**
     * if token doesn't exist send error message to errHandler
     */
    next({ status: 401, message: messageHandler.err401message });
  }
};

module.exports = authorizationContact;
