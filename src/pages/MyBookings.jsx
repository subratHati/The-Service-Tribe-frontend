// // import { useEffect, useState } from "react";
// // import axios from "../utils/axios";

// // export default function MyBookings() {
// //     const [bookings, setBookings] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'previous'

// //     useEffect(() => {
// //         const fetchDate = async () => {
// //             setLoading(true);
// //             setError(null);
// //             try {
// //                 const res = await axios.get("/booking/MyBookings");
// //                 setBookings(res.data);
// //             } catch (error) {
// //                 setError(err?.response?.data?.msg || err.message || "Failed to load bookings");

// //             }finally{
// //                 setLoading(false);
// //             }
// //         }
// //         fetchDate();
// //     }, []);

// //     // simple cancel function inside component
// //     const cancelBooking = async (bookingId) => {
// //         try {
// //             await axios.put(`/booking/cancelBooking/${bookingId}`, {reason: "User cancel booking"});
// //             // update UI locally - mark this booking cancelled
// //             setBookings((prev) => prev.map(b => (b._id === bookingId || b.id === bookingId ? { ...b, status: "cancelled" } : b)));
// //             alert("Booking cancelled");
// //         } catch (err) {
// //             alert(err?.response?.data?.msg || "Failed to cancel booking");
// //         }
// //     };

// //     // helpers to categorize bookings
// //     const upcoming = bookings.filter(b => !["completed", "cancelled"].includes(b.status));
// //     const previous = bookings.filter(b => ["completed", "cancelled"].includes(b.status));

// //     const renderBooking = (b) => {
// //         const id = b._id;
// //         const name = b.serviceName;
// //         const desc = b.service?.description || b.serviceId?.description || "";
// //         const scheduled = new Date(b.scheduledAt);
// //         const qty = b.quantity;
// //         const price = b.totalAmount;
// //         const status = b.status;
// //         const payment = b.paymentStatus;

// //         return (
// //             <div key={id} className="bg-white border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:justify-between gap-4">
// //                 <div>
// //                     <div className="font-semibold text-lg">{name}</div>
// //                     {desc && <div className="text-sm text-gray-600 mt-1">{desc}</div>}
// //                     <div className="text-xs text-gray-500 mt-2">{scheduled ? scheduled.toLocaleString() : "Not scheduled"}</div>
// //                     <div className="text-xs text-gray-500">Qty: {qty}</div>
// //                     <div className="text-xs text-gray-500">Address: {b.address || "—"}</div>
// //                 </div>

// //                 <div className="flex flex-col items-end gap-2">
// //                     <div className="text-sm">Status: <strong>{status}</strong></div>
// //                     <div className="font-semibold">₹ {price}</div>
// //                     <div className="text-xs text-gray-500">Payment: {payment}</div>

// //                     {status === "pending" && (
// //                         <button
// //                             onClick={() => {
// //                                 if (!confirm("Cancel this booking?")) return;
// //                                 cancelBooking(id);
// //                             }}
// //                             className="px-3 py-1 rounded bg-red-600 text-white text-sm"
// //                         >
// //                             Cancel
// //                         </button>
// //                     )}
// //                 </div>
// //             </div>
// //         );
// //     };

// //     return (
// //         <div className="max-w-4xl mx-auto p-4">
// //             <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

// //             <div className="flex gap-3 mb-6">
// //                 <button
// //                     onClick={() => setActiveTab("upcoming")}
// //                     className={`px-4 py-2 rounded ${activeTab === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
// //                 >
// //                     Upcoming ({upcoming.length})
// //                 </button>
// //                 <button
// //                     onClick={() => setActiveTab("previous")}
// //                     className={`px-4 py-2 rounded ${activeTab === "previous" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
// //                 >
// //                     Previous ({previous.length})
// //                 </button>
// //             </div>

