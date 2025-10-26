// // import { createContext, useContext, useState, useCallback, useEffect } from "react";
// // import { registerPush } from "../utils/toastService";

// // const ToastContext = createContext(null);

// // /**
// //  * toast = { id, type: 'success'|'info'|'warning'|'error', title, message, timeout }
// //  */

// // export function ToastProvider({ children }) {
// //     const [toasts, setToasts] = useState([]);

// //     const push = useCallback((toast) => {
// //         const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// //         const t = {
// //             id,
// //             type: toast.type || "info",
// //             title: toast.title || "",
// //             message: toast.message || "",
// //             timeout: typeof toast.timeout === "number" ? toast.timeout : 5000,
// //         };

// //         setToasts((s) => [t, ...s]);
// //         return id;
// //     }, []);

// //     useEffect(() => {
// //         // lazy import to avoid circular deps
// //         import("../utils/toastNotifier").then(mod => mod.setPushToast(push)).catch(() => { });
// //     }, [push]);

// //     const remove = useCallback((id) => {
// //         setToasts((s) => s.filter(t => t.id !== id));
// //     }, []);

// //     //auto remove toast after their timeout.
// //     useEffect(() => {
// //         const timers = toasts.map(t => {
// //             if (!t.timeout) return null;
// //             return setTimeout(() => remove(t.id), t.timeout);

// //         }).filter(Boolean);

// //         return () => timers.forEach(clearTimeout);
// //     }, [toasts, remove]);

// //     return (
// //         <ToastContext.Provider value={{ push, remove }}>
// //             {children}
// //             <ToastContainer toasts={toasts} onRemove={remove} />
// //         </ToastContext.Provider>
// //     );
// // }

// // export function useToast() {
// //     const ctx = useContext(ToastContext);
// //     if (!ctx) throw new Error("useToast must be used inside useProvider");
// //     return ctx;
// // }

// // /*----------------------------UI------------------------------------*/

// // function ToastContainer({ toasts, onRemove }) {
// //     return (
// //         <div aria-live="polite" className="fixed top-4 right-4 z-60 flex flex-col gap-3 max-w-xs">
// //             {toasts.map(t => <Toast key={t.id} toast={t} onRemove={onRemove} />)}
// //         </div>
// //     );
// // }

// // function Toast({ toast, onRemove }) {
// //     const { id, type, title, message } = toast;

// //     const color = {
// //         success: "bg-green-50 border-green-200 text-green-800",
// //         info: "bg-blue-50 border-blue-200 text-blue-800",
// //         warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
// //         error: "bg-red-50 border-red-200 text-red-800",
// //     }[type] || "bg-gray-50 border-gray-200 text-gray-800";

// //     const icon = {
// //         success: (
// //             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
// //             </svg>
// //         ),
// //         info: (
// //             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01" />
// //             </svg>
// //         ),
// //         warning: (
// //             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
// //             </svg>
// //         ),
// //         error: (
// //             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
// //             </svg>
// //         ),
// //     }[type];

// //     return (
// //         <div className={`flex items-start gap-3 p-3 border rounded shadow-sm ${color} ring-1 ring-black/5`}>
// //             <div className="flex-shrink-0 mt-0.5">{icon}</div>
// //             <div className="flex-1 min-w-0">
// //                 {title && <div className="font-semibold text-sm truncate">{title}</div>}
// //                 <div className="text-sm leading-tight">{message}</div>
// //             </div>
// //             <button aria-label="Close notification" onClick={() => onRemove(id)} className="ml-3 text-sm opacity-80 hover:opacity-100">
// //                 ✕
// //             </button>
// //         </div>

// //     );
// // }



// import { createContext, useContext, useState, useCallback, useEffect } from "react";

// const ToastContext = createContext(null);

// /**
//  * toast = { id, type: 'success'|'info'|'warning'|'error', title, message, timeout }
//  */

// export function ToastProvider({ children }) {
//   const [toasts, setToasts] = useState([]);

//   const push = useCallback((toast) => {
//     const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

//     const t = {
//       id,
//       type: toast.type || "info",
//       title: toast.title || "",
//       message: toast.message || "",
//       timeout: typeof toast.timeout === "number" ? toast.timeout : 5000,
//     };

//     setToasts((s) => [t, ...s]);
//     return id;
//   }, []);

