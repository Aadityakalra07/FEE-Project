import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import VoiceControl from './components/VoiceControl';
import AddTaskForm from './components/AddTaskForm';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('voiceTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setShowLanding(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('voiceTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setCurrentPage('app');
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  const handleNavigation = (page) => {
    if (page === 'landing') {
      setShowLanding(true);
      setCurrentPage('landing');
    } else {
      setShowLanding(false);
      setCurrentPage('app');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showLanding) {
    return (
      <div className="app-wrapper">
        <Navbar onNavigate={handleNavigation} currentPage="landing" />
        <LandingPage onGetStarted={handleGetStarted} />
        <Footer currentPage="landing" />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar onNavigate={handleNavigation} currentPage="app" />
      <div className="App">
        <div className="container">
          <header className="app-header">
            <h1>🎤 Voice Controlled To-Do</h1>
            <p className="subtitle">Speak or type to manage your tasks</p>
          </header>

          <VoiceControl 
            addTask={addTask}
            deleteTask={deleteTask}
            deleteAllTasks={deleteAllTasks}
            deleteCompletedTasks={deleteCompletedTasks}
            tasks={tasks}
            isListening={isListening}
            setIsListening={setIsListening}
            transcript={transcript}
            setTranscript={setTranscript}
          />

          <AddTaskForm addTask={addTask} />

          <TodoList 
            tasks={tasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />

          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{tasks.length}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{tasks.filter(t => t.completed).length}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{tasks.filter(t => !t.completed).length}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="app" />
    </div>
  );
}

export default App;
