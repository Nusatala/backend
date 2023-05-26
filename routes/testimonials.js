const express = require('express')
const {getTestimonials, getById, createTestimonial, updateTestimonial, deleteTestimonial} = require('../controllers/testimonials')
const router = express.Router()

router.get('/', getTestimonials)
router.get('/:id', getById)
router.post('/', createTestimonial)
router.put('/:id', updateTestimonial)
router.delete('/:id', deleteTestimonial)

module.exports = router