const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hash } = require("../helpers/bcrypt");
const { messageHandler } = require("../helpers/constantType");

/**
 * Instance model for Contact
 * using mongoose middleware to create validation
 */
const userSchema = new Schema({
  email: {
    /**
     * type of email is string
     */
    type: String,
    /**
     * email must be required (can not empty)
     */
    required: [true, messageHandler.email.errEmailEmpty],
    /**
     * manual validation
     * check email should unique
     * check proper format email
     */
    validate: [
      {
        validator: value => {
          return User.model("User", userSchema)
            .findOne({ email: value })
            .then(data => {
              if (data) {
                return false;
              }
              return true;
            })
            .catch(err => {
              if (err) return false;
            });
        },
        message: messageHandler.email.errEmailExist
      },
      {
        validator: value => {
          let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
          return regex.test(value);
        },
        message: messageHandler.email.errEmailFormat
      }
    ]
  },
  password: {
    /**
     * type of password is string
     */
    type: String,
    /**
     * password must be required (can not empty)
     */
    required: [true, messageHandler.password]
  }
});

/**
 * mongoose middleware before execute create
 * hash password
 */
userSchema.pre("save", function(next) {
  this.password = hash(this.password);
  this.email = this.email.toLowerCase();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
