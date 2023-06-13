const express = require('express')

const {getAllImages, getTwoImages, getImageById, createImage, uploadScanImages, updateImage, deleteImage} = require('../controllers/images')
const {verifyUser, verifyAdmin} = require('../middleware/auth')
const {uploadHandler} = require('../middleware/uploadImage')
const router = express.Router()

router.get('/', verifyUser, getAllImages)
router.get('/:label_id/2-images', verifyUser, getTwoImages)
router.get('/:id', verifyUser, getImageById)
router.post('/', verifyAdmin, createImage)
router.post('/scan', [verifyAdmin, uploadHandler.any()], uploadScanImages)
router.put('/:id', verifyAdmin, updateImage)
router.delete('/:id', verifyAdmin, deleteImage)

module.exports = router;
