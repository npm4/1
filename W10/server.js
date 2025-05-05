// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

let tasks = []; // In-memory tasks

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTask = { id: Date.now(), task };
    tasks.push(newTask);
    res.json(newTask);
  } else {
    res.status(400).json({ message: "Task is required" });
  }
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index !== -1 && task) {
    tasks[index].task = task;
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: "Task not found or invalid data" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});



// To run this server, you need to install the required packages
//npm install -g nodemon
//npm init -y
//npm install express body-parser cors
//node server.js