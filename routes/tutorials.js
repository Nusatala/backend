const express = require('express');
const {getAllTutorials, getTutorialById, getTutorialByLabel, createTutorial, updateTutorial, deleteTutorial} = require('../controllers/tutorials');
const router = express.Router();
const {verifyUser, verifyAdmin} = require('../middleware/auth');

router.get('/', verifyUser, getAllTutorials);
router.get('/:id', verifyUser, getTutorialById);
router.get('/:label_id', verifyUser, getTutorialByLabel);
router.post('/', verifyAdmin, createTutorial);
router.put('/:id', verifyAdmin, updateTutorial);
router.delete('/:id', verifyAdmin, deleteTutorial);

module.exports = router;