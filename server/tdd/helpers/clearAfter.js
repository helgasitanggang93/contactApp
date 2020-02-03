const User = require('../../models/user');
const Contact = require('../../models/contact');

module.exports = {
  deleteAllUser: () => {
    if(process.env.NODE_ENV === 'test'){
      User
      .deleteMany({})
      .then(() => {
        console.log('Users Collection cleared');
        
      })
      .catch(err => {
        console.log(err);
        
      })
    }
  },
  deleteAllContact: ()=> {
    if(process.env.NODE_ENV === 'test'){
      Contact
      .deleteMany({})
      .then(() => {
        console.log('Contacts Collection cleared');
        
      })
      .catch(err => {
        console.log(err);
        
      })
    }

  }
}