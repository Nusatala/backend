const express = require('express');

const router = express.Router();
const {nearbySearch} = require('../controllers/nearbySearch');

router.get('/', nearbySearch);


module.exports = router;