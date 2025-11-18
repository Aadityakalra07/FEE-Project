import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Footer from './Footer';

const LandingPage = ({ onGetStarted }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [particles, setParticles] = useState([]);

  const features = [
    { icon: '🎤', title: 'Voice Control', description: 'Add tasks hands-free' },
    { icon: '🎨', title: 'Beautiful UI', description: 'Stunning design' },
    { icon: '⚡', title: 'Fast & Smart', description: 'Priority management' },
    { icon: '💾', title: 'Auto Save', description: 'Never lose data' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4,
      animationDelay: Math.random() * 5,
      size: 2 + Math.random() * 4
    }));
    setParticles(newParticles);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <div className="particles-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.animationDelay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          />
        ))}
      </div>

      <div className="landing-content">
        <div className="hero-section">
          <div className="logo-animation">
            <div className="logo-circle pulse">
              <span className="logo-icon">🎤</span>
            </div>
          </div>
          
          <h1 className="hero-title">
            <span className="gradient-text">Voice Controlled</span>
            <br />
            <span className="subtitle-text">To-Do App</span>
          </h1>
          
          <p className="hero-description">
            Experience the future of task management with cutting-edge voice recognition
          </p>

          <div className="cta-section">
            <button className="cta-button primary" onClick={onGetStarted}>
              <span>Get Started</span>
              <span className="arrow">→</span>
            </button>
            <button className="cta-button secondary" onClick={onGetStarted}>
              <span>Go to Tasks</span>
            </button>
          </div>
        </div>

        <div className="features-showcase">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${currentFeature === index ? 'active' : ''}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="demo-section">
          <div className="demo-card">
            <div className="demo-header">
              <span className="demo-dot red"></span>
              <span className="demo-dot yellow"></span>
              <span className="demo-dot green"></span>
            </div>
            <div className="demo-content">
              <div className="demo-command">
                <span className="command-prompt">💬</span>
                <span className="typing-text">"Add task buy groceries"</span>
              </div>
              <div className="demo-response">
                <span className="response-icon">✓</span>
                <span>Task added successfully!</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-box">
            <div className="stat-number counter">100%</div>
            <div className="stat-label">Voice Accurate</div>
          </div>
          <div className="stat-box">
            <div className="stat-number counter">10+</div>
            <div className="stat-label">Voice Commands</div>
          </div>
          <div className="stat-box">
            <div className="stat-number counter">0s</div>
            <div className="stat-label">Setup Time</div>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => {
          document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
        }}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-heading">
            <span className="heading-icon">⚙️</span>
            How It Works
          </h2>
          <p className="section-subheading">Get started in 3 simple steps</p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🎤</div>
              <h3 className="step-title">Click & Speak</h3>
              <p className="step-description">
                Click the microphone button and speak your task naturally. 
                Our AI recognizes your voice instantly.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🎯</div>
              <h3 className="step-title">Set Priority</h3>
              <p className="step-description">
                Add priority levels to organize your tasks. 
                High, Medium, or Low - you choose!
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">✅</div>
              <h3 className="step-title">Track Progress</h3>
              <p className="step-description">
                Check off completed tasks and watch your productivity soar. 
                All data saved automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="section-container">
          <h2 className="section-heading">
            <span className="heading-icon">🌟</span>
            Why Choose VoiceTodo?
          </h2>
          <p className="section-subheading">Built for modern productivity enthusiasts</p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">⚡</span>
              </div>
              <h3 className="benefit-title">Lightning Fast</h3>
              <p className="benefit-description">
                Add tasks in seconds with voice commands. No typing needed.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">🔒</span>
              </div>
              <h3 className="benefit-title">Privacy First</h3>
              <p className="benefit-description">
                All data stored locally on your device. Your tasks stay private.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">🎨</span>
              </div>
              <h3 className="benefit-title">Beautiful Design</h3>
              <p className="benefit-description">
                Intuitive interface that makes task management enjoyable.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">📱</span>
              </div>
              <h3 className="benefit-title">Works Everywhere</h3>
              <p className="benefit-description">
                Fully responsive. Use on desktop, tablet, or mobile device.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">🚀</span>
              </div>
              <h3 className="benefit-title">No Setup Required</h3>
              <p className="benefit-description">
                Start using immediately. No account or installation needed.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">🔄</span>
              </div>
              <h3 className="benefit-title">Auto Sync</h3>
              <p className="benefit-description">
                Tasks automatically saved to browser. Never lose your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-heading">
            <span className="heading-icon">💬</span>
            What Users Say
          </h2>
          <p className="section-subheading">Join thousands of satisfied users</p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "This app changed how I manage tasks! Voice control is a game-changer 
                for multitasking. Highly recommend!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <div className="author-name">Alex Johnson</div>
                  <div className="author-role">Product Manager</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Beautiful interface and super intuitive. I can add tasks while cooking 
                or driving. Love the priority system!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍🎨</div>
                <div className="author-info">
                  <div className="author-name">Sarah Chen</div>
                  <div className="author-role">Designer</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Finally, a to-do app that understands voice commands perfectly! 
                No more typing. This is the future!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💻</div>
                <div className="author-info">
                  <div className="author-name">Mike Rodriguez</div>
                  <div className="author-role">Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section">
        <div className="section-container">
          <div className="final-cta-content">
            <h2 className="final-cta-title">Ready to Get Started?</h2>
            <p className="final-cta-description">
              Join the productivity revolution. Start managing tasks with your voice today.
            </p>
            <button className="final-cta-button" onClick={onGetStarted}>
              <span>Launch App Now</span>
              <span className="cta-arrow">→</span>
            </button>
            <p className="final-cta-note">✨ No credit card required • Free forever</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
