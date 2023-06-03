const express = require('express');
const router = express.Router();
const {registerUser, loginUser, putUser, changePass, logout, deleteUser} = require('../controllers/users');
const {verifyUser} = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/', verifyUser, putUser);
router.put('/change-password', verifyUser, changePass);
router.get('/logout', verifyUser, logout);
router.delete('/', verifyUser, deleteUser);

module.exports = router;