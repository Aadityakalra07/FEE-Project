# 🎤 Voice Controlled To-Do App

A beautiful, interactive React.js to-do application with voice command functionality!

## ✨ Features

- ✅ Add, delete, and complete tasks
- 🎤 Voice commands for hands-free operation
- 🎨 Beautiful gradient UI with animations
- 🏷️ Priority levels (High, Medium, Low)
- 💾 Local storage persistence
- 📊 Real-time statistics
- 📱 Fully responsive design
- 🎭 Stunning landing page with animations
- 🧭 Navigation bar for easy page switching
- 📄 Professional footer with links and info

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Modern web browser (Chrome or Edge recommended for voice features)

### Installation

1. Open your terminal/command prompt
2. Navigate to the project folder:
   ```
   cd "c:\Users\aadit\OneDrive\Desktop\Voice controlled"
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. The app will automatically open in your browser at `http://localhost:3000`

## 🎙️ Voice Commands Guide

Click the microphone button and use these commands:

### Adding Tasks
- **"Add task [task name]"** - Add a new task with medium priority
  - Example: "Add task buy groceries"
- **"Add task [task name] high priority"** - Add a high priority task
  - Example: "Add task finish project high priority"
- **"Add task [task name] low priority"** - Add a low priority task
  - Example: "Add task water plants low priority"

### Deleting Tasks
- **"Delete task [keywords]"** - Delete a specific task by keywords
  - Example: "Delete task groceries"
- **"Delete all"** - Remove all tasks at once
- **"Delete completed"** - Remove only completed tasks

### Information
- **"How many tasks"** - Get the total count of your tasks

## 💡 How to Use

### Navigation
- **Navbar**: Fixed at the top with VoiceTodo branding
  - On Landing Page: "My Tasks" button to go to app
  - On Tasks Page: "Home" button to return to landing
- **Footer**: Present on both pages with features, links, and social connections

### Landing Page
- Beautiful animated introduction with floating particles
- Feature showcase with rotating highlights
- Interactive demo section
- Click "Get Started" or "Go to Tasks" to enter the app
- Click "Home" in navbar to return anytime

### Manual Task Entry
1. Type your task in the input field
2. Select priority level from the dropdown (Low/Medium/High)
3. Click the "➕ Add" button

### Voice Commands
1. Click the 🎙️ microphone button
2. Wait for it to turn red and say "Listening..."
3. Speak your command clearly
4. The app will process your command and confirm with voice feedback

### Managing Tasks
- **Check off tasks**: Click the checkbox to mark as complete
- **Delete tasks**: Click the 🗑️ trash icon to remove a task
- **View priority**: Each task shows a colored badge (🔴 High, 🟡 Medium, 🟢 Low)
- **Task sorting**: Tasks are automatically sorted by priority

### Statistics
View your progress at the bottom:
- Total Tasks
- Completed Tasks
- Pending Tasks

## 🎨 UI Features

- **Gradient Design**: Beautiful purple gradient theme
- **Smooth Animations**: Fade-in effects and hover animations
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Visual Feedback**: Color-coded priorities and completion states
- **Empty State**: Helpful message when no tasks exist

## 🔧 Browser Compatibility

### Voice Features Work Best On:
- ✅ Google Chrome (recommended)
- ✅ Microsoft Edge
- ✅ Safari (iOS)

### Note:
- Firefox has limited speech recognition support
- Voice features require microphone permissions
- Make sure to allow microphone access when prompted

## 📝 Tips

1. **Speak clearly**: Enunciate your words for better recognition
2. **Use keywords**: Include "add task" or "delete task" in your commands
3. **One command at a time**: Wait for confirmation before the next command
4. **Check the transcript**: Your spoken words will appear below the mic button
5. **Fallback to typing**: If voice isn't working, use the manual input

## 🛠️ Troubleshooting

### Voice recognition not working?
- Check if your browser supports Web Speech API
- Ensure microphone permissions are granted
- Try using Chrome or Edge browser
- Check your microphone is working in system settings

### Tasks not saving?
- Check if browser's local storage is enabled
- Try clearing browser cache and reload
- Ensure you're not in incognito/private mode

### App not starting?
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again
- Check if port 3000 is available

## 🎯 Future Enhancements

Potential features to add:
- Due dates and reminders
- Task categories
- Dark mode
- Task sharing
- Cloud sync
- More voice commands
- Task editing

## 📦 Technologies Used

- React.js 18
- Web Speech API (SpeechRecognition & SpeechSynthesis)
- CSS3 (Animations & Gradients)
- Local Storage API
- ES6+ JavaScript

## 🤝 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review the voice commands guide
3. Ensure all prerequisites are met
4. Try restarting the development server

---

Enjoy your voice-controlled productivity! 🎉
