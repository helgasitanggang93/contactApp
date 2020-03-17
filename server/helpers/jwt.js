const jwt = require("jsonwebtoken");

/**
 * Function to generate token
 * payload?: Object - User information
 */
const sign = payload => {
  /**
   * generate token with Synchronous sign (HMAC SHA256)
   */
  var token = jwt.sign(payload, process.env.SECRET);
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
  var decode = jwt.verify(token, process.env.SECRET);
  return decode;
};

module.exports = {
  sign,
  verify
};
