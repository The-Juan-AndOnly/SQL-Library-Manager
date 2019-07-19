const express = require('express');
const path = require('path');

// Run Express Server
const app = express();

// Import sequelize
const sequelize = require('./models').sequelize;
// Test DB
sequelize
  .authenticate()
  .then(() => console.log('Database connection successful.'))
  .catch(error => console.error(`Database connection error: ${error}`));

// Setup Pug as View engine
app.set('view engine', 'pug');

//Express built in Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static route
app.use(express.static(path.join(__dirname, 'public')));

// Redirect from '/' to '/books'
app.get('/', (req, res) => {
  res.redirect('/books');
});

// Use the books route
app.use('/books', require('./routes/books'));

// Error handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(`Sorry ${err.status} ${err.message}. Try Again.`);
  res.render('page-not-found', { err });
});

// Set PORT to env port or localhost 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
