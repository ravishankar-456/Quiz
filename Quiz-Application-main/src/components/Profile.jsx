import React, { useState } from 'react';
import { User, Mail, Calendar, BarChart3, Award, Edit2, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { getStats, quizzes } = useQuiz();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const stats = getStats();

  const handleSave = () => {
    updateProfile(name);
    setIsEditing(false);
  };

  const createdDate = new Date(user?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} py-8 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className={`text-3xl sm:text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Your Profile
        </h1>

        {/* Profile Card */}
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-8 shadow-lg border mb-8`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {user?.name}
                    </h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {createdDate}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <QuickStat label="Quizzes Taken" value={stats.totalAttempts} icon={Award} />
            <QuickStat label="Average Score" value={`${stats.avgScore}%`} icon={BarChart3} />
            <QuickStat label="Correct Answers" value={stats.totalCorrect} icon={Award} />
            <QuickStat label="Accuracy" value={`${stats.accuracyPercentage}%`} icon={BarChart3} />
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-8 shadow-lg border`}>
          <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Recent Quiz Attempts
          </h3>

          {quizzes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                    <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Category
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Difficulty
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Score
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Result
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.slice().reverse().slice(0, 10).map((quiz, index) => (
                    <tr
                      key={index}
                      className={theme === 'dark' ? 'border-b border-slate-700 hover:bg-slate-700' : 'border-b border-slate-200 hover:bg-slate-50'}
                    >
                      <td className={`py-3 px-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {quiz.category}
                      </td>
                      <td className={`py-3 px-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          quiz.difficulty === 'Easy' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                          quiz.difficulty === 'Medium' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                          'bg-red-500 bg-opacity-20 text-red-400'
                        }`}>
                          {quiz.difficulty}
                        </span>
                      </td>
                      <td className={`py-3 px-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {quiz.score}%
                      </td>
                      <td className={`py-3 px-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {quiz.correct}/{quiz.correct + quiz.wrong}
                      </td>
                      <td className={`py-3 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {new Date(quiz.completedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <p className="mb-4">No quiz attempts yet. Start taking quizzes to see your history!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon }) {
  const IconComponent = icon;
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-4 text-center">
      <IconComponent className="w-5 h-5 mx-auto mb-2 opacity-80" />
      <p className="text-xs opacity-90">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
