import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white bg-opacity-10 border border-white border-opacity-20 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <button
          onClick={onSwitchToLogin}
          className="text-white mb-4 flex items-center gap-2 hover:text-opacity-80 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-4xl font-bold text-white">Forgot Password?</h2>
          <p className="text-white text-opacity-80 mt-2">Don't worry, we'll help you recover it</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm font-semibold block mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-lg bg-white bg-opacity-90 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-slate-500"
              />
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
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Check Your Email</h3>
            <p className="text-white text-opacity-80">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-white text-opacity-70 text-sm">
              Check your inbox and follow the instructions to reset your password.
            </p>
            <button
              onClick={onSwitchToLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105 duration-300 mt-6"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
