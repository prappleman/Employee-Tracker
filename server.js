// Set up Express server.
// Require necessary modules and files like connection.js, api-routes.js, and models.
// Implement endpoints for handling user input and responding with data from the database.

const express = require('express');
const sequelize = require('./config/connection'); // Import Sequelize instance
const apiRoutes = require('./routes/api-routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});
