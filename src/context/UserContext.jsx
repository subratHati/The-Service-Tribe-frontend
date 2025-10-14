// src/context/UserContext.jsx
import { useContext, createContext, useState, useEffect } from "react";
import axios from "../utils/axios";

const UserContext = createContext(null);

/**
 * Returns: [user, setUser, loading]
 * - user === undefined  -> initial loading check in progress
 * - user === null       -> not authenticated
 * - user === object     -> authenticated
 *
 * Keep array return to remain compatible with existing destructuring:
 * const [user, setUser] = useUser();
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined -> still checking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        // fast-path: try localStorage first
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (!cancelled) {
            setUser(parsed);
            setLoading(false);
            return;
          }
        }

        // server-check (cookie-based auth). skipToast true to avoid global toasts for 401.
        const res = await axios.get("/auth/currentUser", { withCredentials: true, skipToast: true });
        if (!cancelled) {
          setUser(res.data);
          try { localStorage.setItem("user", JSON.stringify(res.data)); } catch (e) {}
        }
      } catch (err) {
        // expected: 401 when not logged in. Don't show toast here.
        if (!cancelled) {
          setUser(null);
          try { localStorage.removeItem("user"); } catch (e) {}
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCurrentUser();
    return () => { cancelled = true; };
  }, []);

  // sync localStorage with user changes
  useEffect(() => {
    if (user === undefined) return; // still checking
    try {
      if (user === null) localStorage.removeItem("user");
      else localStorage.setItem("user", JSON.stringify(user));
    } catch (e) { /* ignore storage failures */ }
  }, [user]);

  // Listen for auth events from other tabs (broadcast via localStorage)
  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key) return;
      if (e.key === "auth-event") {
        const payload = e.newValue;
        if (!payload) return;
        if (payload === "logout") {
          setUser(null);
        } else if (payload === "login") {
          // quick attempt to refresh user
          axios.get("/auth/currentUser", { withCredentials: true, skipToast: true })
            .then(r => setUser(r.data))
            .catch(() => setUser(null));
        } else {
          // generic re-check
          axios.get("/auth/currentUser", { withCredentials: true, skipToast: true })
            .then(r => setUser(r.data))
            .catch(() => setUser(null));
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, loading]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
