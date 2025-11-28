import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=> {
    const raw = localStorage.getItem('pet_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(()=> {
    const token = localStorage.getItem('pet_token');
    if (token) api.setToken(token);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    api.setToken(res.data.token);
    localStorage.setItem('pet_token', res.data.token);
    localStorage.setItem('pet_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    api.setToken(res.data.token);
    localStorage.setItem('pet_token', res.data.token);
    localStorage.setItem('pet_user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('pet_token');
    localStorage.removeItem('pet_user');
    api.setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
