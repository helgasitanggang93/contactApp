const { verify } = require("../helpers/jwt");
const User = require("../models/user");
const { messageHandler } = require("../helpers/constantType");

/**
 * this authentication implement in create contact and get all contact data
 * req {*} - receiving req.headres (token from frontEnd)
 * res {*} -
 * next - move to next middleware
 */
const authenticationContact = (req, res, next) => {
  try {
    /**
     * check if the headers has token property
     */
    if (req.headers.hasOwnProperty("token")) {
      /**
       * verify the token using jwt verify, if match payload will contain user information
       */
      let payload = verify(req.headers.token, process.env.SECRET);
      /**
       * find the data in database
       */
      User.findOne({ email: payload.email })
        .then(data => {
          /**
           * if the data exist
           * create a property to contained userId (next middleware will receive)
           * move to next middleware
           */
          if (data) {
            req.body.createdBy = data._id;
            next();
          } else {
            /**
             * if the data doesn't exist send error message
             */
            next({ status: 403, message: messageHandler.err403message });
          }
        })
        .catch(next); // sending error message to errhandler
    } else {
      /**
       * if token doesn't exist send error message to errHandler
       */
      next({ status: 401, message: messageHandler.err401message });
    }
  } catch (error) {
    // sending error message to errhandler
    next({ status: 401, message: messageHandler.err401message });
  }
};

/**
 * this authentication implement in update, delete and get one contact
 * req {*} - receiving req.headres (token from frontEnd)
 * res {*} -
 * next - move to next middleware
 */
const authenticationCommon = (req, res, next) => {
  try {
    /**
     * check if the headers has token property
     */
    if (req.headers.hasOwnProperty("token")) {
      /**
       * verify the token using jwt verify, if match payload will contain user information
       */
      let payload = verify(req.headers.token, process.env.SECRET);
      /**
       * find the data in database
       */
      User.findOne({ email: payload.email })
        .then(data => {
          if (data) {
            /**
             * if the data exist
             * move to next middleware
             */
            next();
          } else {
            /**
             * if the data doesn't exist send error message
             */
            next({ status: 403, message: messageHandler.err403message });
          }
        })
        .catch(next); // sending error message to errhandler
    } else {
      /**
       * if token doesn't exist send error message to errHandler
       */
      next({ status: 401, message: messageHandler.err401message });
    }
  } catch (error) {
    // sending error message to errhandler
    next({ status: 401, message: messageHandler.err401message });
  }
};

module.exports = { authenticationContact, authenticationCommon };
