import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSwitchToRegister, onSwitchToForgotPassword, onLoginSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const name = email.split('@')[0];
        login(email, name, password);
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess();
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white bg-opacity-10 border border-white border-opacity-20 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎯</span>
          </div>
          <h2 className="text-4xl font-bold text-white">QuizMaster</h2>
          <p className="text-white text-opacity-80 mt-2">Master Your Knowledge</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-white text-sm font-semibold block mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="text-white text-sm font-semibold block mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
              <p className="text-red-100 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105 duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="space-y-2 mt-4">
          <button
            onClick={onSwitchToForgotPassword}
            className="w-full text-white text-opacity-80 hover:text-opacity-100 text-sm transition"
          >
            Forgot Password?
          </button>
          <button
            onClick={onSwitchToRegister}
            className="w-full text-white text-opacity-80 hover:text-opacity-100 text-sm transition"
          >
            Don't have an account? Register
          </button>
        </div>

        <p className="text-center text-white text-opacity-70 text-xs mt-6">
          Demo: Use any email and password to continue
        </p>
      </div>
    </div>
  );
}
