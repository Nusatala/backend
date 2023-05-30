const express = require('express')
const router = express.Router()
const {getQuizzes, postQuizzes} = require('../controllers/users')

router.get('/quizzes/:level', getQuizzes)
router.post('/quizzes/:level', postQuizzes)

module.exports = router