// //             {loading ? (
// //                 <div className="p-6 text-center">Loading bookings...</div>
// //             ) : error ? (
// //                 <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
// //             ) : (
// //                 <>
// //                     {activeTab === "upcoming" ? (
// //                         <div className="space-y-4">
// //                             {upcoming.length === 0 ? <div className="p-6 text-center bg-white border rounded">No upcoming bookings</div> : upcoming.map(renderBooking)}
// //                         </div>
// //                     ) : (
// //                         <div className="space-y-4">
// //                             {previous.length === 0 ? <div className="p-6 text-center bg-white border rounded">No previous bookings</div> : previous.map(renderBooking)}
// //                         </div>
// //                     )}
// //                 </>
// //             )}
// //         </div>
// //     );
// // }


// // src/pages/MyBookings.jsx
// import { useEffect, useState } from "react";
// import axios from "../utils/axios";

// /**
//  * MyBookings (redesigned)
//  * - keeps same API calls & behavior
//  * - improved layout, status badges, empty states, responsive cards
//  * - bugfix: proper error variable usage in fetch
//  */

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'previous'

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get("/booking/MyBookings");
//         // some endpoints return object vs array — handle both
//         const data = Array.isArray(res.data) ? res.data : (res.data.bookings ?? res.data ?? []);
//         setBookings(data);
//       } catch (err) {
//         console.error("Failed to load bookings:", err);
//         setError(err?.response?.data?.msg || err.message || "Failed to load bookings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // cancel booking
//   const cancelBooking = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;
//     try {
//       await axios.put(`/booking/cancelBooking/${bookingId}`, { reason: "User cancel booking" });
//       setBookings((prev) => prev.map(b => (b._id === bookingId || b.id === bookingId ? { ...b, status: "cancelled" } : b)));
//       alert("Booking cancelled");
//     } catch (err) {
//       console.error("Cancel booking failed:", err);
//       alert(err?.response?.data?.msg || "Failed to cancel booking");
//     }
//   };

//   // helpers to categorize bookings
//   const upcoming = bookings.filter(b => !["completed", "cancelled"].includes(b.status));
//   const previous = bookings.filter(b => ["completed", "cancelled"].includes(b.status));

//   const fmt = (v) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v || 0);

//   const statusBadge = (s) => {
//     const st = (s || "").toLowerCase();
//     if (st === "pending") return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
//     if (st === "paid") return <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Paid</span>;
//     if (st === "completed") return <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">Completed</span>;
//     if (st === "cancelled") return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">Cancelled</span>;
//     return <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">{s || "—"}</span>;
//   };

//   const renderBooking = (b) => {
//     const id = b._id || b.id;
//     const serviceName = b.serviceName || (b.service && b.service.name) || (b.items && b.items[0] && b.items[0].serviceId && b.items[0].serviceId.name) || "Service";
//     const desc = b.service?.description || b.serviceId?.description || "";
//     const scheduled = b.scheduledAt ? new Date(b.scheduledAt) : null;
//     const qty = b.quantity || (b.items && b.items[0] && b.items[0].quantity) || 1;
//     const price = b.total ?? b.totalAmount ?? (b.servicePriceAtBooking ?? (b.items && b.items[0] && b.items[0].priceAtBooking) ?? 0);
//     const status = b.status || b.paymentStatus || "—";

//     return (
//       <div key={id} className="bg-white border rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="flex gap-4 items-start md:items-center min-w-0">
//           <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
//             {(serviceName && serviceName.charAt(0).toUpperCase()) || "S"}
//           </div>

//           <div className="min-w-0">
//             <div className="flex items-center gap-3">
//               <div className="font-semibold text-lg text-gray-900 truncate">{serviceName}</div>
//               <div className="text-sm text-gray-500">{desc}</div>
//             </div>

//             <div className="mt-2 text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:gap-4">
//               <div>{scheduled ? scheduled.toLocaleString() : "Not scheduled"}</div>
//               <div>Qty: {qty}</div>
//               <div>Address: <span className="font-medium text-gray-700">{typeof b.address === "string" ? b.address : b.address?.line1 ?? "—"}</span></div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-start sm:items-end gap-3">
//           <div className="flex items-center gap-3">
//             <div className="text-sm text-gray-500">Status</div>
//             {statusBadge(status)}
//           </div>

