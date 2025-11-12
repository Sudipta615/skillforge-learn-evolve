import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { API_URL } from "../config"; // Import the config

interface QuizProgressData {
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt?: string;
}

interface QuizProgress {
  [topicId: string]: QuizProgressData;
}

// Helper function to get the token
const getToken = () => localStorage.getItem('edvancea-token');

export const useQuizProgress = () => {
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({});
  const { isAuthenticated } = useAuth();

  // 1. Fetch quiz progress on login
  useEffect(() => {
    const fetchQuizProgress = async () => {
      if (isAuthenticated) {
        try {
          const token = getToken();
          const res = await fetch(`${API_URL}/user/quizzes`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setQuizProgress(data);
          }
        } catch (error) {
          console.error("Failed to fetch quiz progress:", error);
        }
      } else {
        setQuizProgress({}); // Clear on logout
      }
    };
    fetchQuizProgress();
  }, [isAuthenticated]);

  // 2. Create API call for recording completion
  const recordQuizCompletion = async (topicId: string, score: number) => {
    const newAttemptData = {
      completed: true,
      score: Math.max(score, quizProgress[topicId]?.score || 0),
      attempts: (quizProgress[topicId]?.attempts || 0) + 1,
      lastAttempt: new Date().toISOString(),
    };
    
    // Optimistic update
    setQuizProgress(prev => ({
      ...prev,
      [topicId]: newAttemptData,
    }));

    // API call
    try {
      const token = getToken();
      await fetch('/api/user/quizzes/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topicId, score }),
      });
    } catch (error) {
      console.error("Failed to record quiz completion:", error);
      // Rollback (though harder, for now we just log)
    }
  };

  const getQuizProgress = useCallback((topicId: string) => {
    return quizProgress[topicId];
  }, [quizProgress]);

  const getAllCompletedQuizzes = useCallback(() => {
    return Object.entries(quizProgress)
      .filter(([_, data]) => data.completed)
      .map(([topicId, data]) => ({ topicId, ...data }));
  }, [quizProgress]);

  const getAverageScore = useCallback(() => {
    const completed = getAllCompletedQuizzes();
    if (completed.length === 0) return 0;
    const total = completed.reduce((sum, quiz) => sum + quiz.score, 0);
    return Math.round(total / completed.length);
  }, [quizProgress, getAllCompletedQuizzes]);

  return { 
    quizProgress, 
    recordQuizCompletion, 
    getQuizProgress, 
    getAllCompletedQuizzes,
    getAverageScore 
  };
};