const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/books');


router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.getAddBook);

router.put('/:id', contactsController.updateBook);

router.delete('/:id', contactsController.deleteBook);

module.exports = router;
