const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const TASKS_FILE = 'tasks.json';

// Settinf the Middlewares 
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// check for tasks file on startup, or  creatig  empty one if missing
if (!fs.existsSync(TASKS_FILE)) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
}

// Helper function to read tasks
function readTasks() {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write tasks
function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// API Endpoints
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});


// Get all homework tasks

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task is required' });
  }

  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    task: task.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  writeTasks(tasks);
  
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});