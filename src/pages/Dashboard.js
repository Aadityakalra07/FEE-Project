import React, { useMemo } from 'react';
import './Dashboard.css';
import Footer from '../components/Footer';

const Dashboard = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Calculate streak (days with completed tasks)
    const today = new Date().toDateString();
    const hasCompletedToday = tasks.some(t => 
      t.completed && new Date(t.createdAt).toDateString() === today
    );

    // Priority distribution
    const priorityCount = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    };

    return {
      total,
      completed,
      pending,
      highPriority,
      completionRate,
      hasCompletedToday,
      priorityCount
    };
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [tasks]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>📊 Dashboard</h1>
          <p className="dashboard-subtitle">Your productivity at a glance</p>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>

          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          <div className="stat-card priority">
            <div className="stat-icon">🔴</div>
            <div className="stat-content">
              <div className="stat-value">{stats.highPriority}</div>
              <div className="stat-label">High Priority</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="dashboard-row">
          <div className="dashboard-card completion-card">
            <h2>Completion Rate</h2>
            <div className="completion-circle">
              <svg viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="20"
                  strokeDasharray={`${stats.completionRate * 5.03} 503`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="completion-text">
                <span className="completion-percentage">{stats.completionRate}%</span>
                <span className="completion-label">Complete</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card priority-breakdown">
            <h2>Priority Breakdown</h2>
            <div className="priority-bars">
              <div className="priority-bar-item">
                <div className="priority-bar-label">
                  <span>🔴 High</span>
                  <span>{stats.priorityCount.high}</span>
                </div>
                <div className="priority-bar-track">
                  <div 
                    className="priority-bar-fill high"
                    style={{ width: `${stats.total > 0 ? (stats.priorityCount.high / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="priority-bar-item">
                <div className="priority-bar-label">
                  <span>🟡 Medium</span>
                  <span>{stats.priorityCount.medium}</span>
                </div>
                <div className="priority-bar-track">
                  <div 
                    className="priority-bar-fill medium"
                    style={{ width: `${stats.total > 0 ? (stats.priorityCount.medium / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="priority-bar-item">
                <div className="priority-bar-label">
                  <span>🟢 Low</span>
                  <span>{stats.priorityCount.low}</span>
                </div>
                <div className="priority-bar-track">
                  <div 
                    className="priority-bar-fill low"
                    style={{ width: `${stats.total > 0 ? (stats.priorityCount.low / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="dashboard-card recent-tasks">
          <h2>Recent Tasks</h2>
          {recentTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Start by adding your first task! 🚀</p>
            </div>
          ) : (
            <div className="recent-tasks-list">
              {recentTasks.map(task => (
                <div key={task.id} className={`recent-task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-checkbox">
                    {task.completed ? '✓' : '○'}
                  </div>
                  <div className="task-info">
                    <span className="task-name">{task.text}</span>
                    <span className={`task-priority ${task.priority}`}>
                      {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => window.location.href = '/tasks'}>
              <span className="action-icon">➕</span>
              <span>Add Task</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/calendar'}>
              <span className="action-icon">📅</span>
              <span>View Calendar</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/settings'}>
              <span className="action-icon">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
