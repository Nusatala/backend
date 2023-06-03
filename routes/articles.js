const express = require('express');
const {getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle} = require('../controllers/articles');
const router = express.Router();
const {verifyUser, verifyAdmin} = require('../middleware/auth');

router.get('/', verifyUser, getAllArticles);
router.get('/:id', verifyUser, getArticleById);
router.post('/', verifyAdmin, createArticle);
router.put('/:id', verifyAdmin, updateArticle);
router.delete('/:id', verifyAdmin, deleteArticle);

module.exports = router;