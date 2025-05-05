const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch employees.json
app.get('/api/employees', (req, res) => {
  const filePath = path.join(__dirname, '/data', 'employees.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Could not read employee data' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
