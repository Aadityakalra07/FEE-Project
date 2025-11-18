import React from 'react';
import './Footer.css';

const Footer = ({ currentPage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-icon">🎤</span>
              VoiceTodo
            </h3>
            <p className="footer-description">
              Your intelligent voice-controlled task manager
            </p>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Features</h4>
            <ul className="footer-links">
              <li>✓ Voice Recognition</li>
              <li>✓ Priority Management</li>
              <li>✓ Auto Save</li>
              <li>✓ Smart Commands</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>📖 Documentation</li>
              <li>❓ Help & Support</li>
              <li>⚙️ Settings</li>
              <li>🔒 Privacy</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Connect</h4>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="GitHub">
                <span><i class="fa-brands fa-github"></i></span>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <span><i class="fa-brands fa-x-twitter"></i></span>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <span><i class="fa-brands fa-square-linkedin"></i></span>
              </a>
              <a href="#" className="social-icon" aria-label="Email">
                <span><i class="fa-solid fa-envelope"></i></span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} VoiceTodo. Made with <span className="heart">❤️</span> for productivity
            </p>
            <div className="footer-badges">
              <span className="badge">React.js</span>
              <span className="badge">Web Speech API</span>
              <span className="badge">PWA Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
