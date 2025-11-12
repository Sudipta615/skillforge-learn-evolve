import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { API_URL } from "../config"; // Import the config

interface User {
  _id: string; // Changed from id to _id to match MongoDB
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // Add a loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get the token
const getToken = () => localStorage.getItem('edvancea-token');

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  // On initial app load, check for an existing token
  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await fetch(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            // Token is invalid or expired
            localStorage.removeItem('edvancea-token');
          }
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem('edvancea-token');
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const signup = async (username: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || 'Signup failed' };
      }

      // On success, save token and user
      localStorage.setItem('edvancea-token', data.token);
      setUser({ _id: data._id, username: data.username, email: data.email });
      return { success: true };

    } catch (error: any) {
      return { success: false, error: error.message || 'Network error' };
    }
  };

  const login = async (email: string, password: string) => {
     try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

      // On success, save token and user
      localStorage.setItem('edvancea-token', data.token);
      setUser({ _id: data._id, username: data.username, email: data.email });
      return { success: true };

    } catch (error: any) {
      return { success: false, error: error.message || 'Network error' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edvancea-token');
    // On logout, we simply reload the page.
    // This is the easiest way to clear all state from all hooks (progress, bookmarks, etc.)
    window.location.href = '/';
  };

  // Show a loading screen (or nothing) while we check for a token
  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};