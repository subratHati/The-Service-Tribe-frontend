// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  // useUser returns [user, setUser, loading]
  const [user, , loading] = useUser();

  // While we are checking auth status, render nothing or a loader
  if (loading) {
    // Simple inline loader — you can replace with a nicer spinner/component
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is explicitly null -> not authenticated, redirect to login
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // User exists -> render the protected children
  return children;
}
