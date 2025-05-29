'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// AuthContext: provides authentication state and actions to the app
const AuthContext = createContext();

// AuthProvider: wraps the app and provides authentication logic
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents UI flash before auth check

  // On mount, check if a token exists and validate it
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      setLoading(false);
      return;
    }

    fetch('/api/validate', {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then(() => {
        setToken(savedToken);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Login: save token and update state
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Logout: remove token and update state
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {/* Render children only after loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// useAuth: custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);