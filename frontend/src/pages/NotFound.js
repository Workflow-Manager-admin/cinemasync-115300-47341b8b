import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
function NotFound() {
  return (
    <div style={{
      textAlign: "center",
      margin: "8vw auto",
      color: "var(--text-primary, #333)"
    }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link className="btn" to="/">Go Home</Link>
    </div>
  );
}
export default NotFound;
