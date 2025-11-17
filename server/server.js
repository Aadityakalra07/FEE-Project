const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File paths
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const TASKS_FILE = path.join(__dirname, 'data', 'tasks.json');
const SESSIONS_FILE = path.join(__dirname, 'data', 'sessions.json');

// Helper functions
async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeJSON(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

function generateSessionId() {
  return crypto.randomBytes(32).toString('hex');
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Routes

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const users = await readJSON(USERS_FILE);
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password: hashPassword(password),
      createdAt: new Date().toISOString(),
      avatar: null
    };

    users.push(newUser);
    await writeJSON(USERS_FILE, users);

    // Create session
    const sessionId = generateSessionId();
    const sessions = await readJSON(SESSIONS_FILE);
    sessions.push({
      sessionId,
      userId: newUser.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });
    await writeJSON(SESSIONS_FILE, sessions);

    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ 
      success: true, 
      message: 'Account created successfully',
      user: userWithoutPassword,
      sessionId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const users = await readJSON(USERS_FILE);
    const user = users.find(u => u.email === email);

    if (!user || user.password !== hashPassword(password)) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Create session
    const sessionId = generateSessionId();
    const sessions = await readJSON(SESSIONS_FILE);
    sessions.push({
      sessionId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });
    await writeJSON(SESSIONS_FILE, sessions);

    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: userWithoutPassword,
      sessionId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Logout
app.post('/api/auth/logout', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const sessions = await readJSON(SESSIONS_FILE);
    const filteredSessions = sessions.filter(s => s.sessionId !== sessionId);
    await writeJSON(SESSIONS_FILE, filteredSessions);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Verify session
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const sessions = await readJSON(SESSIONS_FILE);
    const session = sessions.find(s => s.sessionId === sessionId);

    if (!session || new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({ success: false, message: 'Session expired' });
    }

    const users = await readJSON(USERS_FILE);
    const user = users.find(u => u.id === session.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update profile
app.put('/api/auth/profile', async (req, res) => {
  try {
    const { sessionId, name, email } = req.body;

    const sessions = await readJSON(SESSIONS_FILE);
    const session = sessions.find(s => s.sessionId === sessionId);

    if (!session) {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }

    const users = await readJSON(USERS_FILE);
    const userIndex = users.findIndex(u => u.id === session.userId);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if new email already exists
    if (email !== users[userIndex].email && users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    users[userIndex] = { ...users[userIndex], name, email };
    await writeJSON(USERS_FILE, users);

    const { password: _, ...userWithoutPassword } = users[userIndex];
    res.json({ success: true, message: 'Profile updated', user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get tasks for user
app.post('/api/tasks/get', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const sessions = await readJSON(SESSIONS_FILE);
    const session = sessions.find(s => s.sessionId === sessionId);

    if (!session) {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }

    const allTasks = await readJSON(TASKS_FILE);
    const userTasks = allTasks.filter(t => t.userId === session.userId);
    res.json({ success: true, tasks: userTasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Save tasks for user
app.post('/api/tasks/save', async (req, res) => {
  try {
    const { sessionId, tasks } = req.body;
    const sessions = await readJSON(SESSIONS_FILE);
    const session = sessions.find(s => s.sessionId === sessionId);

    if (!session) {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }

    const allTasks = await readJSON(TASKS_FILE);
    const otherUsersTasks = allTasks.filter(t => t.userId !== session.userId);
    const userTasks = tasks.map(t => ({ ...t, userId: session.userId }));
    
    await writeJSON(TASKS_FILE, [...otherUsersTasks, ...userTasks]);
    res.json({ success: true, message: 'Tasks saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
