// // src/pages/Login.jsx
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../api/auth";
// import { useUser } from "../context/UserContext";
// import { useToast } from "../components/ToastProvider";
// import GoogleSignIn from "../components/GoogleSignIn"; // ✅ add this

// function Login() {
//   const navigate = useNavigate();
//   const {push} = useToast();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [user, setUser] = useUser();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await login(form);
//       setUser(res.user);
//        push({ type: "success", title: "Signed in", message: "Welcome back!" });
//       navigate("/");
//     } catch (error) {
//       const serverMsg = error?.msg || error?.response?.data?.msg || "Login failed";
//       push({type: "error", title: "Login failed", message: serverMsg});
//       console.log("Login error ", error);

//       if (typeof serverMsg === "string" && serverMsg.toLowerCase().includes("verify")) {
//         navigate("/verify-email");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
//       <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#101828] text-white py-2 rounded disabled:opacity-60"
//         >
//           {loading ? "Signing in..." : "Sign in"}
//         </button>
//       </form>

//       {/* --- Divider --- */}
//       <div className="my-4 flex items-center gap-3">
//         <div className="h-px bg-gray-200 flex-1" />
//         <span className="text-xs text-gray-500">or</span>
//         <div className="h-px bg-gray-200 flex-1" />
//       </div>

//       {/* ✅ Google sign-in button */}
//       <GoogleSignIn className="w-full justify-center" />

//       <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
//         <div>
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </div>

//         <div>
//           <Link to="/forgot" className="text-blue-600 hover:underline">
//             Forgot password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useUser } from "../context/UserContext";
import { useToast } from "../components/ToastProvider";
import GoogleSignIn from "../components/GoogleSignIn";

function Login() {
  const navigate = useNavigate();
  const { push } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      setUser(res.user);
      push({ type: "success", title: "Signed in", message: "Welcome back!" });
      navigate("/");
    } catch (error) {
      const serverMsg = error?.msg || error?.response?.data?.msg || "Login failed";
      push({ type: "error", title: "Login failed", message: serverMsg });
      console.log("Login error ", error);

      if (typeof serverMsg === "string" && serverMsg.toLowerCase().includes("verify")) {
        navigate("/verify-email");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-12 px-4 sm:px-6">
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
        <h1 className="text-lg sm:text-2xl font-semibold mb-4 text-gray-900">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2.5 text-sm sm:text-base rounded focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2.5 text-sm sm:text-base rounded focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#101828] text-white py-2.5 rounded text-sm sm:text-base disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-500">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Google sign-in */}
        <div className="mb-3">
          <GoogleSignIn className="w-full justify-center text-sm" />
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
          <div className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#101828] hover:underline">
              Register
            </Link>
          </div>

          <div>
            <Link to="/forgot" className="text-[#101828] hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

