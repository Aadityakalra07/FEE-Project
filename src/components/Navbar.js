import React from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate, currentPage }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🎤</span>
          <span className="brand-text">VoiceTodo</span>
        </div>
        
        <div className="navbar-menu">
          {currentPage === 'app' ? (
            <button 
              className="nav-button"
              onClick={() => onNavigate('landing')}
              title="Back to Home"
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </button>
          ) : (
            <button 
              className="nav-button primary"
              onClick={() => onNavigate('app')}
              title="Go to Tasks"
            >
              <span className="nav-icon">✓</span>
              <span className="nav-text">My Tasks</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
