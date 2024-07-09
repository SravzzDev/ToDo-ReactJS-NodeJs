const db = require('../db');

const Task = {};

// Get all tasks
Task.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Add a task
Task.add = (task) => {
  const { title, description, status } = task;
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

// Delete a task
Task.delete = (taskId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

module.exports = Task;
