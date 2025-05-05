const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');
const app = express();

mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Home - List all books
app.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('books', { books });
});

// Add form
app.get('/add', (req, res) => {
    res.render('form', { book: {}, action: '/add', buttonText: 'Add Book' });
});

// Add book
app.post('/add', async (req, res) => {
    await Book.create(req.body);
    res.redirect('/');
});

// Edit form
app.get('/edit/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('form', { book, action: '/edit/' + req.params.id, buttonText: 'Update Book' });
});

// Update book
app.post('/edit/:id', async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// Delete book
app.get('/delete/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
