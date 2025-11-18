import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      navigate('/');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="avatar-badge">✓</div>
            </div>
            <h1>{user?.name}</h1>
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

          <div className="profile-content">
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
              </div>
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
    </div>
  );
};

export default ProfilePage;