//   useEffect(() => {
//     // optional: expose push globally
//     import("../utils/toastNotifier").then(mod => mod.setPushToast(push)).catch(() => {});
//   }, [push]);

//   const remove = useCallback((id) => {
//     setToasts((s) => s.filter(t => t.id !== id));
//   }, []);

//   return (
//     <ToastContext.Provider value={{ push, remove }}>
//       {children}
//       <ToastContainer toasts={toasts} onRemove={remove} />
//     </ToastContext.Provider>
//   );
// }

// export function useToast() {
//   const ctx = useContext(ToastContext);
//   if (!ctx) throw new Error("useToast must be used inside ToastProvider");
//   return ctx;
// }

// /* ----------------- Toast UI ----------------- */

// function ToastContainer({ toasts, onRemove }) {
//   return (
//     <div className="fixed top-4 right-4 z-50 flex flex-col gap-4 max-w-sm">
//       {toasts.map((t) => (
//         <Toast key={t.id} toast={t} onRemove={onRemove} />
//       ))}
//     </div>
//   );
// }

// function Toast({ toast, onRemove }) {
//   const { id, type, title, message, timeout = 5000 } = toast;
//   const themeColor = "#101828";

//   const icons = {
//     success: (
//       <svg className="w-6 h-6" fill="none" stroke={themeColor} strokeWidth={2} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//       </svg>
//     ),
//     info: (
//       <svg className="w-6 h-6" fill="none" stroke={themeColor} strokeWidth={2} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
//       </svg>
//     ),
//     warning: (
//       <svg className="w-6 h-6" fill="none" stroke={themeColor} strokeWidth={2} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//       </svg>
//     ),
//     error: (
//       <svg className="w-6 h-6" fill="none" stroke={themeColor} strokeWidth={2} viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//       </svg>
//     ),
//   };

//   const [progress, setProgress] = useState(100);

//   // Animate progress
//   useEffect(() => {
//     let start;
//     let raf;

//     const step = (timestamp) => {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;
//       const percentage = Math.max(0, 100 - (elapsed / timeout) * 100);
//       setProgress(percentage);
//       if (elapsed < timeout) {
//         raf = requestAnimationFrame(step);
//       } else {
//         onRemove(id);
//       }
//     };

//     raf = requestAnimationFrame(step);

//     return () => cancelAnimationFrame(raf);
//   }, [timeout, onRemove, id]);

//   return (
//     <div
//       className="relative flex items-start gap-4 p-5 border-l-4 rounded-lg shadow-lg bg-white animate-fadeIn"
//       style={{ borderColor: themeColor, minWidth: 360 }}
//     >
//       <div className="flex-shrink-0 mt-1">{icons[type]}</div>
//       <div className="flex-1 min-w-0">
//         {title && <div className="font-semibold text-lg mb-1 text-gray-900">{title}</div>}
//         <div className="text-gray-700 text-base leading-snug">{message}</div>
//         <div className="mt-3 h-1 w-full bg-gray-200 rounded">
//           <div
//             className="h-1 rounded"
//             style={{
//               width: `${progress}%`,
//               backgroundColor: themeColor,
//               transition: "width 50ms linear",
//             }}
//           />
//         </div>
//       </div>
//       <button
//         aria-label="Close notification"
//         onClick={() => onRemove(id)}
//         className="ml-3 text-gray-500 hover:text-gray-900 font-bold text-lg"
//       >
//         ✕
//       </button>
//     </div>
//   );
// }



// src/components/ToastProvider.jsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastContext = createContext(null);

