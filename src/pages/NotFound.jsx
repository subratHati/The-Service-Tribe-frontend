// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-6xl font-extrabold text-[#FD7014] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you are looking for does not exist, or the URL is incorrect.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 rounded bg-[#FD7014] text-white font-medium hover:bg-[#e6600f] transition"
      >
        Go to Home
      </button>
    </div>
  );
}
