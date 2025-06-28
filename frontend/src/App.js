import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import PartyStepper from './pages/PartyStepper';
import PartyRoom from './pages/PartyRoom';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import { AuthProvider } from './contexts/AuthContext';

import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Prefer theme auto based on system, allow user override
  const pv = localStorage.getItem('cinemasync_theme') || 'auto';
  const [theme, setTheme] = useState(pv);

  useEffect(() => {
    let newTheme = theme;
    if (theme === 'auto') {
      newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cinemasync_theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    if (theme === 'auto') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('auto');
  };

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/party/new/*" element={<PartyStepper />} />
              <Route path="/party/:code" element={<PartyRoom />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
