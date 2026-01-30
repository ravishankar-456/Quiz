import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    try {
      const savedQuizzes = localStorage.getItem('quizMaster_results');
      if (savedQuizzes) {
        setTimeout(() => setQuizzes(JSON.parse(savedQuizzes)), 0);
      }
    } catch (error) {
      console.error('Error loading quizzes:', error);
    }
  }, []);

  const saveQuiz = (quizData) => {
    const newQuiz = {
      id: Date.now(),
      ...quizData,
      completedAt: new Date().toISOString(),
    };
    const updated = [...quizzes, newQuiz];
    setQuizzes(updated);
    localStorage.setItem('quizMaster_results', JSON.stringify(updated));
    return newQuiz;
  };

  const getQuizzesByCategory = (category) => {
    return quizzes.filter(q => q.category === category);
  };

  const getAverageScore = () => {
    if (quizzes.length === 0) return 0;
    const total = quizzes.reduce((sum, q) => sum + q.score, 0);
    return Math.round(total / quizzes.length);
  };

  const getStats = () => {
    const totalAttempts = quizzes.length;
    const totalCorrect = quizzes.reduce((sum, q) => sum + q.correct, 0);
    const totalWrong = quizzes.reduce((sum, q) => sum + q.wrong, 0);
    const avgScore = getAverageScore();

    return {
      totalAttempts,
      totalCorrect,
      totalWrong,
      avgScore,
      accuracyPercentage: totalAttempts > 0 ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0,
    };
  };

  const deleteQuiz = (quizId) => {
    const updated = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updated);
    localStorage.setItem('quizMaster_results', JSON.stringify(updated));
  };

  const clearAllQuizzes = () => {
    setQuizzes([]);
    localStorage.removeItem('quizMaster_results');
  };

  return (
    <QuizContext.Provider value={{
      quizzes,
      currentQuiz,
      setCurrentQuiz,
      saveQuiz,
      getQuizzesByCategory,
      getAverageScore,
      getStats,
      deleteQuiz,
      clearAllQuizzes,
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};
