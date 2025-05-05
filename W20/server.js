const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// View all employees
app.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.render('employees', { employees });
});

// Add new employee - form
app.get('/add', (req, res) => {
  res.send(`
    <form method="POST" action="/add">
      Name: <input name="name" /><br/>
      Department: <input name="department" /><br/>
      Designation: <input name="designation" /><br/>
      Salary: <input name="salary" type="number" /><br/>
      Joining Date: <input name="joiningDate" type="date" /><br/>
      <button type="submit">Add</button>
    </form>
  `);
});

// Add new employee - POST
app.post('/add', async (req, res) => {
  await Employee.create(req.body);
  res.redirect('/');
});

// Edit form
app.get('/edit/:id', async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  res.send(`
    <form method="POST" action="/edit/${emp._id}">
      Name: <input name="name" value="${emp.name}" /><br/>
      Department: <input name="department" value="${emp.department}" /><br/>
      Designation: <input name="designation" value="${emp.designation}" /><br/>
      Salary: <input name="salary" type="number" value="${emp.salary}" /><br/>
      Joining Date: <input name="joiningDate" type="date" value="${emp.joiningDate.toISOString().split('T')[0]}" /><br/>
      <button type="submit">Update</button>
    </form>
  `);
});

// Update employee
app.post('/edit/:id', async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// Delete employee
app.get('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
