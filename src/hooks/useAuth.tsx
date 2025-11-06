import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('skillforge-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (username: string, email: string, password: string) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('skillforge-users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      password, // In production, this would be hashed
    };

    users.push(newUser);
    localStorage.setItem('skillforge-users', JSON.stringify(users));

    const userData = { id: newUser.id, username: newUser.username, email: newUser.email };
    setUser(userData);
    localStorage.setItem('skillforge-user', JSON.stringify(userData));

    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('skillforge-users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const userData = { id: user.id, username: user.username, email: user.email };
    setUser(userData);
    localStorage.setItem('skillforge-user', JSON.stringify(userData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillforge-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
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
