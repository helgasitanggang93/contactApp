const router = require('express').Router()
const userRoute = require('./user')
const contactRoute = require('./contact')

router.use('/users', userRoute)
router.use('/contacts', contactRoute)

module.exports = router