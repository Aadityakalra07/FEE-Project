import React, { useState } from 'react';
import './AddTaskForm.css';

const AddTaskForm = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const priorityOptions = [
    { value: 'high', label: 'High Priority', icon: '🔴', color: '#ff6b6b' },
    { value: 'medium', label: 'Medium Priority', icon: '🟡', color: '#ffa500' },
    { value: 'low', label: 'Low Priority', icon: '🟢', color: '#4ecdc4' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText.trim(), priority);
      setTaskText('');
      setPriority('medium');
      setIsFocused(false);
    }
  };

  const selectedPriority = priorityOptions.find(p => p.value === priority);

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className={`form-group ${isFocused ? 'focused' : ''}`}>
        <div className="input-wrapper">
          <input
            type="text"
            className="task-input"
            placeholder="Type a task or use voice command..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {taskText && (
            <button
              type="button"
              className="clear-button"
              onClick={() => setTaskText('')}
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="custom-dropdown">
          <button
            type="button"
            className="dropdown-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ borderColor: selectedPriority.color }}
          >
            <span className="dropdown-icon">{selectedPriority.icon}</span>
            <span className="dropdown-text">{selectedPriority.label}</span>
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`dropdown-item ${priority === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    setPriority(option.value);
                    setIsDropdownOpen(false);
                  }}
                  style={{ 
                    borderLeft: `4px solid ${option.color}`,
                    background: priority === option.value ? `${option.color}15` : 'transparent'
                  }}
                >
                  <span className="dropdown-item-icon">{option.icon}</span>
                  <span className="dropdown-item-text">{option.label}</span>
                  {priority === option.value && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button type="submit" className="add-button" disabled={!taskText.trim()}>
          <span className="button-icon">➕</span>
          <span className="button-text">Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
