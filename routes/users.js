const express = require('express');
const router = express.Router();
const {registerUser, loginUser, putUser, changePass, logout, deleteUser} = require('../controllers/users');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/', putUser);
router.put('/change-password', changePass);
router.get('/logout', logout);
router.delete('/', deleteUser);

module.exports = router;