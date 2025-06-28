import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "./Login.css";

// PUBLIC_INTERFACE
function Login() {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  if (user) return <Navigate to="/browse" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const { error } = await login(email, password);
    if (error) setErr(error);
    else navigate("/browse");
  };

  return (
    <div className="login-container">
      <h2>Sign In to Cinemasync</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email" required autoFocus autoComplete="username"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password" required autoComplete="current-password"
        />
        {err && <div className="login-error">{err}</div>}
        <button className="btn" type="submit" disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
        <p className="login-alt">
          New to Cinemasync?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
