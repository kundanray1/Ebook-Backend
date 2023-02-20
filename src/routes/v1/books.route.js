const express = require('express');
const multer = require('multer');

const bookController = require('../../controllers/book.controller');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.route('/').get(bookController.getBooks).post(upload.array('file', 12), bookController.createBook);

router.route('/:bookId').get(bookController.getBook).patch(bookController.updateBook).delete(bookController.deleteBook);

module.exports = router;
