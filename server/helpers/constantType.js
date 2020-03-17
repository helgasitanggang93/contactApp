/**
 * Storing error message
 */
const messageHandler = {
  err400message: "Bad Request",
  err401message: "Unauthorized Access",
  err403message: "Forbidden Access",
  err404message: "Page Not Found",
  err500message: "Internal Server Error",
  name: {
    errNameEmpty: "Name must be required",
    errNameFormat: "Full name only contain alphabetic"
  },
  address: {
    errAddressEmpty: "Address must be required",
    errLengthAddress:
      "Length of Address should be greater then 3 and less then 101"
  },
  phoneNumber: {
    errPhoneNumberEmpty: "Phone Number must be required",
    errPhoneNumberFormat: "Phone Number only contain Number and +"
  },
  email: {
    errEmailEmpty: "Email must be required",
    errEmailExist: "email already registered",
    errEmailFormat: "Invalid format email"
  },
  password: "Password must be required"
};

/**
 * Storing Default string
 */
const stringType = {
  imageDefault:
    "https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg"
};

module.exports = { messageHandler, stringType };
