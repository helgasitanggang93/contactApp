const router = require('express').Router();
const ContactController = require('../controllers/contact');
const {authenticationCommon, authenticationContact} = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/', authenticationContact, ContactController.create);
router.get('/', authenticationContact, ContactController.readAll);
router.get('/:id', authenticationCommon, ContactController.readOne);
router.patch('/:id', authenticationCommon, authorization, ContactController.update);
module.exports = router