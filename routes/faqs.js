const express = require('express')
const {createFaq, getFaqs, getById, UpdateFaq, deleteFaq} = require('../controllers/faqs')
const router = express.Router()

router.post('/', createFaq)
router.get('/', getFaqs)
router.get('/:id', getById)
router.put('/:id', UpdateFaq)
router.delete('/:id', deleteFaq)

module.exports = router