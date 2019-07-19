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

// Get New Book Form
router.get('/new', (req, res) => {
  res.render('new-book', { book: Book.build() });
});

// Post a New Book to the DB
router.post('/new', (req, res, next) => {
  const { title, author, genre, year } = req.body;

  Book.create({ title, author, genre, year })
    .then(book => res.redirect('/books'))
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        res.render('new-book', {
          errors: err.errors,
          book: Book.build(req.body)
        });
      } else {
        throw err;
      }
    })
    .catch(err => {
      err.status = 500;
      next(err);
    });
  // }
});

// Get A single Book information
router.get('/:id', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      if (book) {
        res.render('update-book', { book });
      } else {
        const error = new Error('Book Not Found');
        error.status = 400;
        res.render('error', { error });
      }
    })
    .catch(err => {
      res.send(500);
      next(err);
    });
});

// Update A Single Book information
router.post('/:id', (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => book.update(req.body))
    .then(() => res.redirect('/books'))
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let book = Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {
          book,
          errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch(err => {
      err.status = 500;
      next(err);
    });
});

//Delete A Book from the DB
router.post('/:id/delete', (req, res) => {
  Book.findOne({ where: { id: req.params.id } })
    .then(book => {
      if (book) {
        book.destroy();
      } else {
        res.render('error');
      }
    })
    .then(() => res.redirect('/books'));
});

module.exports = router;
