const mongoose = require('mongoose');
const {Schema} = mongoose

const ContactSchema = new Schema({
    fullName: {type: String, required: [true, 'Name must be required']},
    address: {type: String, required: [true, 'Address must be required']},
    image: {type: String, default: 'https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg'},
    phoneNumber: {type: String, required: [true, 'Phone Number be required']},
    createdBy:{type: Schema.Types.ObjectId, ref: 'User'}
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact