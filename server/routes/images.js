const router = require('express').Router()
const ImageController = require('../controllers/image')
const upload  = require('../middlewares/images')

router.post('/upload', upload.single('image'), ImageController.imageUpload);

module.exports = router