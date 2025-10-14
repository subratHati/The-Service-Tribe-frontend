// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../api/auth";
// import { useToast } from "../components/ToastProvider";

// function Register() {
//   const navigate = useNavigate();
//   const {push} = useToast();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);

//   const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
//   const PHONE_REGEX = /^[0-9]{10}$/;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // basic client-side validation for email.
//       if (!form.email || typeof form.email !== "string") {
//         push({ type: "warning", title: "Invalid Email", message: "Email is required." });
//         setLoading(false);
//         return;
//       }
//       const [local, domain] = form.email.split("@");
//       if (!local || !domain) {
//         push({ type: "warning", title: "Invalid Email", message: "Please enter a valid email." });
//         setLoading(false);
//         return;
//       }

//       //client-side validation for password.
//       if (!form.password) {
//         push({ type: "warning", title: "Password Required", message: "Please enter a password." });
//         setLoading(false);
//         return;
//       }
//       if (!PASSWORD_REGEX.test(form.password)) {
//         push({
//           type: "warning",
//           title: "Weak Password",
//           message: "Password must include uppercase, lowercase, number, and special character (min 6 chars)."
//         });
//         setLoading(false);
//         return;
//       }

//       //basic phone number validation.
//       if (!PHONE_REGEX.test(form.phoneNumber)) {
//         push({ type: "warning", title: "Invalid Phone", message: "Please enter a valid 10-digit phone number." });
//         setLoading(false);
//         return;
//       }

//       const res = await registerUser(form);
//       try { localStorage.setItem("pendingEmail", form.email); } catch (e) { }


//      push({ type: "success", title: "Registration Successful", message: "Please verify your email to continue." });
//       navigate("/verify-email");
//     } catch (error) {
//        push({ type: "error", title: "Registration Failed", message: serverMsg });
//       console.log("Registration error", error.msg);
//     } finally {
//       setLoading(false);
//     }
//   }


//   return (
//     <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
//       <h1 className="text-2xl font-semibold mb-4">Create an account</h1>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#101828] text-white py-2 rounded"
//         >
//           {loading ? "Creating account..." : "Register"}
//         </button>
//       </form>

//       <p className="mt-4 text-sm text-gray-600">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-600 hover:underline">
//           Log in
//         </Link>
//       </p>
//     </div>
//   )
// }

// export default Register;


// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useToast } from "../components/ToastProvider";

function Register() {
  const navigate = useNavigate();
  const { push } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  const PHONE_REGEX = /^[0-9]{10}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Email validation
      if (!form.email || typeof form.email !== "string") {
        push({ type: "warning", message: "Email is required." });
        setLoading(false); return;
      }
      const [local, domain] = form.email.split("@");
      if (!local || !domain) {
        push({ type: "warning", message: "Please enter a valid email." });
        setLoading(false); return;
      }

      // Password validation
      if (!form.password) {
        push({ type: "warning", message: "Please enter a password." });
        setLoading(false); return;
      }
      if (!PASSWORD_REGEX.test(form.password)) {
        push({
          type: "warning",
          message: "Password must include uppercase, lowercase, number, and special character (min 6 chars)."
        });
        setLoading(false); return;
      }

      // Phone validation
      if (!PHONE_REGEX.test(form.phoneNumber)) {
        push({ type: "warning", message: "Please enter a valid 10-digit phone number." });
        setLoading(false); return;
      }

      await registerUser(form);
      try { localStorage.setItem("pendingEmail", form.email); } catch (e) {}
      push({ type: "success", message: "Registration successful! Please verify your email." });
      navigate("/verify-email");
    } catch (error) {
      const serverMsg = error?.response?.data?.msg || error?.msg || "Registration failed";
      console.error("Registration error", error);
      push({ type: "error", message: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#101828] mb-5 text-center">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            value={form.phoneNumber}
            onChange={handleChange}
            inputMode="numeric"
            autoComplete="tel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#101828]/20"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#101828] text-white py-2.5 rounded-lg font-medium text-sm sm:text-base hover:opacity-95 disabled:opacity-70 transition"
            aria-busy={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#101828] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
