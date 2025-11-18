import React, { useState, useMemo } from 'react';
import './Calendar.css';
import Footer from '../components/Footer';

const Calendar = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay, daysInMonth };
  };

  const getTasksForDate = (date) => {
    const dateStr = date.toDateString();
    return tasks.filter(task => 
      new Date(task.createdAt).toDateString() === dateStr
    );
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Month View
  const renderMonthView = () => {
    const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayTasks = getTasksForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
          <div className="day-number">{day}</div>
          {dayTasks.length > 0 && (
            <div className="day-tasks">
              {dayTasks.slice(0, 2).map(task => (
                <div 
                  key={task.id} 
                  className={`task-dot ${task.priority} ${task.completed ? 'completed' : ''}`}
                  title={task.text}
                >
                  {task.text.slice(0, 15)}{task.text.length > 15 ? '...' : ''}
                </div>
              ))}
              {dayTasks.length > 2 && (
                <div className="more-tasks">+{dayTasks.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  // Week View
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dayTasks = getTasksForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div key={i} className={`week-day ${isToday ? 'today' : ''}`}>
          <div className="week-day-header">
            <div className="week-day-name">{dayNames[i]}</div>
            <div className="week-day-number">{date.getDate()}</div>
          </div>
          <div className="week-day-tasks">
            {dayTasks.length === 0 ? (
              <div className="no-tasks">No tasks</div>
            ) : (
              dayTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`week-task ${task.priority} ${task.completed ? 'completed' : ''}`}
                >
                  <div className="task-time">
                    {new Date(task.createdAt).toLocaleTimeString('en-US', 
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                  </div>
                  <div className="task-content">
                    <span className="task-priority-icon">
                      {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                    </span>
                    {task.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  // Day View
  const renderDayView = () => {
    const dayTasks = getTasksForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="day-view-container">
        <div className="day-header">
          <h3>{currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</h3>
          <div className="day-stats">
            <span className="stat-badge">{dayTasks.length} Tasks</span>
            <span className="stat-badge">{dayTasks.filter(t => t.completed).length} Completed</span>
          </div>
        </div>
        
        <div className="day-timeline">
          {dayTasks.length === 0 ? (
            <div className="no-tasks-message">
              <div className="empty-icon">📭</div>
              <p>No tasks for this day</p>
            </div>
          ) : (
            <div className="day-tasks-list">
              {dayTasks.map(task => (
                <div key={task.id} className={`day-task-card ${task.completed ? 'completed' : ''}`}>
                  <div className={`task-priority-bar ${task.priority}`}></div>
                  <div className="task-card-content">
                    <div className="task-card-header">
                      <div className="task-check">
                        {task.completed ? '✓' : '○'}
                      </div>
                      <span className={`priority-badge ${task.priority}`}>
                        {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                        {task.priority}
                      </span>
                    </div>
                    <h4 className="task-card-title">{task.text}</h4>
                    <div className="task-card-time">
                      Created: {new Date(task.createdAt).toLocaleTimeString('en-US', 
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <header className="calendar-header">
          <div className="header-left">
            <h1>📅 Calendar</h1>
            <p className="calendar-subtitle">
              {view === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
              {view === 'week' && `Week of ${currentDate.toLocaleDateString()}`}
              {view === 'day' && currentDate.toLocaleDateString()}
            </p>
          </div>

          <div className="header-controls">
            <button className="today-btn" onClick={goToToday}>Today</button>
            
            <div className="nav-buttons">
              <button 
                className="nav-btn" 
                onClick={() => view === 'month' ? navigateMonth(-1) : 
                               view === 'week' ? navigateWeek(-1) : 
                               navigateWeek(-1)}
              >
                ◀
              </button>
              <button 
                className="nav-btn" 
                onClick={() => view === 'month' ? navigateMonth(1) : 
                               view === 'week' ? navigateWeek(1) : 
                               navigateWeek(1)}
              >
                ▶
              </button>
            </div>

            <div className="view-selector">
              <button 
                className={`view-btn ${view === 'month' ? 'active' : ''}`}
                onClick={() => setView('month')}
              >
                Month
              </button>
              <button 
                className={`view-btn ${view === 'week' ? 'active' : ''}`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={`view-btn ${view === 'day' ? 'active' : ''}`}
                onClick={() => setView('day')}
              >
                Day
              </button>
            </div>
          </div>
        </header>

        <div className="calendar-content">
          {view === 'month' && (
            <div className="month-view">
              <div className="weekday-headers">
                {dayNames.map(day => (
                  <div key={day} className="weekday-header">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {renderMonthView()}
              </div>
            </div>
          )}

          {view === 'week' && (
            <div className="week-view">
              {renderWeekView()}
            </div>
          )}

          {view === 'day' && renderDayView()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;
