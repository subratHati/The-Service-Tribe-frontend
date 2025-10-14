// src/pages/ForgotEmail.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../api/auth";

export default function ForgotEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // simple email validation (client-side)
  const validateEmail = (e) => {
    if (!e) return false;
    const trimmed = e.trim();
    return /^\S+@\S+\.\S+$/.test(trimmed) && trimmed.length <= 254;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateEmail(email))  push({ type: "warning", message: "Please enter a valid email." });

    setLoading(true);
    try {
      const res = await requestPasswordReset( email.trim().toLowerCase() );
      // store email for next steps
      try { localStorage.setItem("resetEmail", email.trim().toLowerCase()); } catch(e){}
      push({ type: "success", message: "Reset code send to your email." });
      navigate("/forgot-reset");
    } catch (error) {
      const msg = error.msg;
      console.error("requestPasswordReset:", err);
      push({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Forgot password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <div className="text-sm font-medium mb-1">Registered email</div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="you@example.com"
            required
          />
        </label>

        <button type="submit" disabled={loading} className="w-full bg-[#101828] text-white py-2 rounded">
          {loading ? "Sending..." : "Send reset code"}
        </button>
      </form>
    </div>
  );
}
