import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import "./Profile.css";

// PUBLIC_INTERFACE
function Profile() {
  const { user, updateProfile, loading, logout } = useAuth();

  const [edit, setEdit] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [msg, setMsg] = useState(null);

  if (!user) return <Navigate to="/login" />;

  const handleDisplayNameSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    await updateProfile({ ...user, displayName });
    setEdit(false);
    setMsg("Profile updated.");
  };

  // Example party history
  const parties = [
    { code: "ABC123", title: "Dune", when: "Now", role: "Host" },
    { code: "DEF555", title: "Interstellar", when: "2024-08-12", role: "Joined" },
  ];

  return (
    <div className="profile-root">
      <div className="profile-card">
        <h2>Profile</h2>
        <div className="profile-row">
          <div className="profile-label">Email:</div>
          <div className="profile-value">{user.email}</div>
        </div>
        <div className="profile-row">
          <div className="profile-label">Display Name:</div>
          {!edit ? (
            <>
              <div className="profile-value">{user.displayName}</div>
              <button className="btn btn-mini" style={{marginLeft:10}}
                onClick={() => setEdit(true)}>Edit</button>
            </>
          ) : (
            <form className="profile-editform" onSubmit={handleDisplayNameSubmit}>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                maxLength={35}
                style={{marginRight: "0.6em"}}
                required
              />
              <button className="btn btn-mini" type="submit" disabled={loading}>Save</button>
              <button type="button" className="btn btn-mini" onClick={() => setEdit(false)}>Cancel</button>
            </form>
          )}
        </div>
        {msg && <div className="profile-msg">{msg}</div>}

        <button className="btn profile-logout" onClick={logout}>Logout</button>

        <h3>My Parties</h3>
        <div className="profile-parties">
          {parties.map((p, idx) => (
            <div className="profile-party-row" key={idx}>
              <span>{p.title}</span>
              <span>{p.when}</span>
              <span>{p.role}</span>
              <Link to={`/party/${p.code}`} className="btn btn-mini">Join</Link>
            </div>
          ))}
        </div>
        <Link to="/party/new" className="profile-schedule-link btn">
          + Schedule new Watch Party
        </Link>
      </div>
    </div>
  );
}
export default Profile;
