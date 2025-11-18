import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = ({ onClose }) => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    streak: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const userTasks = tasks.filter(task => task.userId === user?.id);
    const completed = userTasks.filter(task => task.completed).length;
    
    setStats({
      totalTasks: userTasks.length,
      completedTasks: completed,
      pendingTasks: userTasks.length - completed,
      streak: calculateStreak(userTasks)
    });
  }, [user]);

  const calculateStreak = (tasks) => {
    // Simple streak calculation based on completed tasks
    return tasks.filter(t => t.completed).length > 0 ? 
      Math.min(Math.floor(tasks.filter(t => t.completed).length / 3), 30) : 0;
  };

  const handleSave = async () => {
    setMessage('');
    setError('');

    if (!name || !email) {
      setError('Name and email are required');
      return;
    }

    setLoading(true);
    const result = await updateProfile(name, email);
    setLoading(false);

    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError(result.message);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setIsEditing(false);
    setError('');
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
      onClose();
    }
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="avatar-badge">✓</div>
          </div>
          <h2>{user?.name}</h2>
          <p className="profile-subtitle">{user?.email}</p>
        </div>

        {message && <div className="success-message">
          <span className="message-icon">✓</span>
          {message}
        </div>}
        {error && <div className="error-message">
          <span className="message-icon">⚠</span>
          {error}
        </div>}

        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">👤</span>
            Profile
          </button>
          <button 
            className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <span className="tab-icon">📊</span>
            Stats
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="tab-icon">⚙️</span>
            Settings
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <div className="profile-field">
                <label>
                  <span className="field-icon">👤</span>
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    placeholder="Enter your name"
                  />
                ) : (
                  <p>{user?.name}</p>
                )}
              </div>

              <div className="profile-field">
                <label>
                  <span className="field-icon">📧</span>
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="Enter your email"
                  />
                ) : (
                  <p>{user?.email}</p>
                )}
              </div>

              <div className="profile-field">
                <label>
                  <span className="field-icon">📅</span>
                  Member Since
                </label>
                <p>{new Date(user?.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>

              <div className="profile-badges">
                <div className="badge-item">
                  <span className="badge-icon">🎯</span>
                  <span className="badge-label">Task Master</span>
                </div>
                <div className="badge-item">
                  <span className="badge-icon">🔥</span>
                  <span className="badge-label">{stats.streak} Day Streak</span>
                </div>
                <div className="badge-item">
                  <span className="badge-icon">⭐</span>
                  <span className="badge-label">Pro User</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="tab-content stats-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-value">{stats.totalTasks}</div>
                  <div className="stat-label">Total Tasks</div>
                </div>
                <div className="stat-card completed">
                  <div className="stat-icon">✅</div>
                  <div className="stat-value">{stats.completedTasks}</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat-card pending">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-value">{stats.pendingTasks}</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card streak">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-value">{stats.streak}</div>
                  <div className="stat-label">Day Streak</div>
                </div>
              </div>

              <div className="completion-rate">
                <div className="rate-header">
                  <span>Completion Rate</span>
                  <span className="rate-value">
                    {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="achievements">
                <h3>🏆 Achievements</h3>
                <div className="achievement-list">
                  <div className={`achievement ${stats.completedTasks >= 1 ? 'unlocked' : ''}`}>
                    <span className="achievement-icon">🎯</span>
                    <div className="achievement-info">
                      <div className="achievement-name">First Task</div>
                      <div className="achievement-desc">Complete your first task</div>
                    </div>
                  </div>
                  <div className={`achievement ${stats.completedTasks >= 10 ? 'unlocked' : ''}`}>
                    <span className="achievement-icon">💪</span>
                    <div className="achievement-info">
                      <div className="achievement-name">Task Warrior</div>
                      <div className="achievement-desc">Complete 10 tasks</div>
                    </div>
                  </div>
                  <div className={`achievement ${stats.streak >= 7 ? 'unlocked' : ''}`}>
                    <span className="achievement-icon">🔥</span>
                    <div className="achievement-info">
                      <div className="achievement-name">Week Streak</div>
                      <div className="achievement-desc">Maintain a 7-day streak</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content settings-content">
              <div className="settings-section">
                <h3>🎨 Appearance</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Dark Mode</div>
                    <div className="setting-desc">Toggle dark theme</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>🔔 Notifications</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Task Reminders</div>
                    <div className="setting-desc">Get reminded about pending tasks</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Email Notifications</div>
                    <div className="setting-desc">Receive updates via email</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>🎤 Voice</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-name">Voice Commands</div>
                    <div className="setting-desc">Enable voice control features</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="settings-section danger-zone">
                <h3>⚠️ Danger Zone</h3>
                <button className="danger-button">
                  <span>🗑️</span>
                  Delete All Tasks
                </button>
                <button className="danger-button">
                  <span>❌</span>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button 
                className="save-button" 
                onClick={handleSave}
                disabled={loading}
              >
                <span className="btn-icon">💾</span>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="cancel-button" 
                onClick={handleCancel}
                disabled={loading}
              >
                <span className="btn-icon">✖️</span>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                className="edit-button" 
                onClick={() => setIsEditing(true)}
              >
                <span className="btn-icon">✏️</span>
                Edit Profile
              </button>
              <button 
                className="logout-button" 
                onClick={handleLogout}
              >
                <span className="btn-icon">🚪</span>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
