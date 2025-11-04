import { useState, useEffect } from 'react';

interface Progress {
  [topicId: string]: boolean;
}

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('skillforge-progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('skillforge-progress', JSON.stringify(progress));
  }, [progress]);

  const markComplete = (topicId: string) => {
    setProgress(prev => ({ ...prev, [topicId]: true }));
  };

  const markIncomplete = (topicId: string) => {
    setProgress(prev => {
      const updated = { ...prev };
      delete updated[topicId];
      return updated;
    });
  };

  const isComplete = (topicId: string) => {
    return !!progress[topicId];
  };

  const getPathProgress = (pathId: string, topics: any[]) => {
    const pathTopics = topics.filter(t => t.learningPathId === pathId);
    const completed = pathTopics.filter(t => progress[t.id]).length;
    return {
      completed,
      total: pathTopics.length,
      percentage: pathTopics.length > 0 ? Math.round((completed / pathTopics.length) * 100) : 0
    };
  };

  return { progress, markComplete, markIncomplete, isComplete, getPathProgress };
};
