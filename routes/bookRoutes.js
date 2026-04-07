const express = require ('express');
const bookcontroller = require('../controllers/bookController');
const router = express.Router();
router.post ('/books',bookcontroller.createBook);
router.get('/books', bookcontroller.getAllBooks);
//bonus
router.get('/title/:title', bookcontroller.getBookByTitle)
router.get('/books/:id', bookcontroller.getOneBook);
router.put('/books/:id', bookcontroller.updateBook);
router.put('/books/:id/borrow', bookcontroller.borrowBook);
router.put('/books/:id/return', bookcontroller.returnBook);
router.delete('/books/:id', bookcontroller.deleteBook);
module.exports = router;