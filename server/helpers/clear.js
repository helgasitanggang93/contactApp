const User = require("../models/user");
const Contact = require("../models/contact");

/**
 * this section on use for testing
 * very useful to delete or create data
 *
 */
const deleteAllUser = () => {
  if (process.env.NODE_ENV === "test") {
    User.deleteMany({})
      .then(() => {
        console.log("Users Collection cleared");
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const createUser = body => {
  if (process.env.NODE_ENV === "test") {
    const { email, password } = body;
    User.create({ email, password })
      .then(() => {
        console.log("user created");
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const deleteAllContact = () => {
  if (process.env.NODE_ENV === "test") {
    Contact.deleteMany({})
      .then(() => {
        console.log("Contacts Collection cleared");
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = {
  deleteAllContact,
  deleteAllUser,
  createUser
};
