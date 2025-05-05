const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const dataFile = path.join(__dirname, 'data/students.json');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Read and write helpers
function readStudents() {
  return JSON.parse(fs.readFileSync(dataFile));
}
function writeStudents(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// d) List all with count
app.get('/', (req, res) => {
  const students = readStudents();
  res.render('index', { students, count: students.length });
});

// e) DSBDA > 20
app.get('/dsbda', (req, res) => {
  const students = readStudents().filter(s => s.DSBDA_Marks > 20);
  res.render('index', { students, count: students.length });
});

// f) Update marks +10
app.get('/update/:roll', (req, res) => {
  const roll = parseInt(req.params.roll);
  const students = readStudents().map(s => {
    if (s.Roll_No === roll) {
      s.WAD_Marks += 10;
      s.CC_Marks += 10;
      s.DSBDA_Marks += 10;
      s.CNS_Marks += 10;
      s.AI_Marks += 10;
    }
    return s;
  });
  writeStudents(students);
  res.redirect('/');
});

// g) All > 25
app.get('/top', (req, res) => {
  const students = readStudents().filter(s =>
    s.WAD_Marks > 25 &&
    s.CC_Marks > 25 &&
    s.DSBDA_Marks > 25 &&
    s.CNS_Marks > 25 &&
    s.AI_Marks > 25
  );
  res.render('index', { students, count: students.length });
});

// h) WAD & CNS < 40
app.get('/low', (req, res) => {
  const students = readStudents().filter(s =>
    s.WAD_Marks < 40 && s.CNS_Marks < 40
  );
  res.render('index', { students, count: students.length });
});

// i) Delete student
app.get('/delete/:roll', (req, res) => {
  const roll = parseInt(req.params.roll);
  const students = readStudents().filter(s => s.Roll_No !== roll);
  writeStudents(students);
  res.redirect('/');
});

// j) Add new student form
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const students = readStudents();
  const newStudent = {
    Name: req.body.Name,
    Roll_No: parseInt(req.body.Roll_No),
    WAD_Marks: parseInt(req.body.WAD_Marks),
    CC_Marks: parseInt(req.body.CC_Marks),
    DSBDA_Marks: parseInt(req.body.DSBDA_Marks),
    CNS_Marks: parseInt(req.body.CNS_Marks),
    AI_Marks: parseInt(req.body.AI_Marks)
  };
  students.push(newStudent);
  writeStudents(students);
  res.redirect('/');
});

app.listen(3000, () => console.log('http://localhost:3000'));
