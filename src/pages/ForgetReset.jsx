// // src/pages/ForgotReset.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { requestPasswordReset, verifyAndResetPassowrd } from "../api/auth";

// export default function ForgotReset() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);

//   useEffect(() => {
//     const stored = localStorage.getItem("resetEmail");
//     if (!stored) {
//       // no email: user should start from /forgot
//       navigate("/forgot");
//       return;
//     }
//     setEmail(stored);
//   }, [navigate]);

//   // simple password rule: min 6, includes upper+lower+digit+special (adjust if you want)
//   const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

//   const handleResend = async () => {
//     if (!email) return alert("No email found");
//     setResendLoading(true);
//     try {
//       await requestPasswordReset(email);
//       alert("Reset code resent to your email.");
//       navigate("/forgot-reset");
//     } catch (err) {
//       const msg = err?.response?.data?.msg || err?.msg || "Resend failed";
//       alert(msg);
//       console.error("resend error", err);
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // validations
//     if (!email) return alert("Missing email. Go to Forgot page.");
//     if (!otp || otp.trim().length === 0) return alert("Please enter the OTP you received.");
//     if (!newPassword) return alert("Enter new password.");
//     if (newPassword !== confirmPassword) return alert("Passwords do not match.");
//     if (!PASSWORD_REGEX.test(newPassword)) {
//       return alert("Password must be minimum 6 chars and include uppercase, lowercase, a number and a special character.");
//     }

//     setLoading(true);
//     try {
//       await verifyAndResetPassowrd({ email, otp: otp.trim(), newPassword });
//       // cleanup and redirect
//       localStorage.removeItem("resetEmail");
//       alert("Password updated. Please login.");
//       navigate("/login");
//     } catch (err) {
//       const msg = err?.response?.data?.msg || err?.msg || "Reset failed";
//       alert(msg);
//       console.error("reset error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
//       <h2 className="text-xl font-semibold mb-4">Reset password</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <div className="text-sm text-gray-600 mb-1">For</div>
//           <div className="p-2 bg-gray-100 rounded">{email}</div>
//         </div>

//         <label>
//           <div className="text-sm font-medium">OTP</div>
//           <input
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full border p-2 rounded"
//             placeholder="Enter the code you received"
//           />
//         </label>

//         <label>
//           <div className="text-sm font-medium">New password</div>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full border p-2 rounded"
//             placeholder="New password"
//           />
//         </label>

//         <label>
//           <div className="text-sm font-medium">Confirm password</div>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full border p-2 rounded"
//             placeholder="Confirm password"
//           />
//         </label>

//         <div className="flex gap-2 items-center">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 px-4 py-2 bg-[#101828] text-white rounded"
//           >
//             {loading ? "Updating..." : "Update password"}
//           </button>

//           <button
//             type="button"
//             onClick={handleResend}
//             disabled={resendLoading}
//             className="px-4 py-2 border rounded"
//           >
//             {resendLoading ? "Resending..." : "Resend OTP"}
//           </button>
//         </div>
//       </form>

//       <p className="mt-4 text-sm text-gray-600">
//         <Link to="/forgot" className="text-blue-600 hover:underline">Change email</Link>{" "}
//         · <Link to="/login" className="text-blue-600 hover:underline">Back to login</Link>
//       </p>
//     </div>
//   );
// }



// src/pages/ForgotReset.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestPasswordReset, verifyAndResetPassowrd } from "../api/auth";
import { useToast } from "../components/ToastProvider";

export default function ForgotReset() {
  const navigate = useNavigate();
  const { push } = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("resetEmail");
    if (!stored) {
      // no email: user should start from /forgot
      navigate("/forgot", { replace: true });
      return;
    }
    setEmail(stored);
  }, [navigate]);

  // simple password rule: min 6, includes upper+lower+digit+special (adjust if you want)
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

  const handleResend = async () => {
    if (!email) return push({ type: "warning", message: "No email found." });
    setResendLoading(true);
    try {
      await requestPasswordReset(email);
      push({ type: "success", message: "Reset code resent to your email." });
      // keep user on same page; server likely re-sent code
    } catch (err) {
      const msg = err?.response?.data?.msg || "Resend failed";
      push({ type: "error", message: msg });
      console.error("resend error", err);
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations (unchanged logic)
    if (!email) return push({ type: "warning", message: "Missing email. Go to Forgot page." });
    if (!otp || otp.trim().length === 0) return push({ type: "warning", message: "Please enter the OTP you received." });
    if (!newPassword) return push({ type: "warning", message: "Enter new password." });
    if (newPassword !== confirmPassword) return push({ type: "warning", message: "Passwords do not match." });
    if (!PASSWORD_REGEX.test(newPassword)) {
      return push({ type: "warning", message: "Password must be minimum 6 chars and include uppercase, lowercase, number and special character." });
    }

    setLoading(true);
    try {
      await verifyAndResetPassowrd({ email, otp: otp.trim(), newPassword });
      localStorage.removeItem("resetEmail");
      push({ type: "success", message: "Password updated. Please login." });
      navigate("/login", { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.msg || "Reset failed";
      push({ type: "error", message: msg });
      console.error("reset error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#101828] mb-4 text-center">Reset password</h2>

        <p className="text-sm text-gray-600 mb-4 text-center">
          We sent a reset code to <span className="font-medium text-gray-800">{email || "your email"}</span>.
          Enter the code and set a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="text-sm text-gray-500 mb-1">For</div>
          <div className="p-2 bg-gray-100 rounded-lg font-medium text-sm">{email}</div>

          <label className="block">
            <div className="text-sm font-medium text-gray-700 mt-2 mb-1">OTP</div>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
              placeholder="Enter the code you received"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium text-gray-700 mt-2 mb-1">New password</div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
              placeholder="New password"
              autoComplete="new-password"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium text-gray-700 mt-2 mb-1">Confirm password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#101828] text-white rounded-lg font-medium text-sm sm:text-base hover:opacity-95 disabled:opacity-70 transition"
            >
              {loading ? "Updating..." : "Update password"}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="px-4 py-2 border rounded-lg text-[#101828] text-sm sm:text-base hover:bg-gray-100 disabled:opacity-70"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          <Link to="/forgot" className="text-[#101828] hover:underline">Change email</Link>{" "}
          · <Link to="/login" className="text-[#101828] hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
