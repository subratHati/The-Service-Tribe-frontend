// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";
// import { useCart } from "../context/CartContext";
// import CityDropdown from "./CityDropdown";


// export default function Header() {
//   const [user, setUser] = useUser();
//   const { cart } = useCart();

//   const navigate = useNavigate();

//   const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);


//   return (
//     <header className="bg-white/95 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
//       <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <img src="/images/logo2.png" alt="The Service Tribe" className="w-auto h-[38px]" />
//         </Link>


//         <CityDropdown />

//         <nav className="flex items-center gap-4">
//           <Link to="/category" className="hover:underline">Services</Link>

//           {user ? (
//             <>
//               <Link to="/bookings" className="hover:underline">My Bookings</Link>
//               <Link to="/profile" className="hover:underline">Profile</Link>

//               {/* Cart button */}
//               <button
//                 onClick={() => navigate("/cart")}
//                 className="relative px-3 py-1 rounded hover:bg-gray-100"
//               >
//                 🛒
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="px-3 py-1 rounded bg-gray-900 text-white">Login</Link>
//               <Link to="/register" className="px-3 py-1 rounded bg-gray-200">Register</Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }


// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useUser } from "../context/UserContext";
// import { useCart } from "../context/CartContext";
// import CityDropdown from "./CityDropdown";
// import { Home, ClipboardList, User, Wrench } from "lucide-react";

// export default function Header() {
//   const [user] = useUser();
//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {/* ---------- TOP HEADER ---------- */}
//       <header className="bg-white/95 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <img
//               src="/images/logo2.png"
//               alt="The Service Tribe"
//               className="w-auto h-[36px]"
//             />
//           </Link>

//           {/* City Dropdown */}
//           <div className="hidden md:block">
//             <CityDropdown />
//           </div>

//           {/* Cart */}
//           <button
//             onClick={() => navigate("/cart")}
//             className="relative px-3 py-1 rounded hover:bg-gray-100"
//           >
//             🛒
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* City Dropdown for mobile (below header) */}
//         <div className="block md:hidden px-4 pb-3">
//           <CityDropdown />
//         </div>
//       </header>

//       {/* ---------- NAVIGATION FOR DESKTOP ---------- */}
//       <nav className="hidden md:flex bg-white shadow-sm py-3 justify-center gap-8">
//         <Link
//           to="/"
//           className={`hover:text-orange-500 ${
//             location.pathname === "/" ? "text-orange-500 font-semibold" : ""
//           }`}
//         >
//           Home
//         </Link>

//         <Link
//           to="/category"
//           className={`hover:text-orange-500 ${
//             location.pathname === "/category" ? "text-orange-500 font-semibold" : ""
//           }`}
//         >
//           Services
//         </Link>

//         {user ? (
//           <>
//             <Link
//               to="/bookings"
//               className={`hover:text-orange-500 ${
//                 location.pathname === "/bookings" ? "text-orange-500 font-semibold" : ""
//               }`}
//             >
//               My Bookings
//             </Link>

//             <Link
//               to="/profile"
//               className={`hover:text-orange-500 ${
//                 location.pathname === "/profile" ? "text-orange-500 font-semibold" : ""
//               }`}
//             >
//               Profile
//             </Link>
//           </>
//         ) : (
//           <div className="flex gap-3">
//             <Link
//               to="/login"
//               className="px-3 py-1 rounded bg-gray-900 text-white hover:bg-gray-800"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
//             >
//               Register
//             </Link>
//           </div>
//         )}
//       </nav>

//       {/* ---------- BOTTOM NAV FOR MOBILE ---------- */}
//       {isMobile && user && (
//         <nav className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t border-gray-200 flex justify-around py-2 z-50">
//           <Link
//             to="/"
//             className={`flex flex-col items-center text-xs ${
//               location.pathname === "/" ? "text-orange-500" : "text-gray-600"
//             }`}
//           >
//             <Home size={22} />
//             Home
//           </Link>

//           <Link
//             to="/category"
//             className={`flex flex-col items-center text-xs ${
//               location.pathname === "/category" ? "text-orange-500" : "text-gray-600"
//             }`}
//           >
//             <Wrench size={22} />
//             Services
//           </Link>

