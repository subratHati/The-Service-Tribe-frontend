// // // src/pages/Profile.jsx
// // import { useEffect, useState, useCallback } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import axios from "../utils/axios";
// // import { logoutUser } from "../api/auth";
// // import { useUser } from "../context/UserContext";
// // import PhoneNumberDialog from "../components/PhoneNumberDialog";

// // export default function Profile() {
// //   const [user, setUser] = useUser();
// //   const [loading, setLoading] = useState(true);
// //   const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
// //   const navigate = useNavigate();

// //   // refreshProfile returns user object or null; it does NOT navigate.
// //   const refreshProfile = useCallback(async (opts = { skipToast: true }) => {
// //     try {
// //       const res = await axios.get("/auth/profile", {
// //         withCredentials: true,
// //         skipToast: opts.skipToast,
// //       });
// //       setUser(res.data.user);
// //       setLoading(false);
// //       return res.data.user;
// //     } catch (error) {
// //       // IMPORTANT: do not navigate here. Just clear local user and show friendly UI.
// //       console.warn("fetch profile failed:", error?.response?.data || error?.message || error);
// //       setUser(null);
// //       setLoading(false);
// //       try { localStorage.removeItem("user"); } catch (e) {}
// //       return null;
// //     }
// //   }, [setUser]);

// //   useEffect(() => {
// //     // If user exists in context, no need to fetch again
// //     if (user) {
// //       setLoading(false);
// //       return;
// //     }
// //     // otherwise try to fetch — but we will NOT redirect automatically
// //     refreshProfile();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []); // run only on mount

// //   const handleLogout = async () => {
// //     try {
// //       await logoutUser();
// //     } catch (err) {
// //       console.warn("Logout API failed:", err);
// //     }

// //     setUser(null);
// //     try {
// //       localStorage.removeItem("user");
// //       localStorage.removeItem("pendingEmail");
// //       localStorage.setItem("auth-event", "logout");
// //       localStorage.setItem("auth-event-ts", String(Date.now()));
// //     } catch (e) {}

// //     // explicit user-initiated navigation to login
// //     navigate("/login", { replace: true });
// //     try { window.history.replaceState(null, "", "/login"); } catch (e) {}
// //   };

// //   if (loading) return <div className="text-center mt-10">Loading...</div>;

// //   // Not authenticated — show friendly UI and action buttons (no forced redirect)
// //   if (!user) {
// //     return (
// //       <div className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-xl shadow text-center">
// //         <h2 className="text-xl font-semibold mb-4">You're not signed in</h2>
// //         <p className="text-gray-600 mb-6">
// //           Please sign in to view and manage your profile.
// //         </p>
// //         <div className="flex justify-center gap-3">
// //           <Link to="/login" className="px-4 py-2 bg-[#101828] text-white rounded">Go to login</Link>
// //           <Link to="/" className="px-4 py-2 border rounded">Back to home</Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Authenticated UI
// //   return (
// //     <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-xl shadow">
// //       <div className="flex items-center gap-4 mb-6">
// //         <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-700">
// //           {(user.name && user.name.charAt(0).toUpperCase()) || "U"}
// //         </div>
// //         <div>
// //           <div className="text-xs text-gray-500">Name</div>
// //           <div className="text-lg font-semibold">{user.name}</div>
// //           <div className="text-sm text-gray-500 mt-1">{user.email}</div>
// //         </div>
// //       </div>

// //       <div className="space-y-4">
// //         <div>
// //           <div className="text-xs text-gray-500">Phone</div>
// //           <div className="flex items-center gap-3">
// //             <div className="font-medium">{user.phoneNumber || user.phone || "—"}</div>
// //             <button
// //               onClick={() => setOpenPhoneDialog(true)}
// //               className="px-3 py-1 rounded bg-[#101828] text-white text-sm"
// //             >
// //               {user.phoneNumber ? "Edit" : "Add"}
// //             </button>
// //           </div>
// //         </div>

// //         <div>
// //           <div className="text-xs text-gray-500">Joined</div>
// //           <div className="font-medium">
// //             {user.createdAt ? new Date(user.createdAt).toLocaleString() : "—"}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mt-6 flex gap-3">
// //         <button
// //           onClick={handleLogout}
// //           className="px-4 py-2 rounded bg-red-600 text-white"
// //         >
// //           Logout
// //         </button>

// //         <Link to="/bookings" className="px-4 py-2 rounded border">My Bookings</Link>
// //       </div>

// //       <PhoneNumberDialog
// //         open={openPhoneDialog}
// //         currentPhone={user.phoneNumber || ""}
// //         onClose={() => setOpenPhoneDialog(false)}
// //         onSaved={async () => {
// //           setOpenPhoneDialog(false);
// //           await refreshProfile({ skipToast: true });
// //         }}
// //       />
// //     </div>
// //   );
// // }




