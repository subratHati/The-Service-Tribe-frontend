// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { verifyEmail, resendOTP } from "../api/auth";

// export default function VerifyEmail() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState();
//   const [otp, setOtp] = useState();
//   const [loading, setLoading] = useState();

//   useEffect(() => {
//     const pending = localStorage.getItem("pendingEmail");
//     if (pending) {
//       setEmail(pending);
//     } else {
//       // no pending email? send user back to register
//       navigate("/register");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) return push({ type: "warning", title: "Missing email", message: "Email is missing! Please register again" });
//     if (!otp) return push({ type: "warning", title: "Missing OTP", message: "Please enter the OTP sent to your email." });

//     setLoading(true);
//     try {
//       const res = await verifyEmail(email, otp);
//       localStorage.removeItem("pendingEmail");
//       alert("Email verify successfully");
//       navigate('/login');
//     } catch (error) {
//       const message = error?.response?.data?.msg || error.msg || "Verification failed";
//       push({ type: "error", title: "Verification failed", message });
//       console.error("verify error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleResend = async () => {
//     if (!email) {
//       return push({
//         type: "warning",
//         title: "No email found",
//         message: "Please re-register or enter your email to resend OTP.",
//       });
//     }
//     setLoading(true);
//     try {
//       const res = await resendOTP(email);
//       push({
//         type: "success",
//         title: "OTP Sent",
//         message: res.msg || "OTP has been resent to your email.",
//       });

//     } catch (err) {
//       console.error(err);
//       push({ type: "error", title: "Failed", message: "Failed to resend OTP." });
//     } finally { setLoading(false); }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
//       <h1 className="text-2xl font-semibold mb-4">Verify your email</h1>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <label>
//           <div className="text-sm font-medium">Email</div>
//           <input value={email} readOnly onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" />
//         </label>

//         <label>
//           <div className="text-sm font-medium">Enter OTP</div>
//           <input value={otp} onChange={e => setOtp(e.target.value)} className="w-full border p-2 rounded" />
//         </label>

//         <div className="flex gap-2">
//           <button type="submit" disabled={loading} className="px-4 py-2 bg-[#101828] text-white rounded">
//             {loading ? "Verifying..." : "Verify"}
//           </button>
//           <button type="button" onClick={handleResend} className="px-4 py-2 border rounded">
//             Resend OTP
//           </button>
//         </div>
//       </form>

//       <p className="mt-4 text-sm text-gray-600">
//         <Link to="/login" className="text-blue-600 hover:underline">Back to login</Link>
//       </p>
//     </div>
//   );
// }


// src/pages/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmail, resendOTP, currentUser } from "../api/auth";
import { useToast } from "../components/ToastProvider";


export default function VerifyEmail() {
  const navigate = useNavigate();
  const { push } = useToast();
  const [email, setEmail] = useState("");
  const [user, setUser] = useUser ? useUser() : [null, () => { }];
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const pending = localStorage.getItem("pendingEmail");
    if (pending) {
      setEmail(pending);
    } else {
      // If no pending email, send user back to register
      navigate("/register", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return push({ type: "warning", message: "Email is missing! Please register again." });
    if (!otp) return push({ type: "warning", message: "Please enter the OTP sent to your email." });

    setLoading(true);
    try {
      const res = await verifyEmail(email, otp);
      const token = res?.token;
      const userObj = res?.user;
      if (token) {
        try {
          localStorage.setItem("token", token);
        } catch (error) {
          // ignore this.
        }
      }

      if (userObj) {
        try {
          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
        } catch (e) { /* ignore */ }
      } else {
        try {
          const me = await currentUser();
          setUser(me.data);
          localStorage.setItem("user", JSON.stringify(me.data));
        } catch (e) {
          // ignore if fetch fails, but inform user
          console.warn("Failed to fetch currentUser after verify:", e);
        }
      }

      // broadcast login event to other tabs
      try {
        localStorage.setItem("auth-event", "login");
        setTimeout(() => localStorage.removeItem("auth-event"), 100);
      } catch (e) { }

      localStorage.removeItem("pendingEmail");
      push({ type: "success", message: "Email verified successfully!" });
      navigate("/", { replace: true });
    } catch (error) {
      const message = error?.response?.data?.msg || error?.msg || "Verification failed";
      push({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      return push({ type: "warning", message: "No email found. Please re-register to resend OTP." });
    }
    setResendLoading(true);
    try {
      const res = await resendOTP(email);
      push({ type: "success", message: res?.msg || "OTP has been resent to your email." });
    } catch (err) {
      push({ type: "error", message: "Failed to resend OTP." });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#101828] mb-4 text-center">
          Verify Your Email
        </h1>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter the verification code sent to <span className="font-medium">{email || "your email"}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              readOnly
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 text-sm sm:text-base border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-sm sm:text-base border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#101828] text-white font-medium rounded-md text-sm sm:text-base hover:opacity-95 disabled:opacity-70 transition"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm sm:text-base hover:bg-gray-50 transition"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already verified?{" "}
          <Link to="/login" className="text-[#101828] hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
