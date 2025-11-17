import React, { useState } from 'react';
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
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2>My Profile</h2>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="profile-content">
          <div className="profile-field">
            <label>Name</label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            ) : (
              <p>{user?.name}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            ) : (
              <p>{user?.email}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Member Since</label>
            <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
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
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="cancel-button" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                className="edit-button" 
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button 
                className="logout-button" 
                onClick={handleLogout}
              >
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
