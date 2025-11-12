import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { API_URL } from "../config"; // Import the config

interface Progress {
  [topicId: string]: boolean;
}

// Helper function to get the token
const getToken = () => localStorage.getItem('edvancea-token');

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>({});
  const { isAuthenticated } = useAuth();

  // 1. Fetch all progress on login
  useEffect(() => {
    const fetchProgress = async () => {
      if (isAuthenticated) {
        try {
          const token = getToken();
          const res = await fetch(`${API_URL}/user/progress`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setProgress(data);
          }
        } catch (error) {
          console.error("Failed to fetch progress:", error);
        }
      } else {
        // If user logs out, clear the progress
        setProgress({});
      }
    };
    fetchProgress();
  }, [isAuthenticated]);

  // 2. Create API call for marking complete
  const markComplete = async (topicId: string) => {
    setProgress(prev => ({ ...prev, [topicId]: true })); // Optimistic update
    try {
      const token = getToken();
      await fetch('/api/user/progress/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topicId }),
      });
    } catch (error) {
      console.error("Failed to mark complete:", error);
      // Rollback on failure
      setProgress(prev => {
        const updated = { ...prev };
        delete updated[topicId];
        return updated;
      });
    }
  };

  // 3. Create API call for marking incomplete
  const markIncomplete = async (topicId: string) => {
    setProgress(prev => { // Optimistic update
      const updated = { ...prev };
      delete updated[topicId];
      return updated;
    });
    try {
      const token = getToken();
      await fetch('/api/user/progress/incomplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topicId }),
      });
    } catch (error) {
      console.error("Failed to mark incomplete:", error);
      // Rollback on failure
      setProgress(prev => ({ ...prev, [topicId]: true }));
    }
  };

  const isComplete = useCallback((topicId: string) => {
    return !!progress[topicId];
  }, [progress]);

  const getPathProgress = useCallback((pathId: string, topics: any[]) => {
    const pathTopics = topics.filter(t => t.learningPathId === pathId);
    const completed = pathTopics.filter(t => progress[t.id]).length;
    return {
      completed,
      total: pathTopics.length,
      percentage: pathTopics.length > 0 ? Math.round((completed / pathTopics.length) * 100) : 0
    };
  }, [progress]);

  return { progress, markComplete, markIncomplete, isComplete, getPathProgress };
};