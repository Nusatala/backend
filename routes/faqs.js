const express = require('express');
const {createFaq, getFaqs, getById, UpdateFaq, deleteFaq} = require('../controllers/faqs');
const router = express.Router();
const {verifyUser, verifyAdmin} = require('../middleware/auth');

router.post('/', verifyAdmin, createFaq);
router.get('/', verifyUser, getFaqs);
router.get('/:id', verifyUser, getById);
router.put('/:id', verifyAdmin, UpdateFaq);
router.delete('/:id', verifyAdmin, deleteFaq);

module.exports = router;