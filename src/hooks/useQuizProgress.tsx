import { useState, useEffect } from 'react';

interface QuizProgress {
  [topicId: string]: {
    completed: boolean;
    score: number;
    attempts: number;
    lastAttempt?: string;
  };
}

export const useQuizProgress = () => {
  const [quizProgress, setQuizProgress] = useState<QuizProgress>(() => {
    const savedUser = localStorage.getItem('skillforge-user');
    if (!savedUser) return {};
    
    const user = JSON.parse(savedUser);
    const saved = localStorage.getItem(`skillforge-quiz-progress-${user.id}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('skillforge-user');
    if (!savedUser) return;
    
    const user = JSON.parse(savedUser);
    localStorage.setItem(`skillforge-quiz-progress-${user.id}`, JSON.stringify(quizProgress));
  }, [quizProgress]);

  const recordQuizCompletion = (topicId: string, score: number) => {
    setQuizProgress(prev => ({
      ...prev,
      [topicId]: {
        completed: true,
        score,
        attempts: (prev[topicId]?.attempts || 0) + 1,
        lastAttempt: new Date().toISOString(),
      }
    }));
  };

  const getQuizProgress = (topicId: string) => {
    return quizProgress[topicId];
  };

  const getAllCompletedQuizzes = () => {
    return Object.entries(quizProgress)
      .filter(([_, data]) => data.completed)
      .map(([topicId, data]) => ({ topicId, ...data }));
  };

  const getAverageScore = () => {
    const completed = getAllCompletedQuizzes();
    if (completed.length === 0) return 0;
    const total = completed.reduce((sum, quiz) => sum + quiz.score, 0);
    return Math.round(total / completed.length);
  };

  return { 
    quizProgress, 
    recordQuizCompletion, 
    getQuizProgress, 
    getAllCompletedQuizzes,
    getAverageScore 
  };
};
