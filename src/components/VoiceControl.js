import React, { useEffect, useRef } from 'react';
import './VoiceControl.css';

const VoiceControl = ({ 
  addTask, 
  deleteTask, 
  deleteAllTasks, 
  deleteCompletedTasks, 
  tasks, 
  isListening, 
  setIsListening, 
  transcript, 
  setTranscript,
  settings = {} 
}) => {
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      setTranscript(speechResult);
      processVoiceCommand(speechResult);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [tasks]);

  const processVoiceCommand = (command) => {
    console.log('Processing command:', command);

    // Add task commands
    if (command.includes('add task') || command.includes('add a task') || command.includes('create task')) {
      const taskText = command
        .replace(/add task/i, '')
        .replace(/add a task/i, '')
        .replace(/create task/i, '')
        .trim();
      
      if (taskText) {
        const priority = command.includes('high priority') ? 'high' 
          : command.includes('low priority') ? 'low' 
          : 'medium';
        
        const cleanTaskText = taskText
          .replace(/high priority/i, '')
          .replace(/low priority/i, '')
          .replace(/medium priority/i, '')
          .trim();
        
        addTask(cleanTaskText, priority);
        speak(`Task added: ${cleanTaskText}`);
      }
    }
    // Delete specific task
    else if (command.includes('delete task') || command.includes('remove task')) {
      const taskKeywords = command
        .replace(/delete task/i, '')
        .replace(/remove task/i, '')
        .trim();
      
      if (taskKeywords) {
        const taskToDelete = tasks.find(task => 
          task.text.toLowerCase().includes(taskKeywords)
        );
        
        if (taskToDelete) {
          deleteTask(taskToDelete.id);
          speak(`Task deleted: ${taskToDelete.text}`);
        } else {
          speak('Task not found');
        }
      }
    }
    // Delete all tasks
    else if (command.includes('delete all') || command.includes('clear all') || command.includes('remove all')) {
      if (tasks.length > 0) {
        deleteAllTasks();
        speak('All tasks deleted');
      } else {
        speak('No tasks to delete');
      }
    }
    // Delete completed tasks
    else if (command.includes('delete completed') || command.includes('clear completed') || command.includes('remove completed')) {
      const completedCount = tasks.filter(t => t.completed).length;
      if (completedCount > 0) {
        deleteCompletedTasks();
        speak(`${completedCount} completed tasks deleted`);
      } else {
        speak('No completed tasks to delete');
      }
    }
    // Show tasks count
    else if (command.includes('how many tasks') || command.includes('count tasks')) {
      speak(`You have ${tasks.length} tasks in total`);
    }
    else {
      speak('Command not recognized. Try saying "add task" followed by your task name');
    }

    setTimeout(() => setTranscript(''), 3000);
  };

  const speak = (text) => {
    // Only speak if voice feedback is enabled in settings
    if (settings.voiceFeedback === false) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="voice-control">
      <button 
        className={`mic-button ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
      >
        <span className="mic-icon">{isListening ? '🎤' : '🎙️'}</span>
        <span className="mic-text">
          {isListening ? 'Listening...' : 'Click to Speak'}
        </span>
      </button>
      
      {transcript && (
        <div className="transcript">
          <strong>You said:</strong> "{transcript}"
        </div>
      )}

      <div className="voice-commands-info">
        <details>
          <summary>📋 Voice Commands Guide</summary>
          <ul>
            <li><strong>"Add task [task name]"</strong> - Add a new task</li>
            <li><strong>"Add task [task name] high priority"</strong> - Add high priority task</li>
            <li><strong>"Delete task [task name]"</strong> - Delete a specific task</li>
            <li><strong>"Delete all"</strong> - Delete all tasks</li>
            <li><strong>"Delete completed"</strong> - Delete completed tasks</li>
            <li><strong>"How many tasks"</strong> - Get task count</li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default VoiceControl;
