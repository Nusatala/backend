const express = require('express')
const router = express.Router()
const {getQuizzes, postQuizzes, getQuestions, postQuestions, putQuestions, deleteQuestions} = require('../controllers/quizzes')
const {verifyUser, verifyAdmin} = require('../middleware/auth')

router.get('/', verifyUser, getQuizzes)
router.post('/:level', verifyAdmin, postQuizzes)

router.get('/:level/questions/:id', verifyUser, getQuestions)
router.post('/:level/questions', verifyAdmin, postQuestions)
router.put('/:level/questions/:id', verifyAdmin, putQuestions)
router.delete('/:level/questions/:id', verifyAdmin, deleteQuestions)


module.exports = router