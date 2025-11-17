import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Profile from './Profile';
import './Navbar.css';

const Navbar = ({ currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/tasks', label: 'Tasks', icon: '✓' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎤</span>
          <span className="brand-text">VoiceTodo</span>
        </Link>
        
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Link>
          ))}
          <button 
            className="nav-link profile-btn"
            onClick={() => {
              setShowProfile(true);
              setMenuOpen(false);
            }}
            title="My Profile"
          >
            <span className="user-avatar">👤</span>
            <span className="nav-text">Profile</span>
          </button>
        </div>
      </div>
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </nav>
  );
};

export default Navbar;
