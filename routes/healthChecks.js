const express = require('express');
const router = express.Router();
const {healthCheck} = require('../controllers/healthChecks');

router.get('/', healthCheck);


module.exports = router;