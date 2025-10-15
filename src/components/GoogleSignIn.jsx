// src/components/GoogleSignIn.jsx
import React from "react";

export default function GoogleSignIn({ className = "" }) {

  const production_url = import.meta.env.VITE_API_URL;
  const startOauth = () => {
    // open the backend route to start OAuth
    window.location.href = `${production_url}/api/auth/google` || "http://localhost:5000/api/auth/google";
    // If your API is on different origin in dev, use full URL: http://localhost:5000/api/auth/google
  };

  return (
    <button
      onClick={startOauth}
      className={`inline-flex items-center gap-2 px-4 py-2 border rounded ${className}`}
    >
      <img src="/images/google-logo.svg" alt="Google" className="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>
  );
}
