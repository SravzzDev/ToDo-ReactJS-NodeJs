import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const TaskFilter = ({ statusFilter, onStatusFilterChange }) => {
  return (
    <Select value={statusFilter} onChange={onStatusFilterChange} >
      <Option value="All">All</Option>
      <Option value="To Do">To Do</Option>
      <Option value="In Progress">In Progress</Option>
      <Option value="Done">Done</Option>
    </Select>
  );
};

export default TaskFilter;
