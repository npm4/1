const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (frontend)
app.use(express.static('public'));

// API endpoint to serve product data
app.get('/api/products', (req, res) => {
  fs.readFile('./products.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load product data' });
    }
    const products = JSON.parse(data);
    res.json(products);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
