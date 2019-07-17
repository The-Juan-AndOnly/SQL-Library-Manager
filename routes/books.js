const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Get Book List
router.get('/', (req, res) => {
  Book.findAll()
    .then(books => {
      res.render('index', { books });
    })
    .catch(err => console.log(err));
});

// Add a book
router.get('/new', (req, res) => {
  res.render('new-book');
});
// Post a New Book
router.post('/new', (req, res) => {
  const { title, author, genre, year } = req.body;
  Book.create({ title, author, genre, year })
    .then(book => res.redirect('/books'))
    .catch(err => console.log(err));
});
// Get Book information
router.get('/:id', (req, res) => {
  Book.findOne({
    where: { id: req.params.id }
  })
    .then(book => {
      console.log(book.title, book.author, book.genre, book.year);
      res.render('update-book', { book });
    })
    .catch(err => {
      // const err = new Error('Sorry but the Book id is not found');
      err.status = 400;
      console.log(err);
      res.render('error', { err });
    });
});
// Update Book information

//Delete Book

module.exports = router;
