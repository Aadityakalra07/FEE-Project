import React from 'react';
import './Settings.css';
import Footer from '../components/Footer';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const { settings, updateSetting, resetSettings, showNotification } = useSettings();

  const handleChange = (key, value) => {
    updateSetting(key, value);
    showNotification('Settings Updated', `${key} has been changed`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      resetSettings();
      showNotification('Settings Reset', 'All settings have been restored to default');
    }
  };

  const handleClearData = () => {
    if (window.confirm('This will delete all your tasks. Are you sure?')) {
      localStorage.removeItem('todos');
      showNotification('Data Cleared', 'All tasks have been deleted');
      window.location.reload(); // Reload to reflect changes
    }
  };

  const handleExportData = () => {
    const tasks = localStorage.getItem('todos');
    if (!tasks) {
      alert('No tasks to export!');
      return;
    }
    
    const dataStr = JSON.stringify(JSON.parse(tasks), null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `voicetodo-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Export Complete', 'Your tasks have been exported');
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <h1>⚙️ Settings</h1>
          <p className="settings-subtitle">Customize your experience</p>
        </header>

        {/* Notifications */}
        <div className="settings-section">
          <h2 className="section-title">🔔 Notifications</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>Enable Notifications</label>
              <p className="setting-description">Get notified about task updates</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Voice Settings */}
        <div className="settings-section">
          <h2 className="section-title">🎤 Voice Control</h2>
          <div className="setting-item">
            <div className="setting-info">
              <label>Voice Feedback</label>
              <p className="setting-description">Hear spoken confirmations</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.voiceFeedback}
                onChange={(e) => handleChange('voiceFeedback', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Task Management */}
        <div className="settings-section">
          <h2 className="section-title">📋 Task Management</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>Auto-delete Completed Tasks</label>
              <p className="setting-description">Automatically remove completed tasks after 7 days</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.autoDelete}
                onChange={(e) => handleChange('autoDelete', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Show Completed Tasks</label>
              <p className="setting-description">Display completed tasks in the list</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.showCompleted}
                onChange={(e) => handleChange('showCompleted', e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Default Sort Order</label>
              <p className="setting-description">How tasks should be organized</p>
            </div>
            <select
              className="setting-select"
              value={settings.sortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
            >
              <option value="createdAt">Date Created</option>
              <option value="priority">Priority Level</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-section danger-section">
          <h2 className="section-title">💾 Data Management</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>Export Tasks</label>
              <p className="setting-description">Download your tasks as JSON</p>
            </div>
            <button className="action-button export-btn" onClick={handleExportData}>
              📥 Export
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Clear All Data</label>
              <p className="setting-description">Delete all tasks permanently</p>
            </div>
            <button className="action-button danger-btn" onClick={handleClearData}>
              🗑️ Clear
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Reset Settings</label>
              <p className="setting-description">Restore default settings</p>
            </div>
            <button className="action-button reset-btn" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="settings-section info-section">
          <h2 className="section-title">ℹ️ About</h2>
          <div className="app-info">
            <div className="info-row">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="info-row">
              <span>Build</span>
              <span>2024.01</span>
            </div>
            <div className="info-row">
              <span>Developer</span>
              <span>VoiceTodo Team</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
