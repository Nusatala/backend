const express = require('express')
const {getAllImages, getTwoImages, getImageById, createImage, updateImage, deleteImage} = require('../controllers/images')

const router = express.Router()

router.get('/', getAllImages)
router.get('/:label/2-images', getTwoImages)
router.get('/:id', getImageById)
router.post('/', createImage)
router.put('/:id', updateImage)
router.delete('/:id', deleteImage)

module.exports = router
