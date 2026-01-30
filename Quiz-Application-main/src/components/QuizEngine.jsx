import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useQuiz } from '../context/QuizContext';

export default function QuizEngine({ category, difficulty, onResults }) {
  const { theme } = useTheme();
  const { saveQuiz } = useQuiz();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  
  const questions = useMemo(() => window.QUIZ_QUESTIONS?.[category]?.[difficulty] || [], [category, difficulty]);

  const handleSubmit = useCallback(() => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    const score = Math.round((correct / questions.length) * 100);
    const wrong = questions.length - correct;

    const quizData = {
      category,
      difficulty,
      score,
      correct,
      wrong,
      answers,
    };

    const result = saveQuiz(quizData);
    setSubmitted(true);
    onResults({ ...quizData, id: result.id, completedAt: result.completedAt });
  }, [questions, answers, category, difficulty, saveQuiz, onResults]);

  useEffect(() => {
    if (submitted || !questions.length) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, questions.length, handleSubmit]);

  const handleAnswer = (qId, optionIdx) => {
    if (!submitted) {
      setAnswers({ ...answers, [qId]: optionIdx });
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const secsLeft = secs % 60;
    return `${mins}:${secsLeft.toString().padStart(2, '0')}`;
  };

  if (!questions.length) {
    return (
      <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-8 text-center`}>
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <p className="text-lg font-semibold">No questions available for this category and difficulty</p>
      </div>
    );
  }

  if (submitted) {
    return null;
  }

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const isAnswered = answers[q.id] !== undefined;

  return (
    <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 sm:p-8 shadow-xl`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Question {currentQ + 1} of {questions.length}
          </p>
          <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className={`text-2xl font-bold font-mono px-4 py-2 rounded-lg ${
          timeLeft < 60 ? 'bg-red-500 text-white' : theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900'
        }`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
        {q.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(q.id, idx)}
            disabled={submitted}
            className={`w-full p-4 text-left rounded-lg border-2 transition transform hover:scale-102 ${
              answers[q.id] === idx
                ? `border-blue-500 ${theme === 'dark' ? 'bg-blue-900 text-white' : 'bg-blue-50'}`
                : `border-slate-300 ${theme === 'dark' ? 'hover:border-slate-500 bg-slate-700 text-white' : 'hover:border-slate-400 bg-slate-50 text-slate-900'}`
            } disabled:cursor-not-allowed`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  answers[q.id] === idx ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-400'
                }`}
              >
                {answers[q.id] === idx && '✓'}
              </div>
              <span className="flex-grow">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4 flex-wrap">
        <button
          disabled={currentQ === 0}
          onClick={() => setCurrentQ(currentQ - 1)}
          className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
            currentQ === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-lg hover:scale-105 transform duration-200'
          } ${theme === 'dark' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-300 text-slate-900 hover:bg-slate-400'}`}
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        {currentQ === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 duration-200 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 duration-200 flex items-center gap-2"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Status */}
      <div className="mt-4 text-center text-sm text-slate-500">
        {isAnswered ? (
          <span className="text-green-500 flex items-center justify-center gap-1">
            <CheckCircle className="w-4 h-4" /> Answer Selected
          </span>
        ) : (
          <span className="text-yellow-500 flex items-center justify-center gap-1">
            <AlertCircle className="w-4 h-4" /> No answer selected
          </span>
        )}
      </div>
    </div>
  );
}
