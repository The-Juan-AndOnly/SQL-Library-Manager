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

// Add a book
router.get('/new', (req, res) => {
  res.render('new-book');
});

router.post('/new', (req, res) => {
  const { title, author, genre, year } = req.body;
  res.send(
    `Title: ${title}, Author: ${author}, Genre: ${genre}, Year: ${year}`
  );
});

router.get('/:id', (req, res) => {
  if (req.params.id !== undefined) {
    res.send(`The id of the book selected is ${req.params.id}`);
  } else {
    const err = new Error('Sorry but the Book id is not found');
    err.status = 400;

    res.render('error', { err });
  }
});

module.exports = router;
