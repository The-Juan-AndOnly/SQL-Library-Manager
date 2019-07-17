const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Get Book List
router.get('/', (req, res) => {
  Book.findAll()
    .then(books => {
      console.log(books);
      res.render('index', { books });
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
  if (req.params.id !== undefined) {
    res.send(`The id of the book selected is ${req.params.id}`);
  } else {
    const err = new Error('Sorry but the Book id is not found');
    console.log(err);
  }
});

// Add a book
router.get('/add', (req, res) => {});

module.exports = router;
