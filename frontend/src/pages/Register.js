import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "./Register.css";

// PUBLIC_INTERFACE
function Register() {
  const { user, register, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  if (user) return <Navigate to="/browse" />;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!displayName) return setErr("Please enter a display name.");
    const { error } = await register(email, password, displayName);
    if (error) setErr(error);
    else navigate("/browse");
  };

  return (
    <div className="register-container">
      <h2>Join Cinemasync</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          type="text" required maxLength={35}
          autoComplete="nickname"
        />
        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email" required autoComplete="username new-email"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password" required minLength={3} autoComplete="new-password"
        />
        {err && <div className="register-error">{err}</div>}
        <button className="btn" type="submit" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
        <p className="register-alt">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
