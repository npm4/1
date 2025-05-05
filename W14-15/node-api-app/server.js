const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (e.g., frontend HTML, JS)
app.use(express.static('public'));

// API endpoint to get user data
app.get('/api/users', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error reading user data' });
    } else {
      res.json(JSON.parse(data));  // Respond with the user data in JSON format
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