//           <div className="text-lg font-semibold text-gray-900">{fmt(price)}</div>

//           <div className="flex gap-2">
//             {status === "pending" && (
//               <button
//                 onClick={() => cancelBooking(id)}
//                 className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:opacity-95"
//               >
//                 Cancel
//               </button>
//             )}
//             <button
//               onClick={() => {
//                 // show booking details on a separate page or prompt (you can change route as needed)
//                 window.location.href = `/bookings/${id}`;
//               }}
//               className="px-3 py-1 rounded border text-sm"
//             >
//               View
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-semibold">My Bookings</h2>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setActiveTab("upcoming")}
//             className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "upcoming" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700"}`}
//           >
//             Upcoming ({upcoming.length})
//           </button>
//           <button
//             onClick={() => setActiveTab("previous")}
//             className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "previous" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700"}`}
//           >
//             Previous ({previous.length})
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="p-8 bg-white rounded-xl shadow text-center">Loading bookings...</div>
//       ) : error ? (
//         <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
//       ) : (
//         <>
//           {activeTab === "upcoming" ? (
//             upcoming.length === 0 ? (
//               <div className="p-10 text-center bg-white border rounded-xl">
//                 <img src="/images/empty-bookings.svg" alt="No bookings" className="mx-auto mb-4 w-40 h-40 object-contain" />
//                 <div className="text-lg font-medium mb-2">No upcoming bookings</div>
//                 <div className="text-sm text-gray-500 mb-4">Book a service to see it listed here.</div>
//                 <div>
//                   <a href="/category" className="px-4 py-2 bg-orange-600 text-white rounded-lg">Browse services</a>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {upcoming.map(renderBooking)}
//               </div>
//             )
//           ) : previous.length === 0 ? (
//             <div className="p-10 text-center bg-white border rounded-xl">
//               <div className="text-lg font-medium mb-2">No previous bookings</div>
//               <div className="text-sm text-gray-500">Your past completed or cancelled bookings will appear here.</div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {previous.map(renderBooking)}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }




// // src/pages/MyBookings.jsx
// import { useEffect, useState } from "react";
// import axios from "../utils/axios";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'previous'

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get("/booking/MyBookings");
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.bookings ?? res.data ?? [];
//         setBookings(data);
//       } catch (err) {
//         console.error("Failed to load bookings:", err);
//         setError(
//           err?.response?.data?.msg || err.message || "Failed to load bookings"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const upcoming = bookings.filter(
//     (b) =>
//       !["completed", "cancelled"].includes((b.status || "").toLowerCase())
//   );
//   const previous = bookings.filter((b) =>
//     ["completed", "cancelled"].includes((b.status || "").toLowerCase())
//   );

//   const fmt = (v) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(v || 0);

//   const statusBadge = (s) => {
//     const st = (s || "").toLowerCase();
//     if (st === "pending")
//       return (
//         <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
//           Pending
//         </span>
//       );
//     if (st === "paid")
//       return (
//         <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
//           Paid
//         </span>
//       );
//     if (st === "completed")
//       return (
//         <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
//           Completed
//         </span>
//       );
//     if (st === "cancelled")
//       return (
//         <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
//           Cancelled
//         </span>
//       );
//     return (
//       <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
//         {s || "—"}
//       </span>
//     );
//   };

//   const renderBooking = (b) => {
//     const id = b._id || b.id;
//     const serviceName =
//       b.serviceName ||
//       b.service?.name ||
//       b.items?.[0]?.serviceId?.name ||
//       "Service";
//     const scheduled = b.scheduledAt ? new Date(b.scheduledAt) : null;
//     const qty = b.quantity || b.items?.[0]?.quantity || 1;
//     const price =
//       b.total ??
//       b.totalAmount ??
//       b.servicePriceAtBooking ??
//       b.items?.[0]?.priceAtBooking ??
//       0;
//     const status = b.status || b.paymentStatus || "—";

