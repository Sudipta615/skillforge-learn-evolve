import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { API_URL } from "../config"; // Import the config

interface Bookmarks {
  [topicId: string]: boolean;
}

// Helper function to get the token
const getToken = () => localStorage.getItem('edvancea-token');

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmarks>({});
  const { isAuthenticated } = useAuth();

  // 1. Fetch all bookmarks on login
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (isAuthenticated) {
        try {
          const token = getToken();
          const res = await fetch(`${API_URL}/user/bookmarks`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setBookmarks(data);
          }
        } catch (error) {
          console.error("Failed to fetch bookmarks:", error);
        }
      } else {
        setBookmarks({}); // Clear on logout
      }
    };
    fetchBookmarks();
  }, [isAuthenticated]);

  const isBookmarked = useCallback((topicId: string) => {
    return !!bookmarks[topicId];
  }, [bookmarks]);

  // 2. Create single API call for toggling
  const toggleBookmark = async (topicId: string) => {
    // Optimistic update
    const wasBookmarked = isBookmarked(topicId);
    setBookmarks(prev => {
      const updated = { ...prev };
      if (wasBookmarked) {
        delete updated[topicId];
      } else {
        updated[topicId] = true;
      }
      return updated;
    });

    // API call
    try {
      const token = getToken();
      await fetch('/api/user/bookmarks/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topicId }),
      });
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // Rollback on failure
      setBookmarks(prev => {
        const updated = { ...prev };
        if (wasBookmarked) {
          updated[topicId] = true;
        } else {
          delete updated[topicId];
        }
        return updated;
      });
    }
  };

  // Deprecated functions, now handled by toggleBookmark
  const addBookmark = (topicId: string) => {
    if (!isBookmarked(topicId)) toggleBookmark(topicId);
  };
  const removeBookmark = (topicId: string) => {
    if (isBookmarked(topicId)) toggleBookmark(topicId);
  };


  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
};