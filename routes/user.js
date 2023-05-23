const express = require('express')
const router = express.Router()
const {registerUser} = require('../controllers/user')

router.post('/users/register', registerUser)

module.exports = router