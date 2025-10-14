// // src/pages/AdminRoutes.jsx
// import { Navigate } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import AdminDashboard from "./AdminDashboard";
// import AdminCategories from "./AdminCategories";
// import CategoryDetails from "./CategoryDetails";
// import AdminPopular from "./AdminPopular";
// import { useUser } from "../context/UserContext";

// export default function AdminRoutes() {
//   const [user, setUser] = useUser();
//   if(!user) return <Navigate to="/login" replace />
//   if(user.role !== "admin") return <Navigate to="/" replace />

//   return (
//     <Routes>
//       <Route index element={<AdminDashboard />} />
//       <Route path="categories" element={<AdminCategories />} />
//       <Route path="categories/:id" element={<CategoryDetails />} />
//       <Route path="popular" element={<AdminPopular />} />
//     </Routes>
//   );
// }



// src/pages/AdminRoutes.jsx
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminCategories from "./AdminCategories";
import CategoryDetails from "./CategoryDetails";
import AdminPopular from "./AdminPopular";
import { useUser } from "../context/UserContext";

export default function AdminRoutes() {
  // useUser returns [user, setUser] in your app
  const [user] = useUser();

  // user === undefined  -> still loading (don't redirect yet)
  // user === null       -> known to be unauthenticated -> redirect to login
  // user exists         -> check role
  if (typeof user === "undefined") {
    // You can return a spinner or null while user info loads.
    // Returning null prevents immediate redirect and avoids flashing.
    return (
      <div className="p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-[#101828] border-gray-200" />
      </div>
    );
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role check (case-insensitive and allow a few aliases)
  const role = (user.role || "").toString().toLowerCase();
  const allowed = ["admin", "administrator", "superadmin"];

  if (!allowed.includes(role)) {
    // Not an admin — redirect to home or show "forbidden" UI
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized — render admin routes
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="categories" element={<AdminCategories />} />
      <Route path="categories/:id" element={<CategoryDetails />} />
      <Route path="popular" element={<AdminPopular />} />
    </Routes>
  );
}
