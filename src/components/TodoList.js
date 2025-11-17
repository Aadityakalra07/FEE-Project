import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, deleteTask, toggleTask }) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet!</h3>
        <p>Add a task using voice command or the form above</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {sortedTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