//     return (
//       <div
//         key={id}
//         className="bg-white border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:p-5 md:gap-4"
//       >
//         {/* Left: avatar + info */}
//         <div className="flex items-start gap-3 min-w-0">
//           <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700 shrink-0">
//             {(serviceName && serviceName.charAt(0).toUpperCase()) || "S"}
//           </div>

//           <div className="min-w-0">
//             <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
//               {serviceName}
//             </div>
//             <div className="text-xs sm:text-sm text-gray-500 mt-1">
//               Booking ID: <span className="font-mono">{id}</span>
//             </div>
//             <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-xs text-gray-500">
//               <div>{scheduled ? scheduled.toLocaleString() : "Not scheduled"}</div>
//               <div>Qty: {qty}</div>
//             </div>
//           </div>
//         </div>

//         {/* Right: status / price */}
//         <div className="flex flex-col items-start sm:items-end gap-2">
//           <div className="flex items-center gap-3">
//             <div className="text-xs text-gray-500">Status</div>
//             {statusBadge(status)}
//           </div>
//           <div className="text-base sm:text-lg font-semibold text-gray-900">
//             {fmt(price)}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 sm:p-6">
//       {/* Header & Tabs */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
//         <h2 className="text-xl sm:text-2xl font-semibold">My Bookings</h2>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setActiveTab("upcoming")}
//             className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition text-xs sm:text-sm ${
//               activeTab === "upcoming"
//                 ? "bg-[#FD7014] text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             Upcoming ({upcoming.length})
//           </button>
//           <button
//             onClick={() => setActiveTab("previous")}
//             className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition text-xs sm:text-sm ${
//               activeTab === "previous"
//                 ? "bg-[#FD7014] text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             Previous ({previous.length})
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="p-6 bg-white rounded-xl shadow text-center">
//           Loading bookings...
//         </div>
//       ) : error ? (
//         <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
//       ) : (
//         <>
//           {activeTab === "upcoming"
//             ? upcoming.length === 0
//               ? (
//                 <div className="p-8 text-center bg-white border rounded-xl">
//                   <img
//                     src="/images/empty-bookings.svg"
//                     alt="No bookings"
//                     className="mx-auto mb-4 w-28 sm:w-36 h-28 sm:h-36 object-contain"
//                   />
//                   <div className="text-base sm:text-lg font-medium mb-2">
//                     No upcoming bookings
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-500 mb-4">
//                     Book a service to see it listed here.
//                   </div>
//                   <a
//                     href="/category"
//                     className="px-4 py-2 bg-[#FD7014] text-white rounded-lg text-xs sm:text-sm"
//                   >
//                     Browse services
//                   </a>
//                 </div>
//               )
//               : (
//                 <div className="space-y-3">{upcoming.map(renderBooking)}</div>
//               )
//             : previous.length === 0
//             ? (
//               <div className="p-8 text-center bg-white border rounded-xl">
//                 <div className="text-base sm:text-lg font-medium mb-2">
//                   No previous bookings
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-500">
//                   Your past completed or cancelled bookings will appear here.
//                 </div>
//               </div>
//             )
//             : (
//               <div className="space-y-3">{previous.map(renderBooking)}</div>
//             )}
//         </>
//       )}
//     </div>
//   );
// }


