import { useState, useEffect } from 'react';

interface Bookmarks {
  [topicId: string]: boolean;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmarks>(() => {
    const savedUser = localStorage.getItem('skillforge-user');
    if (!savedUser) return {};
    
    const user = JSON.parse(savedUser);
    const saved = localStorage.getItem(`skillforge-bookmarks-${user.id}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('skillforge-user');
    if (!savedUser) return;
    
    const user = JSON.parse(savedUser);
    localStorage.setItem(`skillforge-bookmarks-${user.id}`, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (topicId: string) => {
    setBookmarks(prev => ({ ...prev, [topicId]: true }));
  };

  const removeBookmark = (topicId: string) => {
    setBookmarks(prev => {
      const updated = { ...prev };
      delete updated[topicId];
      return updated;
    });
  };

  const isBookmarked = (topicId: string) => {
    return !!bookmarks[topicId];
  };

  const toggleBookmark = (topicId: string) => {
      if (isBookmarked(topicId)) {
          removeBookmark(topicId);
      } else {
          addBookmark(topicId);
      }
  }

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
};