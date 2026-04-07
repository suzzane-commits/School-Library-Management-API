const express = require ('express');
const authorcontroller = require('../controllers/authorController');
const router = express.Router();
router.post ('/authors',authorcontroller.createAuthor);
router.get('/authors', authorcontroller.getAllAuthors);
router.get('/authors/:id', authorcontroller.getAuthorbyId);
router.put('/authors/:id', authorcontroller.updateAuthor);
router.delete('/authors/:id', authorcontroller.deleteAuthor) 
module.exports = router;