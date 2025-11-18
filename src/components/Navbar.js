import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <>
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <i className={`fas fa-${sidebarOpen ? 'times' : 'bars'}`}></i>
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <span className="brand-icon">🎤</span>
            {sidebarOpen && <span className="brand-text">VoiceTodo</span>}
          </Link>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="link-icon">{item.icon}</span>
              {sidebarOpen && <span className="link-text">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link
            to="/profile"
            className={`sidebar-link profile-link ${isActive('/profile') ? 'active' : ''}`}
            title={!sidebarOpen ? 'Profile' : ''}
          >
            <span className="user-avatar">👤</span>
            {sidebarOpen && <span className="link-text">Profile</span>}
          </Link>
        </div>
      </aside>

      <div className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)}></div>
    </>
  );
};

export default Navbar;
