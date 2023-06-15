const express = require('express')
const {getTestimonials, getById, createTestimonial, updateTestimonial, deleteTestimonial} = require('../controllers/testimonials')
const router = express.Router()
const {verifyUser} = require('../middleware/auth')

router.get('/', verifyUser, getTestimonials)
router.get('/:id', verifyUser, getById)
router.post('/', verifyUser, createTestimonial)
router.put('/:id', verifyUser, updateTestimonial)
router.delete('/:id', verifyUser, deleteTestimonial)

module.exports = router