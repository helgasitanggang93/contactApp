const mongoose = require('mongoose');
const {Schema} = mongoose

const ContactSchema = new Schema({
    fullName: {
      type: String, 
      required: [true, 'Name must be required'],
      validate:[{
        validator: (value) => {
          let regex = /^[a-zA-Z ]*$/
          return regex.test(value)
        },
        message: 'Full name only contain alphabetic'
      }]
    },
    address: {
      type: String, 
      required: [true, 'Address must be required'],
      validate: [{
        validator: (value) => {
          if(value.length < 3 || value.length > 100){
            return false
          }else {
            return true
          }
        },
        message: 'Length of Address should be greater then 3 and less then 101'
      }]
    },
    image: {type: String, default: 'https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg'},
    phoneNumber: {
      type: String, 
      required: [true, 'Phone Number must be required'],
      validate: [{
        validator: (value) => {
          let regex = /^[\d +]+$/;
          return regex.test(value)
        },
        message: 'Phone Number only contain Number and +'
      }]},
    createdBy:{type: Schema.Types.ObjectId, ref: 'User'}
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact