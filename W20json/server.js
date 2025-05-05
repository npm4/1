const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const dataFile = path.join(__dirname, 'data/employees.json');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Helper functions
function readData() {
  return JSON.parse(fs.readFileSync(dataFile));
}
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// View all employees
app.get('/', (req, res) => {
  const employees = readData();
  res.render('index', { employees });
});

// Add form
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle add
app.post('/add', (req, res) => {
  const employees = readData();
  const newEmp = {
    id: Date.now(),
    name: req.body.name,
    department: req.body.department,
    designation: req.body.designation,
    salary: parseFloat(req.body.salary),
    joiningDate: req.body.joiningDate
  };
  employees.push(newEmp);
  writeData(employees);
  res.redirect('/');
});

// Edit form
app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employees = readData();
  const employee = employees.find(e => e.id === id);
  res.render('edit', { employee });
});

// Handle edit
app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employees = readData().map(emp => {
    if (emp.id === id) {
      emp.name = req.body.name;
      emp.department = req.body.department;
      emp.designation = req.body.designation;
      emp.salary = parseFloat(req.body.salary);
      emp.joiningDate = req.body.joiningDate;
    }
    return emp;
  });
  writeData(employees);
  res.redirect('/');
});

// Delete
app.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employees = readData().filter(e => e.id !== id);
  writeData(employees);
  res.redirect('/');
});

app.listen(3000, () => console.log('http://localhost:3000'));
