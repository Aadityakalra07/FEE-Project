import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, deleteTask, toggleTask, settings = {} }) => {
  // Filter tasks based on showCompleted setting
  let filteredTasks = tasks;
  if (settings.showCompleted === false) {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  // Sort tasks based on sortBy setting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (settings.sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (settings.sortBy === 'alphabetical') {
      return a.text.localeCompare(b.text);
    } else {
      // Default: sort by createdAt (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
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

  if (filteredTasks.length === 0 && tasks.length > 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✅</div>
        <h3>All tasks completed!</h3>
        <p>Great job! You've completed all your tasks.</p>
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
