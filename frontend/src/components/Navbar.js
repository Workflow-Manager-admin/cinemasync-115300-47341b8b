import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "./Navbar.css";

const logoUrl = "https://img.icons8.com/fluent/48/000000/video-playlist.png";

// PUBLIC_INTERFACE
const Navbar = ({ theme, onToggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <img src={logoUrl} alt="Cinemasync Logo" className="nav-logo" />
          <span className="nav-title">Cinemasync</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/browse">Browse</Link>
        {user && (
          <Link className="nav-btn" to="/party/new">
            Create Watch Party
          </Link>
        )}
      </div>
      <div className="nav-end">
        <button className="nav-theme" onClick={onToggleTheme} title="Switch UI theme">
          {theme === 'light' ? '🌙' : theme === 'dark' ? '☀️' : '🌓'}
        </button>
        {!user && (
          <>
            <Link className="nav-login" to="/login">Login</Link>
            <Link className="nav-register" to="/register">Sign Up</Link>
          </>
        )}
        {user && (
          <div className="nav-menu">
            <Link to="/profile" className="nav-user">{user.displayName || user.email}</Link>
            <button className="nav-logout" onClick={handleLogout} title="Sign out">⎋</button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
