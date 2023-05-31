const express = require('express')
const router = express.Router()
const {getQuizzes, postQuizzes, getQuestions, postQuestions, putQuestions, deleteQuestions} = require('../controllers/quizzes')
const auth = require('../middleware/auth')

router.get('/', auth, getQuizzes)
router.post('/:level', auth, postQuizzes)

router.get('/:level/questions/:id', auth, getQuestions)
router.post('/:level/questions', auth, postQuestions)
router.put('/:level/questions/:id', auth, putQuestions)
router.delete('/:level/questions/:id', auth, deleteQuestions)


module.exports = router