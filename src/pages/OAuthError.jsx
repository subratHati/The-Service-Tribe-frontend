// src/pages/OAuthError.jsx
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function OAuthError() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const msg = params.get("msg") || "Unknown error";

  return (
    <div className="max-w-md mx-auto mt-24 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Sign-in failed</h2>
      <p className="text-gray-700 mb-4">{msg}</p>
      <Link to="/login" className="text-blue-600">Back to login</Link>
    </div>
  );
}
