import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import Homepage from './components/Homepage.jsx';
import { QUIZ_QUESTIONS } from './data/questions';
import './App.css';

// Make quiz questions available globally
window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;

function AppContent() {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState('homepage'); // default to homepage
  const [authPage, setAuthPage] = useState(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    // If an auth page is requested, show it alone (replace Homepage).
    if (authPage === 'login') {
      return (
        <Login
          onSwitchToRegister={() => setAuthPage('register')}
          onSwitchToForgotPassword={() => setAuthPage('forgot')}
          onLoginSuccess={() => {
            setAuthPage(null);
            setCurrentPage('dashboard');
          }}
        />
      );
    }

    if (authPage === 'register') {
      return <Register onSwitchToLogin={() => setAuthPage('login')} />;
    }

    if (authPage === 'forgot') {
      return <ForgotPassword onSwitchToLogin={() => setAuthPage('login')} />;
    }

    // Default: show only Homepage for unauthenticated users
    return (
      <div
        className={`${
          theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
        } transition-colors duration-300 min-h-screen`}
      >
        <Homepage
          onOpenLogin={() => setAuthPage('login')}
          onOpenRegister={() => setAuthPage('register')}
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-slate-900 text-white'
          : 'bg-slate-50 text-slate-900'
      } transition-colors duration-300`}
    >
      <Header onNavigate={setCurrentPage} />
      {currentPage === 'homepage' && <Homepage />}
      {currentPage === 'dashboard' && <Dashboard user={user} />}
      {currentPage === 'profile' && <Profile />}
      {currentPage === 'leaderboard' && <Leaderboard />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <AppContent />
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
