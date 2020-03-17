const jwt = require("jsonwebtoken");

let secret = process.env.SECRET_PRODUCTION || process.env.SECRET_DEVELOPMENT
/**
 * Function to generate token
 * payload?: Object - User information
 */
const sign = payload => {
  /**
   * generate token with Synchronous sign (HMAC SHA256)
   */
  var token = jwt.sign(payload, secret);
  return token;
};

/**
 * Function to decode token
 * token?: string - token from req.header
 */
const verify = token => {
  /**
   * if token and secret key match, decode will contain user information
   */
  var decode = jwt.verify(token, secret);
  return decode;
};

module.exports = {
  sign,
  verify
};
