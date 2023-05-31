const express = require('express');
const router = express.Router();
const {registerUser, loginUser, putUser, deleteUser} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', putUser);
router.delete('/', deleteUser);

module.exports = router;