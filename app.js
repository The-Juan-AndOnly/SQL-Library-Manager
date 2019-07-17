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
// Set static route
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.use('/books', require('./routes/books'));

// Set PORT to env port or localhost 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
