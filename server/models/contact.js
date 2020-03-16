const mongoose = require('mongoose');
const {Schema} = mongoose
const {messageHandler, stringType} = require('../helpers/constantType');

const ContactSchema = new Schema({
    fullName: {
      type: String, 
      required: [true, messageHandler.name.errNameEmpty],
      validate:[{
        validator: (value) => {
          let regex = /^[a-zA-Z ]*$/
          return regex.test(value)
        },
        message: messageHandler.name.errNameFormat
      }]
    },
    address: {
      type: String, 
      required: [true, messageHandler.address.errAddressEmpty],
      validate: [{
        validator: (value) => {
          if(value.length < 3 || value.length > 100){
            return false
          }else {
            return true
          }
        },
        message: messageHandler.address.errLengthAddress
      }]
    },
    image: {type: String, default: stringType.imageDefault},
    phoneNumber: {
      type: String, 
      required: [true, messageHandler.phoneNumber.errPhoneNumberEmpty],
      validate: [{
        validator: (value) => {
          let regex = /^[\d +]+$/;
          return regex.test(value)
        },
        message: messageHandler.phoneNumber.errPhoneNumberFormat
      }]},
    createdBy:{type: Schema.Types.ObjectId, ref: 'User'}
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact