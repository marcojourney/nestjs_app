// Import the Express.js framework
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
