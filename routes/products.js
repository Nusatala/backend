const express = require('express');
const router = express.Router();
const {postProducts, getProductById, getAllProducts, getAllProductsByLabel, putProducts, deleteProducts} = require('../controllers/products');
const {verifyUser, verifyAdmin} = require('../middleware/auth');

router.get('/', verifyUser, getAllProducts);
router.get('/label/:id', verifyUser, getAllProductsByLabel);
router.post('/', verifyAdmin, postProducts);
router.get('/:id', verifyUser, getProductById);
router.put('/:id', verifyAdmin, putProducts);
router.delete('/:id', verifyAdmin, deleteProducts);

module.exports = router;