//           <Link
//             to="/bookings"
//             className={`flex flex-col items-center text-xs ${
//               location.pathname === "/bookings" ? "text-orange-500" : "text-gray-600"
//             }`}
//           >
//             <ClipboardList size={22} />
//             Bookings
//           </Link>

//           <Link
//             to="/profile"
//             className={`flex flex-col items-center text-xs ${
//               location.pathname === "/profile" ? "text-orange-500" : "text-gray-600"
//             }`}
//           >
//             <User size={22} />
//             Profile
//           </Link>
//         </nav>
//       )}
//     </>
//   );
// }


// src/components/Header.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import CityDropdown from "./CityDropdown";
import { Home, Grid, Clock, User, ShoppingCart, MapPin } from "lucide-react";

export default function Header() {
  const [user] = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLocationModal, setShowLocationModal] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <>
      {/* TOP HEADER */}
      <header className="bg-white/95 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* ---------- MOBILE: left location icon (shows modal) ---------- */}
          <button
            type="button"
            onClick={() => setShowLocationModal(true)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            aria-label="Choose location"
          >
            <MapPin size={20} className="text-[#101828]" />
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <Link to="/" className="flex items-center gap-2 mx-auto md:mx-0 md:flex-shrink-0">
            <img
              src="/images/logo2.png"
              alt="The Service Tribe"
              className="h-8 md:h-[38px] w-auto object-contain"
            />
          </Link>

          {/* On desktop: full CityDropdown (takes remaining width) */}
          <div className="hidden md:flex flex-1 min-w-0 md:ml-4">
            <CityDropdown />
          </div>

          {/* Right-side icons (cart + small auth/profile) */}
          <div className="flex items-center gap-3 ml-3">
            {/* Cart - larger and emphasized */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-3 rounded-full hover:bg-gray-100"
              aria-label="Cart"
            >
              <ShoppingCart size={26} className="text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop nav links (hidden on mobile) */}
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/category" className="hover:underline">Services</Link>
              {user ? (
                <>
                  <Link to="/bookings" className="hover:underline">My Bookings</Link>
                  <Link to="/profile" className="hover:underline">Profile</Link>
                  {user.role === "admin" && (
                    <Link to="/admin" className="hover:underline">Admin</Link>
                  )}

                </>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-1 rounded bg-gray-900 text-white">Login</Link>
                  <Link to="/register" className="px-3 py-1 rounded bg-gray-200">Register</Link>
                </>
              )}
            </nav>

            {/* Mobile small profile/login icon (visible only on mobile) */}
            <div className="md:hidden">
              {!user && (
                <Link to="/login" className="text-sm px-2 py-1">Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ---------- LOCATION MODAL for mobile (activated by left icon) ---------- */}
      {showLocationModal && (
        <div className="fixed inset-0 z-60 flex items-start justify-center">
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowLocationModal(false)}
            aria-hidden
          />
          {/* panel */}
          <div className="relative mt-20 w-[92%] max-w-md bg-white rounded-lg shadow-lg p-4 z-70">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Choose your city</div>
              <button onClick={() => setShowLocationModal(false)} className="px-2 py-1 rounded hover:bg-gray-100">Close</button>
            </div>

            {/* reuse existing CityDropdown - it has its own dropdown and input */}
            <CityDropdown />
          </div>
        </div>
      )}

      {/* BOTTOM NAV - mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <NavButton to="/" label="Home" icon={<Home size={20} />} active={location.pathname === "/"} />
          <NavButton to="/category" label="Services" icon={<Grid size={20} />} active={location.pathname.startsWith("/category")} />
          <NavButton to={user ? "/bookings" : "/login"} label="Bookings" icon={<Clock size={20} />} active={location.pathname === "/bookings"} />
          <NavButton to={user ? "/profile" : "/login"} label="Profile" icon={<User size={20} />} active={location.pathname === "/profile"} />
        </div>
      </nav>
    </>
  );
}

/* small helper for bottom nav items */
function NavButton({ to, label, icon, active }) {
  return (
    <Link
      to={to}
      className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 text-xs ${active ? "text-[#101828]" : "text-gray-500"}`}
    >
      <div className={`p-1 rounded ${active ? "bg-[#101828]/10" : "bg-transparent"}`}>{icon}</div>
      <div className="text-[11px]">{label}</div>
    </Link>
  );
}
