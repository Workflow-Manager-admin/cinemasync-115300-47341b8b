import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "./Home.css";

const HIGHLIGHTS = [
  "🎬 Watch Netflix, Disney+, Hulu, Prime and more—together",
  "💬 Synchronized video and group chat built-in",
  "🤝 Invite friends & start a party in seconds",
];

const FEATURE_GRAPHIC = "https://img.icons8.com/color/96/000000/clapperboard--v2.png";

// PUBLIC_INTERFACE
function Home() {
  const { user } = useAuth();
  const [partyCode, setPartyCode] = useState("");
  const navigate = useNavigate();

  const handleJoinParty = (e) => {
    e.preventDefault();
    if (partyCode.length > 2) {
      navigate(`/party/${partyCode.trim()}`);
    }
  };

  return (
    <div className="home-hero">
      <div className="home-header">
        <img src={FEATURE_GRAPHIC} alt="Cinemasync Party" className="home-graphic" />
        <h1 className="home-title">Cinemasync: Watch together, wherever you are</h1>
        <ul className="home-features">
          {HIGHLIGHTS.map((str, idx) => (
            <li key={idx}>{str}</li>
          ))}
        </ul>

        <div className="home-actions">
          {!user && (
            <>
              <Link className="btn main-login" to="/login">Login</Link>
              <span style={{ margin: "0 1em", color: "#bbb" }}>|</span>
              <Link className="btn main-register" to="/register">Create account</Link>
            </>
          )}
          {user && (
            <>
              <Link className="btn main-browse" to="/browse">Browse Titles</Link>
              <Link className="btn main-party" to="/party/new" style={{ marginLeft: "1em" }}>
                Start a Watch Party
              </Link>
            </>
          )}
        </div>

        <form className="home-party-form" onSubmit={handleJoinParty}>
          <input
            type="text"
            placeholder="Enter party code"
            value={partyCode}
            onChange={e => setPartyCode(e.target.value)}
            className="home-party-input"
            minLength={3}
            maxLength={10}
            aria-label="Party code"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <button className="btn" type="submit" disabled={partyCode.length < 3}>
            Join Party
          </button>
        </form>
        <p className="home-note">
          No account? <Link to="/register">Sign up now</Link>
        </p>
      </div>
    </div>
  );
}
export default Home;
