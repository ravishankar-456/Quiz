import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Target, Zap, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useQuiz } from '../context/QuizContext';
import { CATEGORIES, DIFFICULTIES } from '../data/questions';
import QuizEngine from './QuizEngine';
import ResultModal from './ResultModal';

export default function Dashboard({ user }) {
  const { theme } = useTheme();
  const { quizzes, getStats } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState('GK');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const stats = getStats();

  const scoreData = quizzes.map((q, i) => ({
    name: `Q${i + 1}`,
    score: q.score,
    category: q.category,
  }));

  const categoryData = [
    { name: 'Correct', value: stats.totalCorrect, fill: '#10b981' },
    { name: 'Wrong', value: stats.totalWrong, fill: '#ef4444' },
  ];

  const difficultyData = [
    { name: 'Easy', attempts: quizzes.filter(q => q.difficulty === 'Easy').length },
    { name: 'Medium', attempts: quizzes.filter(q => q.difficulty === 'Medium').length },
    { name: 'Hard', attempts: quizzes.filter(q => q.difficulty === 'Hard').length },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} py-8 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 animate-slideUp">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Welcome back, {user.name}! 👋
          </h1>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {quizzes.length === 0 ? 'Start your learning journey today!' : `You've completed ${quizzes.length} quizzes so far. Keep it up!`}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Target}
            title="Total Quizzes"
            value={quizzes.length}
            bgGradient="from-blue-500 to-blue-600"
            theme={theme}
          />
          <StatCard
            icon={Award}
            title="Average Score"
            value={`${stats.avgScore}%`}
            bgGradient="from-purple-500 to-purple-600"
            theme={theme}
          />
          <StatCard
            icon={TrendingUp}
            title="Accuracy"
            value={`${stats.accuracyPercentage}%`}
            bgGradient="from-green-500 to-green-600"
            theme={theme}
          />
          <StatCard
            icon={Zap}
            title="Last Score"
            value={quizzes.length > 0 ? `${quizzes[quizzes.length - 1].score}%` : 'N/A'}
            bgGradient="from-pink-500 to-pink-600"
            theme={theme}
          />
        </div>

        {/* Quiz Selection */}
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 sm:p-8 shadow-lg mb-8 border`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>🚀 Start New Quiz</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                📚 Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                ⚡ Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                {DIFFICULTIES.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105 duration-200 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" /> Start Quiz
              </button>
            </div>
          </div>

          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            ℹ️ You have 30 minutes to complete each quiz. Questions will be displayed one at a time.
          </p>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Score Trend */}
          <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-lg border`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>📈 Score Trend</h3>
            {scoreData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                  <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px' }}
                    formatter={(value) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                <p>No quiz data yet. Complete a quiz to see your trends!</p>
              </div>
            )}
          </div>

          {/* Performance */}
          <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-lg border`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>✅ Accuracy Breakdown</h3>
            {stats.totalCorrect + stats.totalWrong > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                <p>No data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-lg border`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>📊 Attempts by Difficulty</h3>
          {difficultyData.some(d => d.attempts > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="attempts" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <p>No attempts yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 max-h-screen overflow-y-auto py-8">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <QuizEngine
              category={selectedCategory}
              difficulty={selectedDifficulty}
              onResults={(results) => {
                setQuizResults(results);
                setShowQuiz(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Result Modal */}
      {quizResults && (
        <ResultModal
          results={quizResults}
          onClose={() => setQuizResults(null)}
        />
      )}
    </div>
  );
}

function StatCard({ icon, title, value, bgGradient }) {
  const IconComponent = icon;
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-default`}>
      <IconComponent className="w-6 h-6 mb-2 opacity-80" />
      <p className="text-sm opacity-90 font-medium">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