// // src/pages/Profile.jsx
// import { useEffect, useState, useCallback } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../utils/axios";
// import { logoutUser } from "../api/auth";
// import { useUser } from "../context/UserContext";
// import PhoneNumberDialog from "../components/PhoneNumberDialog";

// export default function Profile() {
//   const [user, setUser] = useUser();
//   const [loading, setLoading] = useState(true);
//   const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
//   const navigate = useNavigate();

//   const refreshProfile = useCallback(async (opts = { skipToast: true }) => {
//     try {
//       const res = await axios.get("/auth/profile", {
//         withCredentials: true,
//         skipToast: opts.skipToast,
//       });
//       setUser(res.data.user);
//       setLoading(false);
//       return res.data.user;
//     } catch (error) {
//       console.warn("fetch profile failed:", error?.response?.data || error?.message || error);
//       setUser(null);
//       setLoading(false);
//       try { localStorage.removeItem("user"); } catch (e) {}
//       return null;
//     }
//   }, [setUser]);

//   useEffect(() => {
//     if (user) {
//       setLoading(false);
//       return;
//     }
//     refreshProfile();
//   }, [user, refreshProfile]);

//   const handleLogout = async () => {
//     try { await logoutUser(); } catch (err) { console.warn(err); }
//     setUser(null);
//     try {
//       localStorage.removeItem("user");
//       localStorage.removeItem("pendingEmail");
//       localStorage.setItem("auth-event", "logout");
//       localStorage.setItem("auth-event-ts", String(Date.now()));
//     } catch (e) {}
//     navigate("/login", { replace: true });
//     try { window.history.replaceState(null, "", "/login"); } catch (e) {}
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   console.log("User detail is :",user);

//   if (!user) {

//     return (
//       <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow text-center">
//         <h2 className="text-xl font-semibold mb-4">You're not signed in</h2>
//         <p className="text-gray-600 mb-6">
//           Please sign in to view and manage your profile.
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-3">
//           <Link to="/login" className="px-4 py-2 bg-[#101828] text-white rounded">Go to login</Link>
//           <Link to="/" className="px-4 py-2 border rounded">Back to home</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto mt-6 sm:mt-8 bg-white p-6 rounded-xl shadow">
//       {/* Profile Header */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//         <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-semibold text-gray-700">
//           {(user.name && user.name.charAt(0).toUpperCase()) || "U"}
//         </div>
//         <div className="text-center sm:text-left">
//           <div className="text-xs text-gray-500">Name</div>
//           <div className="text-lg font-semibold">{user.name}</div>
//           <div className="text-sm text-gray-500 mt-1">{user.email}</div>
//         </div>
//       </div>

//       {/* Profile Details */}
//       <div className="space-y-4">
//         <div>
//           <div className="text-xs text-gray-500">Phone</div>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//             <div className="font-medium">{user.phoneNumber || user.phone || "—"}</div>
//             <button
//               onClick={() => setOpenPhoneDialog(true)}
//               className="px-3 py-1 rounded bg-[#101828] text-white text-sm"
//             >
//               {user.phoneNumber ? "Edit" : "Add"}
//             </button>
//           </div>
//         </div>

//         <div>
//           <div className="text-xs text-gray-500">Joined</div>
//           <div className="font-medium">
//             {user.createdAt ? new Date(user.createdAt).toLocaleString() : "—"}
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex flex-col sm:flex-row gap-3">
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 rounded bg-red-600 text-white w-full sm:w-auto"
//         >
//           Logout
//         </button>

//         <Link
//           to="/bookings"
//           className="px-4 py-2 rounded border w-full sm:w-auto text-center"
//         >
//           My Bookings
//         </Link>

//         <Link
//           to="/support"
//           className="px-4 py-2 rounded border w-full sm:w-auto text-center text-[#FD7014] font-medium"
//         >
//           Need Help?
//         </Link>
//       </div>

//       <PhoneNumberDialog
//         open={openPhoneDialog}
//         currentPhone={user.phoneNumber || ""}
//         onClose={() => setOpenPhoneDialog(false)}
//         onSaved={async () => {
//           setOpenPhoneDialog(false);
//           await refreshProfile({ skipToast: true });
//         }}
//       />
//     </div>
//   );
// }



// src/pages/Profile.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios";
import { logoutUser } from "../api/auth";
import { useUser } from "../context/UserContext";
import PhoneNumberDialog from "../components/PhoneNumberDialog";
import Loading from "../components/Loading";

