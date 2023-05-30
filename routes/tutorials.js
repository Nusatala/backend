const express = require('express')
const {getAllTutorials, getTutorialById, createTutorial, updateTutorial, deleteTutorial} = require('../controllers/tutorials')
const router = express.Router()

router.get('/', getAllTutorials)
router.get('/:id', getTutorialById)
router.post('/', createTutorial)
router.put('/:id', updateTutorial)
router.delete('/:id', deleteTutorial)

module.exports = router