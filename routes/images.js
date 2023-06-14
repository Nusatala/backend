const express = require('express')

const {getAllImages, getTwoImages, getImageById, createImage, uploadScanImages, updateImage, deleteImage} = require('../controllers/images')
const {verifyUser, verifyAdmin} = require('../middleware/auth')
const {uploadHandler, uploadHandler2} = require('../middleware/uploadImage')
const router = express.Router()

router.get('/', verifyUser, getAllImages)
router.get('/:label_id/2-images', verifyUser, getTwoImages)
router.get('/:id', verifyUser, getImageById)
router.post('/', [verifyAdmin, uploadHandler2.any()], createImage)
router.post('/scan', [verifyUser, uploadHandler.any()], uploadScanImages)
router.put('/:id', verifyAdmin, updateImage)
router.delete('/:id', verifyAdmin, deleteImage)

module.exports = router;
