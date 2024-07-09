import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { addTask } from '../services/api';
import "../App.css"

const { Option } = Select;

const TaskForm = ({ addNewTask }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const newTask = await addTask(values);
      form.resetFields();
      message.success('Task added successfully');
      addNewTask(newTask); 
    } catch (error) {
      message.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">
      <h2 className='heading2'>Add Task</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} className='form-div'>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input.TextArea rows={4} placeholder='Enter your description here' />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          initialValue="To Do"
          rules={[{ required: true, message: 'Please select the status' }]}
        >
          <Select>
            <Option value="To Do">To Do</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Done">Done</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <div className="button-container">
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Task
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
