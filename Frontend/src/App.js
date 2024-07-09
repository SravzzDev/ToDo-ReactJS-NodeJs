import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { fetchTasks } from './services/api';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const addNewTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="container">
      <h1 className="main">Task Management Application</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <TaskForm addNewTask={addNewTask} />
        </div>
        <div className="col-12 col-md-6">
          <TaskList tasks={tasks} fetchAllTasks={fetchAllTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
