import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastProvider } from "./ToastProvider";

export default function Layout () {
  const location = useLocation();
  const path = location.pathname;

  //Header ignore pages.
  const noHeaderRoutes = new Set([
    "/login",
    "/register",
    "/verify-email",
    "/forgot",
    "/forgot-reset",
    "/oauth-success",
    "/oauth-error",

  ]);

  // If you want to hide header for any route under "/auth/*" you can use startsWith:
  // const hideHeader = path.startsWith("/auth/");
  const hideHeader = noHeaderRoutes.has(path);

  return (
    <ToastProvider>
     <div className="flex flex-col min-h-screen">
      {/* Top navbar */}
      {!hideHeader && <Header />}

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      {!hideHeader && typeof Footer !== "undefined" && <Footer />}
    </div>
    </ToastProvider>
  );
     
}