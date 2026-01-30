import React, { useState } from 'react';
import { LogOut, Menu, X, Sun, Moon, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onNavigate }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-slate-900 text-white border-b border-slate-800' : 'bg-white text-slate-900 border-b border-slate-200'} shadow-lg sticky top-0 z-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-xl">🎯</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">QuizMaster</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`transition hover:text-blue-500 ${theme === 'dark' ? 'hover:text-opacity-80' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('leaderboard')}
            className={`transition hover:text-blue-500 ${theme === 'dark' ? 'hover:text-opacity-80' : ''}`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`transition hover:text-blue-500 ${theme === 'dark' ? 'hover:text-opacity-80' : ''}`}
          >
            Profile
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              {user?.name}
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2 text-sm hover:scale-105 transform duration-200"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-slate-800 border-t border-slate-700' : 'bg-slate-50 border-t border-slate-200'} py-4 px-4`}>
          <nav className="flex flex-col gap-3">
            <button
              onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
              className="text-left p-2 hover:bg-blue-500 hover:text-white rounded transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => { onNavigate('leaderboard'); setMenuOpen(false); }}
              className="text-left p-2 hover:bg-blue-500 hover:text-white rounded transition"
            >
              Leaderboard
            </button>
            <button
              onClick={() => { onNavigate('profile'); setMenuOpen(false); }}
              className="text-left p-2 hover:bg-blue-500 hover:text-white rounded transition flex items-center gap-2"
            >
              <User className="w-4 h-4" /> Profile
            </button>
            <hr className={theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} />
            <button
              onClick={handleLogout}
              className="text-left p-2 hover:bg-red-500 hover:text-white rounded transition flex items-center gap-2 text-red-500 hover:text-white"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