/**
 * toast = {
 *   id,
 *   type: 'success'|'info'|'warning'|'error',
 *   title,
 *   message,
 *   timeout (ms)
 * }
 */

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((toast = {}) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

    // sanitize message: remove obvious "error code" fragments like "code: 1234" or "error #123"
    const sanitize = (txt) => {
      if (!txt) return "";
      // strip tokens like "code: 1234", "error: 123", "err 123", "#1234"
      let s = txt.replace(/\b(error|err|code)\b[:#\s-]*\d+\b/gi, "");
      // remove stray codes like "(1234)" at end
      s = s.replace(/\(\s*\d{2,}\s*\)\s*$/g, "");
      return s.trim();
    };

    const t = {
      id,
      type: toast.type || "info",
      title: toast.title ? sanitize(toast.title) : "",
      message: sanitize(toast.message || toast.msg || ""),
      timeout: typeof toast.timeout === "number" ? toast.timeout : 5000,
    };

    // Put newest on top
    setToasts((s) => [t, ...s]);
    return id;
  }, []);

  useEffect(() => {
    // optional integration with utils/toastNotifier (legacy usage)
    import("../utils/toastNotifier")
      .then((mod) => mod.setPushToast && mod.setPushToast(push))
      .catch(() => {});
  }, [push]);

  const remove = useCallback((id) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

/* ---------------- Toast UI ---------------- */

function ToastContainer({ toasts, onRemove }) {
  // On small screens we show a bottom full-width stack; on larger screens right-top column.
  return (
    <>
      {/* Desktop / larger screens: top-right stacked */}
      <div className="hidden sm:flex fixed top-4 right-4 z-50 flex-col gap-3 max-w-sm">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </div>

      {/* Mobile: bottom full-width stack with slight offsets */}
      <div className="sm:hidden fixed left-4 right-4 bottom-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onRemove={onRemove} mobile />
        ))}
      </div>
    </>
  );
}

function Toast({ toast, onRemove, mobile = false }) {
  const { id, type = "info", title, message, timeout = 3000 } = toast;

  // theme design for each type
  const theme = {
    success: {
      border: "border-green-500",
      bg: "bg-green-50",
      accent: "#16A34A",
      text: "text-green-800",
      iconStroke: "#16A34A",
    },
    info: {
      border: "border-blue-600",
      bg: "bg-blue-50",
      accent: "#0EA5E9",
      text: "text-blue-800",
      iconStroke: "#0EA5E9",
    },
    warning: {
      border: "border-amber-500",
      bg: "bg-amber-50",
      accent: "#F59E0B",
      text: "text-amber-800",
      iconStroke: "#F59E0B",
    },
    error: {
      border: "border-red-600",
      bg: "bg-red-50",
      accent: "#DC2626",
      text: "text-red-800",
      iconStroke: "#DC2626",
    },
  }[type] || {
    border: "border-gray-300",
    bg: "bg-white",
    accent: "#101828",
    text: "text-gray-800",
    iconStroke: "#101828",
  };

  // progress animation state
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let start;
    let raf;
    const duration = Math.max(500, timeout); // ensure at least 500ms

    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (elapsed < duration) {
        raf = requestAnimationFrame(step);
      } else {
        onRemove(id);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [timeout, id, onRemove]);

  // simple accessible icon map
  const Icon = () => {
    const stroke = theme.iconStroke;
    if (type === "success") {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (type === "error") {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    if (type === "warning") {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
      </svg>
    );
  };

  // compact layout on mobile
  const containerClass = mobile
    ? "flex items-start gap-3 p-4 rounded-xl shadow-md border-l-4"
    : "flex items-start gap-4 p-5 rounded-xl shadow-lg border-l-4";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${containerClass} ${theme.bg} ${theme.border}`}
      style={{
        // ensure a good min-width on desktop but fluid on mobile
        minWidth: mobile ? "auto" : 320,
        maxWidth: mobile ? "100%" : 420,
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        <Icon />
      </div>

      <div className="flex-1 min-w-0">
        {title ? (
          <div className={`font-semibold ${mobile ? "text-sm" : "text-base"} ${theme.text} truncate`}>
            {title}
          </div>
        ) : null}

        <div className={`mt-1 ${mobile ? "text-sm" : "text-base"} text-gray-700 leading-snug`}>
          {/* If message is empty, show a succinct default based on type */}
          {message || (type === "success" ? "Done" : type === "error" ? "Something went wrong" : "Info")}
        </div>

        {/* progress bar */}
        <div className="mt-3 h-1 w-full bg-gray-200 rounded overflow-hidden">
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: theme.accent,
              transition: "width 100ms linear",
            }}
          />
        </div>
      </div>

      {/* Close button */}
      <button
        aria-label="Dismiss"
        onClick={() => onRemove(id)}
        className={`ml-3 self-start text-gray-500 hover:text-gray-900 focus:outline-none ${mobile ? "mt-0.5" : ""}`}
        title="Dismiss"
      >
        {/* bigger X for touch targets */}
        <span className={`${mobile ? "text-lg" : "text-xl"} font-bold`}>✕</span>
      </button>
    </div>
  );
}

