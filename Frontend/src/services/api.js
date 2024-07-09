import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/tasks'; 

export const fetchTasks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(BASE_URL, task);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${BASE_URL}/${taskId}`);
  return response.data;
};

export const updateTask = async (taskId, updatedTask) => {
  const response = await axios.put(`${BASE_URL}/${taskId}`, updatedTask);
  return response.data;
};
