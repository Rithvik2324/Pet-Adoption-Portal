import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPet from './pages/AddPet';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

export default function App(){
  const { user, logout } = useAuth();
  return (
    <div>
      <nav className="nav">
        <Link to="/" className="brand">PetAdopt</Link>
        <div>
          {user ? (
            <>
              <span className="muted">Hi, {user.name}</span>
              {user.role === 'admin' && <Link to="/dashboard" className="nav-btn">Dashboard</Link>}
              {user.role === 'admin' && <Link to="/add" className="nav-btn">Add Pet</Link>}
              <button className="nav-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/register" className="nav-btn">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<PrivateRoute adminOnly><AddPet/></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute adminOnly><Dashboard/></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}
