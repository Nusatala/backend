const express = require('express');
const router = express.Router();
const {registerUser, loginUser, putUser, changePass1, changePass2, logout, deleteUser} = require('../controllers/users');
const {verifyUser} = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/', verifyUser, putUser);
router.post('/change-password', changePass1);
router.put('/change-password/:token', changePass2);
router.get('/logout', verifyUser, logout);
router.delete('/', verifyUser, deleteUser);


module.exports = router;