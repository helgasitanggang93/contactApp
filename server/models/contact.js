const mongoose = require("mongoose");
const { Schema } = mongoose;
const { messageHandler, stringType } = require("../helpers/constantType");

/**
 * Instance model for Contact
 * using mongoose middleware to create validation
 */
const ContactSchema = new Schema({
  fullName: {
    /**
     * type of fullname is string
     */
    type: String,
    /**
     * fullName must be required (can not empty)
     */
    required: [true, messageHandler.name.errNameEmpty],
    /**
     * manual validation
     * check fullName should contain alphabetic
     */
    validate: [
      {
        validator: value => {
          let regex = /^[a-zA-Z ]*$/;
          return regex.test(value);
        },
        message: messageHandler.name.errNameFormat
      }
    ]
  },
  address: {
    /**
     * type of address is string
     */
    type: String,
    /**
     * address must be required (can not empty)
     */
    required: [true, messageHandler.address.errAddressEmpty],
    /**
     * manual validation
     * check length of address should above 3 and below 101
     */
    validate: [
      {
        validator: value => {
          if (value.length < 3 || value.length > 100) {
            return false;
          } else {
            return true;
          }
        },
        message: messageHandler.address.errLengthAddress
      }
    ]
  },
  image: {
    /**
     * type of image is string
     */
    type: String,
    /**
     * image be able to empty however we set a default image (no image wallpaper) */

    default: stringType.imageDefault
  },
  phoneNumber: {
    /**
     * type of image is string
     */
    type: String,
    /**
     * adress must be required (can not empty)
     */

    required: [true, messageHandler.phoneNumber.errPhoneNumberEmpty],
    /**
     * manual validation
     * check phoneNumber format, should contain +
     */
    validate: [
      {
        validator: value => {
          let regex = /^[\d +]+$/;
          return regex.test(value);
        },
        message: messageHandler.phoneNumber.errPhoneNumberFormat
      }
    ]
  },
  /**
   * association with user
   */
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
