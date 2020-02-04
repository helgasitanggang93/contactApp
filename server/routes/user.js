const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/signup', UserController.signup)

module.exports = router