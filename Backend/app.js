// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');

// const app = express();
// const port = 5000;

// // MySQL Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // replace with your MySQL username
//   password: 'Pass1234$', // replace with your MySQL password
//   database: 'task_manager_db'
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connected to MySQL Database');
// });

// // Middleware
// app.use(bodyParser.json());

// // Routes
// // Get all tasks
// app.get('/api/tasks', (req, res) => {
//   db.query('SELECT * FROM tasks', (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });

// // Add a task
// app.post('/api/tasks', (req, res) => {
//   const { title, description, status } = req.body;
//   db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
//     [title, description, status],
//     (err, result) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.status(201).send('Task added successfully');
//       }
//     }
//   );
// });

// // Update a task
// app.put('/api/tasks/:id', (req, res) => {
//   const taskId = req.params.id;
//   const { title, description, status } = req.body;
//   db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
//     [title, description, status, taskId],
//     (err, result) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.status(200).send('Task updated successfully');
//       }
//     }
//   );
// });

// // Delete a task
// app.delete('/api/tasks/:id', (req, res) => {
//   const taskId = req.params.id;
//   db.query('DELETE FROM tasks WHERE id = ?', taskId, (err, result) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(200).send('Task deleted successfully');
//     }
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'Pass1234$', 
  database: 'task_manager_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('MySQL connected...');
});

// Routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
