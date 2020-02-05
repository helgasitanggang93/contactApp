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
          if(value.length < 3 || value.length > 150){
            return false
          }else {
            return true
          }
        }
      }]
    },
    image: {type: String, default: 'https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg'},
    phoneNumber: {
      type: String, 
      required: [true, 'Phone Number be required'],
      validate: [{
        validator: (value) => {
          let regex = /^[\d +]+$/;
          return regex.test(value)
        }
      }]},
    createdBy:{type: Schema.Types.ObjectId, ref: 'User'}
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact