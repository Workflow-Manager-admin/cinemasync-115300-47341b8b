import React, { createContext, useContext, useState, useEffect } from 'react';

// Demo: Simulated apiAuth; replace with real backend calls later
const fakeApi = {
  signup: async (email, password, displayName) => {
    await new Promise((r) => setTimeout(r, 500));
    localStorage.setItem('cinemasync_user', JSON.stringify({ email, displayName }));
    return { email, displayName };
  },
  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    // Accept any password for demo
    let displayName = email.split('@')[0];
    localStorage.setItem('cinemasync_user', JSON.stringify({ email, displayName }));
    return { email, displayName };
  },
  logout: async () => {
    await new Promise((r) => setTimeout(r, 200));
    localStorage.removeItem('cinemasync_user');
  },
  getCurrentUser: () => {
    const u = localStorage.getItem('cinemasync_user');
    return u ? JSON.parse(u) : null;
  },
  updateProfile: async (profile) => {
    await new Promise(r => setTimeout(r, 300));
    localStorage.setItem('cinemasync_user', JSON.stringify(profile));
    return profile;
  }
};

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => fakeApi.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(fakeApi.getCurrentUser());
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    setLoading(true);
    try {
      const u = await fakeApi.login(email, password);
      setUser(u);
      return { user: u, error: null };
    } catch (e) {
      return { user: null, error: "Login failed." };
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      const u = await fakeApi.signup(email, password, displayName);
      setUser(u);
      return { user: u, error: null };
    } catch (e) {
      return { user: null, error: "Registration failed." };
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const logout = async () => {
    setLoading(true);
    await fakeApi.logout();
    setUser(null);
    setLoading(false);
  };

  // PUBLIC_INTERFACE
  const updateProfile = async (profile) => {
    setLoading(true);
    const newProfile = await fakeApi.updateProfile(profile);
    setUser(newProfile);
    setLoading(false);
    return newProfile;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
