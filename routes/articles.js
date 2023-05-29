const express = require('express')
const {getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle} = require('../controllers/articles')
const router = express.Router()

router.get('/', getAllArticles)
router.get('/:id', getArticleById)
router.post('/', createArticle)
router.put('/:id', updateArticle)
router.delete('/:id', deleteArticle)

module.exports = router