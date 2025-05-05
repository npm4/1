const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const dataFile = path.join(__dirname, 'data/books.json');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Utility functions
function readData() {
  return JSON.parse(fs.readFileSync(dataFile));
}
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// View all books
app.get('/', (req, res) => {
  const books = readData();
  res.render('index', { books });
});

// Add form
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle add
app.post('/add', (req, res) => {
  const books = readData();
  const newBook = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    price: parseFloat(req.body.price),
    genre: req.body.genre
  };
  books.push(newBook);
  writeData(books);
  res.redirect('/');
});

// Edit form
app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = readData().find(b => b.id === id);
  res.render('edit', { book });
});

// Handle edit
app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBooks = readData().map(book => {
    if (book.id === id) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.price = parseFloat(req.body.price);
      book.genre = req.body.genre;
    }
    return book;
  });
  writeData(updatedBooks);
  res.redirect('/');
});

// Delete book
app.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const books = readData().filter(book => book.id !== id);
  writeData(books);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
