import React from 'react';
import './TodoItem.css';

const TodoItem = ({ task, deleteTask, toggleTask }) => {
  const priorityColors = {
    high: '#ff6b6b',
    medium: '#ffa500',
    low: '#4ecdc4'
  };

  const priorityIcons = {
    high: '🔴',
    medium: '🟡',
    low: '🟢'
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <div className="todo-text-section">
          <span className="todo-text">{task.text}</span>
          <div className="todo-meta">
            <span 
              className="priority-badge"
              style={{ background: priorityColors[task.priority] }}
            >
              {priorityIcons[task.priority]} {task.priority.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <button 
        className="delete-button"
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
      >
        🗑️
      </button>
    </div>
  );
};

export default TodoItem;
