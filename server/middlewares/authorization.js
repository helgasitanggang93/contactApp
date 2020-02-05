const Contact = require('../models/contact');
const User = require('../models/user');
const {verify} = require('../helpers/jwt')

const authorizationContact = (req, res, next) =>{
  if(req.headers.hasOwnProperty('token')){
    let payload = verify(req.headers.token, process.env.SECRET)
    let {email} = payload
    const {id} = req.params
    let promiseUser = User.findOne({email: email})
    let promiseContact = Contact.findOne({_id: id})
    Promise
    .all([promiseUser, promiseContact])
    .then(values => {
        const [user, Contact] = values
        if(String(user._id) === String(Contact.userId)){
            next()
        } else {
            throw({status: 401, message: 'Not belong to you'})
        }
    })
    .catch(next)
 }else {
    next({status: 401, message: 'Not Authorize'})
 }
}

module.exports = authorizationContact