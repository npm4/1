const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/song');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Insert initial songs only once
// Uncomment for first time then comment again

Song.insertMany([
    { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", Singer: "Arijit Singh" },
    { Songname: "Kun Faya Kun", Film: "Rockstar", Music_director: "A.R. Rahman", Singer: "Mohit Chauhan" },
    { Songname: "Kal Ho Naa Ho", Film: "Kal Ho Naa Ho", Music_director: "Shankar-Ehsaan-Loy", Singer: "Sonu Nigam" },
    { Songname: "Channa Mereya", Film: "Ae Dil Hai Mushkil", Music_director: "Pritam", Singer: "Arijit Singh" },
    { Songname: "Tera Ban Jaunga", Film: "Kabir Singh", Music_director: "Akhil Sachdeva", Singer: "Tulsi Kumar" }
])
.then(() => console.log("Songs added"))
.catch(err => console.log(err));


// d) Count and list all
app.get('/', async (req, res) => {
    const count = await Song.countDocuments();
    const songs = await Song.find();
    res.render('songs', { count, songs });
});

// e) List by Music Director
app.get('/director/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.render('songs', { count: songs.length, songs });
});

// f) Music Director + Singer
app.get('/director/:director/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        Music_director: req.params.director,
        Singer: req.params.singer
    });
    res.render('songs', { count: songs.length, songs });
});

// g) Delete by Song Name
app.get('/delete/:song', async (req, res) => {
    await Song.deleteOne({ Songname: req.params.song });
    res.redirect('/');
});

// h) Add new song (via form or hardcoded)
app.get('/add', (req, res) => {
    res.send(`
        <form method="POST" action="/add">
            Song: <input name="Songname" /><br/>
            Film: <input name="Film" /><br/>
            Director: <input name="Music_director" /><br/>
            Singer: <input name="Singer" /><br/>
            <button type="submit">Add Song</button>
        </form>
    `);
});

app.post('/add', async (req, res) => {
    await Song.create(req.body);
    res.redirect('/');
});

// i) Singer + Film
app.get('/film/:film/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        Film: req.params.film,
        Singer: req.params.singer
    });
    res.render('songs', { count: songs.length, songs });
});

// j) Update song: Add Actor/Actress
app.get('/update/:song', async (req, res) => {
    await Song.updateOne(
        { Songname: req.params.song },
        { Actor: "Ranbir Kapoor", Actress: "Deepika Padukone" }
    );
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
