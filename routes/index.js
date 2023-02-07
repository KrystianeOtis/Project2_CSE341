const express = require('express');
const router = express.Router();



router.use('/books', require('./books'));
// router.use('/api-docs', require('./contacts'));

module.exports = router;
