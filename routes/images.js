const express = require('express')
const {getAllImages, getTwoImages, getImageById, createImage, updateImage, deleteImage} = require('../controllers/images')
const router = express.Router()
const {verifyUser, verifyAdmin} = require('../middleware/auth')

router.get('/', verifyUser, getAllImages)
router.get('/:label/2-images', verifyUser, getTwoImages)
router.get('/:id', verifyUser, getImageById)
router.post('/', verifyAdmin, createImage)
router.put('/:id', verifyAdmin, updateImage)
router.delete('/:id', verifyAdmin, deleteImage)

module.exports = router
