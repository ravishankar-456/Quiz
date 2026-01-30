import React, { useState } from 'react';
import { X, Share2, Download, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import emailjs from '@emailjs/browser';

export default function ResultModal({ results, onClose }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const accuracy = Math.round((results.correct / (results.correct + results.wrong)) * 100);

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
        alert('EmailJS keys are not configured. Add VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID to your .env file.');
        setIsSending(false);
        return;
      }

      emailjs.init(PUBLIC_KEY);

      const templateParams = {
        to_email: user?.email || '',
        user_name: user?.name || 'User',
        score: results.score,
        category: results.category,
        difficulty: results.difficulty,
        correct: results.correct,
        wrong: results.wrong,
        accuracy: accuracy,
        total_questions: results.correct + results.wrong,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      setEmailSent(true);
      setEmailError(null);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      // Try to extract useful info from EmailJS error objects
      let errMsg = '';
      try {
        if (!error) errMsg = 'Unknown error';
        else if (typeof error === 'string') errMsg = error;
        else if (error.text) errMsg = error.text;
        else if (error.message) errMsg = error.message;
        else errMsg = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
      } catch {
        errMsg = String(error);
      }
      setEmailError(errMsg);
    } finally {
      setIsSending(false);
    }
  };

  const getRankLevel = (score) => {
    if (score >= 90) return { level: 'Expert', color: 'from-yellow-400 to-yellow-600', emoji: '🏆' };
    if (score >= 80) return { level: 'Advanced', color: 'from-purple-400 to-purple-600', emoji: '⭐' };
    if (score >= 70) return { level: 'Intermediate', color: 'from-blue-400 to-blue-600', emoji: '📈' };
    if (score >= 60) return { level: 'Beginner', color: 'from-green-400 to-green-600', emoji: '✨' };
    return { level: 'Novice', color: 'from-gray-400 to-gray-600', emoji: '🌱' };
  };

  const rank = getRankLevel(results.score);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto`}>
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-opacity-20 transition ${
              theme === 'dark' ? 'hover:bg-white' : 'hover:bg-black'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Celebration Header */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">{rank.emoji}</div>
            <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Quiz Complete!
            </h2>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Great job! You completed the quiz
            </p>
          </div>

          {/* Score Card */}
          <div className={`bg-gradient-to-br ${rank.color} rounded-2xl p-6 text-white mb-6 shadow-lg`}>
            <p className="text-sm opacity-90">Your Score</p>
            <p className="text-5xl font-bold mb-2">{results.score}%</p>
            <p className="text-lg font-semibold">{rank.level}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatBox
              label="Correct"
              value={results.correct}
              color="bg-green-500"
              theme={theme}
            />
            <StatBox
              label="Wrong"
              value={results.wrong}
              color="bg-red-500"
              theme={theme}
            />
            <StatBox
              label="Accuracy"
              value={`${accuracy}%`}
              color="bg-blue-500"
              theme={theme}
            />
          </div>

          {/* Details */}
          <div className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} rounded-xl p-4 mb-6`}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Category:</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{results.category}</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Difficulty:</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{results.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Total Questions:</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {results.correct + results.wrong}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {isSending ? 'Sending...' : 'Send Results Email'}
            </button>

            <button
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 duration-200 flex items-center justify-center gap-2"
              onClick={async () => {
                if (isDownloading) return;
                setIsDownloading(true);
                try {
                  // create a certificate on a canvas and download as PNG
                  const canvas = document.createElement('canvas');
                  const width = 1200;
                  const height = 675;
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');

                  // background gradient
                  const grad = ctx.createLinearGradient(0, 0, width, height);
                  grad.addColorStop(0, '#7c3aed');
                  grad.addColorStop(1, '#ec4899');
                  ctx.fillStyle = grad;
                  ctx.fillRect(0, 0, width, height);

                  // white card
                  ctx.fillStyle = 'rgba(255,255,255,0.9)';
                  const pad = 60;
                  ctx.fillRect(pad, pad, width - pad * 2, height - pad * 2);

                  // Title
                  ctx.fillStyle = '#111827';
                  ctx.font = 'bold 48px sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('Certificate of Completion', width / 2, 160);

                  // Score and details
                  ctx.font = '36px sans-serif';
                  ctx.fillText(`Score: ${results.score}%`, width / 2, 260);
                  ctx.font = '28px sans-serif';
                  ctx.fillText(`${results.correct} correct • ${results.wrong} wrong`, width / 2, 320);
                  ctx.fillText(`Category: ${results.category} • Difficulty: ${results.difficulty}`, width / 2, 370);

                  // Footer
                  ctx.font = '20px sans-serif';
                  const dateStr = new Date().toLocaleDateString();
                  ctx.fillText(`Awarded on ${dateStr}`, width / 2, height - 100);

                  // Download
                  canvas.toBlob((blob) => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `certificate_${results.score}.png`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }, 'image/png');
                } catch (err) {
                  console.error('Download error', err);
                }
                setTimeout(() => setIsDownloading(false), 500);
              }}
            >
              <Download className="w-5 h-5" />
              {isDownloading ? 'Preparing...' : 'Download Certificate'}
            </button>

            <button
              onClick={async () => {
                if (isSharing) return;
                setIsSharing(true);
                const shareText = `I scored ${results.score}% on a ${results.category} (${results.difficulty}) quiz! ${results.correct} correct, ${results.wrong} wrong.`;
                try {
                  if (navigator.share) {
                    await navigator.share({
                      title: 'Quiz Results',
                      text: shareText,
                    });
                  } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(shareText);
                    alert('Results copied to clipboard — you can paste them anywhere to share.');
                  } else {
                    // fallback: open mailto
                    window.location.href = `mailto:?subject=My Quiz Results&body=${encodeURIComponent(shareText)}`;
                  }
                } catch (err) {
                  console.error('Share failed', err);
                }
                setIsSharing(false);
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 duration-200 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              {isSharing ? 'Sharing...' : 'Share Results'}
            </button>

            <button
              onClick={onClose}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                theme === 'dark'
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              Back to Dashboard
            </button>
          </div>

          {emailSent && (
            <div className="mt-4 p-3 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50 rounded-lg">
              <p className="text-green-100 text-sm text-center">✓ Results sent to your email!</p>
            </div>
          )}
          {emailError && (
            <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
              <p className="text-red-100 text-sm text-center">Error sending email: {emailError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color, theme }) {
  return (
    <div className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg p-4 text-center`}>
      <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
        {label}
      </p>
      <p className={`text-2xl font-bold ${color} bg-clip-text text-transparent bg-gradient-to-r`}>
        {value}
      </p>
    </div>
  );
}
