import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import VoiceControl from './components/VoiceControl';
import AddTaskForm from './components/AddTaskForm';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useSettings } from './context/SettingsContext';

// Main App Component with Task State Management
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, sessionId, loading, isAuthenticated } = useAuth();
  const { settings, showNotification } = useSettings();
  const [tasks, setTasks] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showAuth, setShowAuth] = useState('login'); // 'login' or 'signup'

  const API_URL = 'http://localhost:5000/api';

  // Load tasks from server when user is authenticated
  useEffect(() => {
    if (isAuthenticated && sessionId) {
      loadTasksFromServer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, sessionId]);

  // Save tasks to server whenever they change
  useEffect(() => {
    if (isAuthenticated && sessionId && tasks.length >= 0) {
      saveTasksToServer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  // Auto-delete completed tasks older than 7 days
  useEffect(() => {
    if (!settings.autoDelete || tasks.length === 0) return;

    const interval = setInterval(() => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const filteredTasks = tasks.filter(task => {
        if (task.completed && task.createdAt) {
          const taskDate = new Date(task.createdAt);
          return taskDate > sevenDaysAgo;
        }
        return true;
      });

      if (filteredTasks.length < tasks.length) {
        setTasks(filteredTasks);
        showNotification('Auto-Delete', 'Removed completed tasks older than 7 days');
      }
    }, 3600000); // Check every hour

    return () => clearInterval(interval);
  }, [tasks, settings.autoDelete, showNotification]);

  const loadTasksFromServer = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasksToServer = async () => {
    try {
      await fetch(`${API_URL}/tasks/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, tasks })
      });
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = (taskText, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    showNotification('Task Added', taskText);
  };

  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    if (task) showNotification('Task Deleted', task.text);
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    if (task) {
      showNotification(
        task.completed ? 'Task Uncompleted' : 'Task Completed', 
        task.text
      );
    }
  };

  const deleteAllTasks = () => {
    const count = tasks.length;
    setTasks([]);
    showNotification('All Tasks Deleted', `Removed ${count} tasks`);
  };

  const deleteCompletedTasks = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    setTasks(tasks.filter(task => !task.completed));
    showNotification('Completed Tasks Deleted', `Removed ${completedCount} tasks`);
  };

  const handleGetStarted = () => {
    localStorage.setItem('hasVisitedBefore', 'true');
    navigate('/tasks');
  };

  const handleLoginSuccess = () => {
    setShowAuth(null);
    localStorage.setItem('hasVisitedBefore', 'true');
    navigate('/tasks');
  };

  const handleSignupSuccess = () => {
    setShowAuth(null);
    localStorage.setItem('hasVisitedBefore', 'true');
    navigate('/tasks');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (showAuth === 'login') {
      return (
        <Login
          onSwitchToSignup={() => setShowAuth('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      );
    } else {
      return (
        <Signup
          onSwitchToLogin={() => setShowAuth('login')}
          onSignupSuccess={handleSignupSuccess}
        />
      );
    }
  }

  // Tasks Page Component
  const TasksPage = () => (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>🎤 Voice Controlled To-Do</h1>
          <p className="subtitle">Welcome back, {user?.name}! Speak or type to manage your tasks</p>
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
          settings={settings}
        />

        <AddTaskForm addTask={addTask} />

        <TodoList 
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          settings={settings}
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
  );

  return (
    <div className="app-wrapper">
      <Navbar currentPage={location.pathname} />
      <Routes>
        <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/calendar" element={<Calendar tasks={tasks} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
