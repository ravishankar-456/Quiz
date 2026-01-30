import React from 'react';
import { Trophy, Medal, Flame, TrendingUp } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useTheme } from '../context/ThemeContext';

export default function Leaderboard() {
  const { quizzes } = useQuiz();
  const { theme } = useTheme();

  // Generate mock leaderboard data (in a real app, this would come from a backend)
  const generateLeaderboard = () => {
    const mockUsers = [
      { name: 'You', score: quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) : 0, quizzes: quizzes.length, streak: 5 },
      { name: 'Alex Johnson', score: 92, quizzes: 25, streak: 12 },
      { name: 'Emma Wilson', score: 89, quizzes: 22, streak: 8 },
      { name: 'Michael Chen', score: 87, quizzes: 20, streak: 10 },
      { name: 'Sarah Smith', score: 85, quizzes: 18, streak: 6 },
      { name: 'John Davis', score: 82, quizzes: 15, streak: 4 },
      { name: 'Lisa Brown', score: 80, quizzes: 12, streak: 3 },
      { name: 'Tom Martinez', score: 78, quizzes: 10, streak: 2 },
    ];

    return mockUsers.sort((a, b) => b.score - a.score);
  };

  const leaderboard = generateLeaderboard();

  const getMedalIcon = (rank) => {
    if (rank === 0) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="text-lg font-bold text-slate-400">#{rank + 1}</span>;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} py-8 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Leaderboard
            </h1>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Compete with other learners and climb to the top!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Your Rank"
            value="#1"
            icon={Trophy}
            bgGradient="from-yellow-500 to-orange-600"
            theme={theme}
          />
          <StatCard
            title="Your Score"
            value={quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) + '%' : '0%'}
            icon={TrendingUp}
            bgGradient="from-blue-500 to-purple-600"
            theme={theme}
          />
          <StatCard
            title="Current Streak"
            value="5"
            icon={Flame}
            bgGradient="from-red-500 to-pink-600"
            theme={theme}
          />
        </div>

        {/* Leaderboard Table */}
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-lg border overflow-hidden`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Top Performers
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                  <th className={`text-left py-4 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Rank
                  </th>
                  <th className={`text-left py-4 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Name
                  </th>
                  <th className={`text-left py-4 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Score
                  </th>
                  <th className={`text-left py-4 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Quizzes
                  </th>
                  <th className={`text-left py-4 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Streak
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      index === 0
                        ? theme === 'dark' ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'
                        : theme === 'dark' ? 'border-b border-slate-700 hover:bg-slate-700' : 'border-b border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-4 px-4 flex items-center justify-center">
                      {getMedalIcon(index)}
                    </td>
                    <td className={`py-4 px-4 font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {user.name} {index === 0 && '👑'}
                    </td>
                    <td className={`py-4 px-4 ${
                      index === 0
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent font-bold'
                        : theme === 'dark' ? 'text-white' : 'text-slate-900'
                    } font-bold`}>
                      {user.score}%
                    </td>
                    <td className={`py-4 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {user.quizzes}
                    </td>
                    <td className={`py-4 px-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {user.streak}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievements Section */}
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 shadow-lg border mt-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            🏆 Achievements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Achievement title="First Quiz" description="Complete your first quiz" unlocked={quizzes.length > 0} />
            <Achievement title="Quiz Master" description="Complete 10 quizzes" unlocked={quizzes.length >= 10} />
            <Achievement title="Perfect Score" description="Get 100% on any quiz" unlocked={quizzes.some(q => q.score === 100)} />
            <Achievement title="Consistency" description="7-day streak" unlocked={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, bgGradient }) {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm opacity-90">{title}</p>
        <Icon className="w-5 h-5 opacity-80" />
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function Achievement({ title, description, unlocked }) {
  return (
    <div className={`p-4 rounded-lg text-center ${unlocked ? 'bg-yellow-500 bg-opacity-20' : 'bg-slate-200 bg-opacity-30'}`}>
      <div className={`text-3xl mb-2 ${unlocked ? 'opacity-100' : 'opacity-30'}`}>
        {unlocked ? '🎯' : '🔒'}
      </div>
      <p className={`font-semibold ${unlocked ? 'text-yellow-600' : 'text-slate-500'}`}>
        {title}
      </p>
      <p className="text-xs mt-1 opacity-75">{description}</p>
    </div>
  );
}
