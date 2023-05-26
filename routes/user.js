const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require('../controllers/users')

router.post('/users/register', registerUser)
router.post('/users/login', loginUser)

module.exports = router