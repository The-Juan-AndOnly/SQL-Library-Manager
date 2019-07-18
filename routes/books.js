const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Get Book List
router.get('/', (req, res) => {
  Book.findAll({ order: [['title', 'ASC']] })
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
  let errors = [];
  // Validate Fields
  if (!title) {
    errors.push({ text: 'Title is required' });
  }
  if (!author) {
    errors.push({ text: 'Author is required' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('new-book', { errors, title, author, genre, year });
  } else {
    Book.create({ title, author, genre, year })
      .then(book => res.redirect('/books'))
      .catch(err => console.log(err));
  }
});
// Get Book information
router.get('/:id', (req, res) => {
  Book.findOne({
    where: { id: req.params.id }
  })
    .then(book => {
      res.render('update-book', { book });
    })
    .catch(err => {
      err.status = 400;
      console.log(
        `Sorry the book ID: ${req.params.id} you are looking for does not exist`
      );
      res.render('error', { err });
    });
});
// Update Book information
router.post('/:id', (req, res) => {
  const { title, author, genre, year } = req.body;
  let errors = [];
  // Validate Fields
  if (!title) {
    errors.push({ text: 'Title is required' });
  }
  if (!author) {
    errors.push({ text: 'Author is required' });
  }
  console.log(errors);
  // Check for errors

  Book.findOne({ where: { id: req.params.id } })
    .then(book => {
      if (errors.length > 0) {
        res.render('update-book', { errors, book, title, author, genre, year });
      } else {
        book.update(req.body);
      }
    })
    .then(() => res.redirect('/books'))
    .catch(err => console.log('Eror Updating Book'));
});
//Delete Book
router.post('/:id/delete', (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then(book => book.destroy())
    .then(() => res.redirect('/books'));
});

module.exports = router;
