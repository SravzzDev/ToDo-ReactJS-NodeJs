import React, { useState } from 'react';
import { List, Button, Select, Modal, Form, Input, message } from 'antd';
import { deleteTask, updateTask } from '../services/api';
import "../App.css"

const { Option } = Select;

const TaskList = ({ tasks, fetchAllTasks }) => {
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchAllTasks();
      message.success('Task deleted successfully');
    } catch (error) {
      console.error('Failed to delete task:', error);
      message.error('Failed to delete task');
    }
  };

  const handleStatusFilter = (value) => {
    setFilteredStatus(value);
  };

  const filteredTasks = tasks.filter(task => filteredStatus === 'All' || task.status === filteredStatus);

  const showEditModal = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTaskId(taskId);
    form.setFieldsValue(taskToEdit);
    setVisible(true);
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      await updateTask(editingTaskId, values);
      fetchAllTasks(); // Refetch tasks after update
      setVisible(false);
      message.success('Task updated successfully');
    } catch (error) {
      console.error('Failed to update task:', error);
      message.error('Failed to update task');
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="task-list">
      <h2 className='heading1'>Task List</h2>
      <Select defaultValue="All" onChange={handleStatusFilter} style={{ width: "105px" }}>
        <Option value="All">All</Option>
        <Option value="To Do">To Do</Option>
        <Option value="In Progress">In Progress</Option>
        <Option value="Done">Done</Option>
      </Select>
      <List
        itemLayout="horizontal"
        dataSource={filteredTasks}
        renderItem={task => (
          <List.Item
            actions={[
              <Button onClick={() => showEditModal(task.id)}>Edit</Button>,
              <Button onClick={() => handleDelete(task.id)}>Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={<div>{task.title}</div>}
              description={task.description}
            />
            <div>Status: {task.status}</div>
          </List.Item>
        )}
      />

     
      <Modal
        title="Edit Task"
        visible={visible}
        onOk={handleEdit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;
