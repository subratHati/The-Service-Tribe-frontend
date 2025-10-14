// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { useUser } from "../context/UserContext";

export default function OAuthSuccess() {
  const [, setUser] = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // fetch current user (cookie was set by server)
        const res = await axios.get("/auth/currentUser");
        // optionally save to context/state
         setUser(res.data);
        // redirect home
        navigate("/");
      } catch (err) {
        console.error("oauth success: fetch user failed", err);
        navigate("/login");
      }
    })();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-24 p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Finishing sign-in...</h2>
      <p className="text-gray-600">If you are not redirected automatically, <a href="/" className="text-blue-600">click here</a>.</p>
    </div>
  );
}