// src/pages/MyBookings.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Loading from "../components/Loading";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'previous'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/booking/MyBookings");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.bookings ?? res.data ?? [];
        setBookings(data);
      } catch (err) {
        console.error("Failed to load bookings:", err);
        setError(
          err?.response?.data?.msg || err.message || "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const upcoming = bookings.filter(
    (b) =>
      !["completed", "cancelled"].includes((b.status || "").toLowerCase())
  );
  const previous = bookings.filter((b) =>
    ["completed", "cancelled"].includes((b.status || "").toLowerCase())
  );

  const fmt = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(v || 0);

  const statusBadge = (s) => {
    const st = (s || "").toLowerCase();
    if (st === "pending")
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
          Pending
        </span>
      );
    if (st === "paid")
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
          Paid
        </span>
      );
    if (st === "completed")
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
          Completed
        </span>
      );
    if (st === "cancelled")
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
          Cancelled
        </span>
      );
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
        {s || "—"}
      </span>
    );
  };

  const renderBooking = (b) => {
    const id = b._id || b.id;
    const serviceName =
      b.serviceName ||
      b.service?.name ||
      b.items?.[0]?.serviceId?.name ||
      "Service";
    const scheduled = b.scheduledAt ? new Date(b.scheduledAt) : null;
    const qty = b.quantity || b.items?.[0]?.quantity || 1;
    const price =
      b.total ?? b.totalAmount ?? b.servicePriceAtBooking ?? b.items?.[0]?.priceAtBooking ?? 0;
    const status = b.status || b.paymentStatus || "—";
    const address = typeof b.address === "string" ? b.address : b.address?.line1 ?? "—";
    const username = b.username || b.user?.name || "User";

    const shareBooking = async () => {
      const shareText = `
Booking Confirmed ✅
-------------------
Booking ID: ${id}
Name: ${username}
Service: ${serviceName}
Address: ${address}
Date: ${scheduled ? scheduled.toLocaleString() : "Not scheduled"}
-------------------
Thank you for booking with The Tribe Service!
      `;

      if (navigator.share) {
        try {
          await navigator.share({
            title: `Booking Confirmation`,
            text: shareText,
          });
        } catch (err) {
          console.error("Share failed:", err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareText);
          alert("Booking details copied to clipboard!");
        } catch (err) {
          console.error("Copy failed:", err);
        }
      }
    };

    return (
      <div
        key={id}
        className="bg-white border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:p-5 md:gap-4"
      >
        {/* Left: avatar + info */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700 shrink-0">
            {(serviceName && serviceName.charAt(0).toUpperCase()) || "S"}
          </div>

          <div className="min-w-0">
            <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {serviceName}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">
              Booking ID: <span className="font-mono">{id}</span>
            </div>
            <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-xs text-gray-500">
              <div>{scheduled ? scheduled.toLocaleString() : "Not scheduled"}</div>
              <div>Qty: {qty}</div>
              <div>Address: {address}</div>
            </div>
          </div>
        </div>

        {/* Right: status / price / share */}
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-500">Status</div>
            {statusBadge(status)}
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-900">
            {fmt(price)}
          </div>

          {/* Share button */}
          <button
            onClick={shareBooking}
            className="mt-2 px-3 py-1 rounded border text-xs sm:text-sm hover:bg-gray-100 transition flex items-center gap-1"
          >
            Share
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold">My Bookings</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition text-xs sm:text-sm ${
              activeTab === "upcoming"
                ? "bg-[#FD7014] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Upcoming ({upcoming.length})
          </button>
          <button
            onClick={() => setActiveTab("previous")}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition text-xs sm:text-sm ${
              activeTab === "previous"
                ? "bg-[#FD7014] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Previous ({previous.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Loading variant="fullscreen" message="Loading your bookings..." />
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
      ) : (
        <>
          {activeTab === "upcoming"
            ? upcoming.length === 0
              ? (
                <div className="p-8 text-center bg-white border rounded-xl">
                  <img
                    src="/images/empty-bookings.svg"
                    alt="No bookings"
                    className="mx-auto mb-4 w-28 sm:w-36 h-28 sm:h-36 object-contain"
                  />
                  <div className="text-base sm:text-lg font-medium mb-2">
                    No upcoming bookings
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-4">
                    Book a service to see it listed here.
                  </div>
                  <a
                    href="/category"
                    className="px-4 py-2 bg-[#FD7014] text-white rounded-lg text-xs sm:text-sm"
                  >
                    Browse services
                  </a>
                </div>
              )
              : (
                <div className="space-y-3">{upcoming.map(renderBooking)}</div>
              )
            : previous.length === 0
            ? (
              <div className="p-8 text-center bg-white border rounded-xl">
                <div className="text-base sm:text-lg font-medium mb-2">
                  No previous bookings
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  Your past completed or cancelled bookings will appear here.
                </div>
              </div>
            )
            : (
              <div className="space-y-3">{previous.map(renderBooking)}</div>
            )}
        </>
      )}
    </div>
  );
}
