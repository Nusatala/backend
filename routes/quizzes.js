const express = require('express')
const router = express.Router()
const {getQuizzes, postQuizzes} = require('../controllers/quizzes')
const auth = require('../middleware/auth')

router.get('/', auth, getQuizzes)
router.post('/:level', auth, postQuizzes)


module.exports = router