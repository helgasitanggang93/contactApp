const mongoose = require('mongoose');
const {Schema} = mongoose
const {hash} = require('../helpers/bcrypt')
const {messageHandler} = require('../helpers/constantType');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, messageHandler.email.errEmailEmpty],
        validate: [{
            validator: (value) => {
                return User.model('User', userSchema)
                .findOne({email: value})
                .then(data =>{
                    if(data){
                        return false
                    }
                    return true
                })
                .catch(err =>{
                    if(err) return false
                })
            },
            message: messageHandler.email.errEmailExist
        }, {
            validator: (value) => {
                let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                return regex.test(value)
            },
            message : messageHandler.email.errEmailFormat
        }]
    },
    password: {type: String, required: [true, messageHandler.password]}
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    this.email = this.email.toLowerCase()
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User