export default function Profile() {
  const [user, setUser] = useUser();
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
  const navigate = useNavigate();

  // fetch fresh profile from backend
  const refreshProfile = useCallback(async (opts = { skipToast: true }) => {
    try {
      const res = await axios.get("/auth/currentUser", {
        withCredentials: true,
        skipToast: true,
      });
      // ensure we store a normalized user object into context
      const fetched = res.data?.user ?? res.data ?? null;
      setUser(fetched);
      setLoading(false);
      return fetched;
    } catch (error) {
      console.warn(
        "fetch profile failed:",
        error?.response?.data || error?.message || error
      );
      setUser(null);
      setLoading(false);
      try {
        localStorage.removeItem("user");
      } catch (e) { }
      return null;
    }
  }, [setUser]);

  /**
   * Decide whether the current `user` in context is "complete" or just a minimal
   * placeholder (e.g. { id, email, role } returned immediately after login).
   *
   * If it's incomplete, call refreshProfile() to get the full record from /auth/profile.
   */
  useEffect(() => {
    const needsFetch = (u) => {
      if (!u) return true; // no user -> fetch (will result in null or data)
      // If user already has a proper name and createdAt (or phoneNumber), treat as complete.
      // Adjust these checks if your backend returns other identifying fields.
      const hasName = Boolean(u.name || u.fullName || u.displayName);
      const hasCreated = Boolean(u.createdAt || u.created_at || u.joinedAt);
      const hasPhone = Boolean(u.phoneNumber || u.phone);
      // treat as complete if we have at least name and createdAt or phone
      return !(hasName && (hasCreated || hasPhone));
    };

    if (needsFetch(user)) {
      // fetch fresh profile
      refreshProfile();
    } else {
      // user looks complete already
      setLoading(false);
    }
    // Only run when mount and when user reference changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshProfile]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logoutUser();
    } catch (err) {
      console.warn("Logout API failed:", err);
    }

    setUser(null);
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("pendingEmail");
      localStorage.setItem("auth-event", "logout");
      localStorage.setItem("auth-event-ts", String(Date.now()));
    } catch (e) { }

    navigate("/login", { replace: true });
    try {
      window.history.replaceState(null, "", "/login");
    } catch (e) { }

    setLogoutLoading(false);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // If still no user after fetch
  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-semibold mb-4">You're not signed in</h2>
        <p className="text-gray-600 mb-6">Please sign in to view and manage your profile.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/login" className="px-4 py-2 bg-[#101828] text-white rounded">Go to login</Link>
          <Link to="/" className="px-4 py-2 border rounded">Back to home</Link>
        </div>
      </div>
    );
  }

  // Normalise some display fields (safe access for both shapes)
  const displayName = user.name || user.fullName || user.displayName || "—";
  const displayEmail = user.email || user.emailAddress || "—";
  const displayPhone = user.phoneNumber || user.phone || "—";
  const displayJoined = user.createdAt ? new Date(user.createdAt).toLocaleString() : (user.joinedAt ? new Date(user.joinedAt).toLocaleString() : "—");

  return (
    <div className="max-w-md mx-auto mt-6 sm:mt-8 bg-white p-6 rounded-xl shadow">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-semibold text-gray-700">
          {(displayName && String(displayName).charAt(0).toUpperCase()) || "U"}
        </div>
        <div className="text-center sm:text-left">
          <div className="text-xs text-gray-500">Name</div>
          <div className="text-lg font-semibold">{displayName}</div>
          <div className="text-sm text-gray-500 mt-1">{displayEmail}</div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div>
          <div className="text-xs text-gray-500">Phone</div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="font-medium">{displayPhone}</div>
            <button
              onClick={() => setOpenPhoneDialog(true)}
              className="px-3 py-1 rounded bg-[#101828] text-white text-sm"
            >
              {displayPhone && displayPhone !== "—" ? "Edit" : "Add"}
            </button>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Joined</div>
          <div className="font-medium">{displayJoined}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-600 text-white w-full sm:w-auto">
          {logoutLoading ? <Loading variant="button" size="sm" message="Logging out"/> : "Logout"}
        </button>
        {/* <button className="px-4 py-2 rounded bg-[#101828] text-white">
          {loading ? <Loading variant="button" size="sm" message="Saving" /> : "Save"}
        </button> */}
        <Link to="/bookings" className="px-4 py-2 rounded border w-full sm:w-auto text-center">
          My Bookings
        </Link>

        <Link to="/support" className="px-4 py-2 rounded border w-full sm:w-auto text-center text-[#FD7014] font-medium">
          Need Help?
        </Link>
      </div>

      <PhoneNumberDialog
        open={openPhoneDialog}
        currentPhone={user.phoneNumber || user.phone || ""}
        onClose={() => setOpenPhoneDialog(false)}
        onSaved={async () => {
          setOpenPhoneDialog(false);
          await refreshProfile({ skipToast: true });
        }}
      />
    </div>
  );
}

