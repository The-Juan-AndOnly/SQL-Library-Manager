const express = require('express');
const path = require('path');
// Run Express Server
const app = express();
// Set PORT to env port or localhost 5000
const PORT = process.env.PORT || 5000;
// Import sequelize
const sequelize = require('./models').sequelize;

sequelize
  .authenticate()
  .then(() => console.log('Database connection successful.'))
  .catch(error => console.error(`Database connection error: ${error}`));

app.get('/', (req, res) => {
  res.send('Yooooooo');
});
//
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
