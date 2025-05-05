const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const filePath = path.join(__dirname, 'data', 'songs.json');

// Helper to read JSON
function readSongs() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Helper to write JSON
function writeSongs(songs) {
  fs.writeFileSync(filePath, JSON.stringify(songs, null, 2));
}

// d) List all songs and count
app.get('/', (req, res) => {
  const songs = readSongs();
  res.render('songs', { songs, count: songs.length });
});

// e) List songs by Music Director
app.get('/director/:name', (req, res) => {
  const songs = readSongs().filter(s => s.Music_director === req.params.name);
  res.render('songs', { songs, count: songs.length });
});

// f) Songs by Director and Singer
app.get('/director/:director/singer/:singer', (req, res) => {
  const songs = readSongs().filter(s =>
    s.Music_director === req.params.director && s.Singer === req.params.singer
  );
  res.render('songs', { songs, count: songs.length });
});

// g) Delete song
app.get('/delete/:name', (req, res) => {
  const songs = readSongs().filter(s => s.Songname !== req.params.name);
  writeSongs(songs);
  res.redirect('/');
});

// h) Add song
app.get('/add', (req, res) => {
  res.send(`
    <form method="POST" action="/add">
      Songname: <input name="Songname" /><br/>
      Film: <input name="Film" /><br/>
      Music_director: <input name="Music_director" /><br/>
      Singer: <input name="Singer" /><br/>
      <button>Add</button>
    </form>
  `);
});

app.post('/add', (req, res) => {
  const songs = readSongs();
  songs.push(req.body);
  writeSongs(songs);
  res.redirect('/');
});

// i) Songs by film and singer
app.get('/film/:film/singer/:singer', (req, res) => {
  const songs = readSongs().filter(s =>
    s.Film === req.params.film && s.Singer === req.params.singer
  );
  res.render('songs', { songs, count: songs.length });
});

// j) Update a song (add actor/actress)
app.get('/update/:name', (req, res) => {
  const songs = readSongs().map(s => {
    if (s.Songname === req.params.name) {
      s.Actor = "Ranbir Kapoor";
      s.Actress = "Alia Bhatt";
    }
    return s;
  });
  writeSongs(songs);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
