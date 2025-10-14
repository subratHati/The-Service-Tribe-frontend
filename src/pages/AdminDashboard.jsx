// // src/pages/AdminDashboard.jsx
// import { useEffect, useState } from "react";
// import axios from "../utils/axios";
// import { useNavigate } from "react-router-dom";
// import BookingCard from "../components/BookingCard";
// import { sendCompletionOtp, verifyCompletionOtp } from "../api/booking";

// /**
//  * Admin dashboard with group filters + per-group lists.
//  *
//  * - Top control row: buttons to pick a group (New / Confirmed / In Progress / Completed / Cancelled / Not Refunded / Refunded / All)
//  * - When a group button is clicked, only that group's bookings are shown.
//  * - When "All" is selected, all groups are shown in their own sections (same as previous behavior).
//  *
//  * Note: The "Not Refunded" group shows paid-but-not-marked-refunded bookings.
//  * The markRefunded endpoint used here is PUT /booking/markRefunded/:id — change if your backend differs.
//  */

// export default function AdminDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [activeGroup, setActiveGroup] = useState("new"); // new | confirmed | in_progress | completed | cancelled | not_refunded | refunded | all
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/booking/all");
//       const list = res.data.bookings ?? res.data ?? [];
//       // newest first
//       list.sort(
//         (a, b) =>
//           new Date(b.createdAt || b._id).getTime() -
//           new Date(a.createdAt || a._id).getTime()
//       );
//       setBookings(list);
//     } catch (err) {
//       console.error(err);
//       if (err?.response?.status === 401) navigate("/login");
//       else alert("Failed to load bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`/booking/updateStatus/${id}`, { status });
//       setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
//     } catch (err) {
//       console.error(err);
//       alert("Status update failed");
//     }
//   };

//   const cancelBooking = async (id) => {
//     const reason = window.prompt("Enter cancellation reason (required):");
//     if (!reason || !reason.trim()) return alert("Cancellation reason required");
//     try {
//       await axios.put(`/booking/cancelBooking/${id}`, { reason });
//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === id
//             ? { ...b, status: "cancelled", notes: (b.notes || "") + `\n[Admin reason]: ${reason}` }
//             : b
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Cancellation failed");
//     }
//   };

//   const markComplete = async (id) => {
//     try {
//       await sendCompletionOtp(id);
//       alert("An OTP has been sent to the user's email. Ask the user for the OTP.");

//       const otp = window.prompt("Enter OTP from user to confirm completion:");
//       if (!otp || otp.trim().length === 0) {
//         return alert("OTP not entered. Booking not completed.");
//       }

//       const res = await verifyCompletionOtp(id, otp.trim());
//       const updated = res?.booking ?? res?.data ?? null;
//       setBookings((prev) => prev.map((b) => (b._id === id ? (updated || { ...b, status: "completed" }) : b)));
//       alert("Booking marked as completed.");
//     } catch (err) {
//       console.error("Complete error", err);
//       const msg = err?.response?.data?.msg || err?.msg || err?.message || "Failed to complete booking";
//       alert(msg);
//     }
//   };

//   const markRefunded = async (id) => {
//     if (!window.confirm("Have you processed the refund to the customer? Click OK to mark as refunded.")) return;
//     try {
//       await axios.put(`/booking/markRefunded/${id}`, { refunded: true });
//       setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, refunded: true, refundAt: new Date().toISOString() } : b)));
//       alert("Marked as refunded.");
//     } catch (err) {
//       console.error("Mark refunded failed", err);
//       alert(err?.response?.data?.msg || "Failed to mark refunded");
//     }
//   };

//   // helpers: normalized status and groups
//   const normalize = (s) => (s || "").toLowerCase();
//   const groupNew = bookings.filter((b) => ["pending"].includes(normalize(b.status)));
//   const groupConfirmed = bookings.filter((b) => ["confirmed"].includes(normalize(b.status)));
//   const groupInProgress = bookings.filter((b) => ["in_progress", "inprogress", "started"].includes(normalize(b.status)));
//   const groupCompleted = bookings.filter((b) => ["completed"].includes(normalize(b.status)));
//   const groupCancelled = bookings.filter((b) => ["cancelled", "canceled"].includes(normalize(b.status)));

//   const notRefunded = bookings.filter((b) => {
//     const paying = normalize(b.paymentStatus);
//     const isPaid = paying === "paid" || paying === "succeeded" || paying === "success";
//     return isPaid && !b.refunded;
//   });

//   const refunded = bookings.filter((b) => Boolean(b.refunded));

//   // UI: top filter buttons
//   const groupsMeta = [
//     { key: "new", label: `New (${groupNew.length})` },
//     { key: "confirmed", label: `Confirmed (${groupConfirmed.length})` },
//     { key: "in_progress", label: `In Progress (${groupInProgress.length})` },
//     { key: "completed", label: `Completed (${groupCompleted.length})` },
//     { key: "cancelled", label: `Cancelled (${groupCancelled.length})` },
//     { key: "not_refunded", label: `Not Refunded (${notRefunded.length})` },
//     { key: "refunded", label: `Refunded (${refunded.length})` },
//     { key: "all", label: `All (${bookings.length})` },
//   ];

//   const renderListForKey = (key) => {
//     switch (key) {
//       case "new":
//         return groupNew.map((b) => (
//           <BookingCard
//             key={b._id}
//             booking={b}
//             onConfirm={() => updateStatus(b._id, "confirmed")}
//             onCancel={() => cancelBooking(b._id)}
//           />
//         ));
//       case "confirmed":
//         return groupConfirmed.map((b) => (
//           <BookingCard
//             key={b._id}
//             booking={b}
//             onStart={() => updateStatus(b._id, "in_progress")}
//             onComplete={() => markComplete(b._id)}
//             onCancel={() => cancelBooking(b._id)}
//           />
//         ));
//       case "in_progress":
//         return groupInProgress.map((b) => (
//           <BookingCard
//             key={b._id}
//             booking={b}
//             onComplete={() => markComplete(b._id)}
//             onCancel={() => cancelBooking(b._id)}
//           />
//         ));
//       case "completed":
//         return groupCompleted.map((b) => <BookingCard key={b._id} booking={b} />);
//       case "cancelled":
//         return groupCancelled.map((b) => <BookingCard key={b._id} booking={b} />);
//       case "not_refunded":
//         return notRefunded.map((b) => (
//           <div key={b._id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             <div className="flex items-start gap-4 min-w-0">
//               <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
//                 {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
//               </div>
//               <div className="min-w-0">
//                 <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
//                 <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
//                 <div className="text-sm text-gray-600 mt-1">Customer: {b.user?.name || b.userName || b.userEmail || "—"}</div>
//                 <div className="text-sm text-gray-600">Amount: ₹ {b.total ?? b.totalAmount ?? b.servicePriceAtBooking ?? 0}</div>
//               </div>
//             </div>

//             <div className="flex flex-col items-start md:items-end gap-2">
//               <div className="text-sm text-gray-500">Payment: {b.paymentStatus || "—"}</div>
//               <div className="flex gap-2">
//                 <button onClick={() => markRefunded(b._id)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Mark refunded</button>
//               </div>
//             </div>
//           </div>
//         ));
//       case "refunded":
//         return refunded.map((b) => (
//           <div key={b._id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             <div className="flex items-start gap-4 min-w-0">
//               <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
//                 {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
//               </div>
//               <div className="min-w-0">
//                 <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
//                 <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
//                 <div className="text-sm text-gray-600 mt-1">Refunded on: {b.refundAt ? new Date(b.refundAt).toLocaleString() : "—"}</div>
//               </div>
//             </div>

//             <div className="flex flex-col items-start md:items-end gap-2">
//               <div className="text-sm text-gray-500">Refund status: <span className="font-medium text-green-700">Refunded</span></div>
//             </div>
//           </div>
//         ));
//       case "all":
//       default:
//         return (
//           <>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Pending ({groupNew.length})</h3>
//                 {groupNew.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No pending bookings.</div> : groupNew.map((b) => (
//                   <BookingCard key={b._id} booking={b} onConfirm={() => updateStatus(b._id, "confirmed")} onCancel={() => cancelBooking(b._id)} />
//                 ))}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Confirmed ({groupConfirmed.length})</h3>
//                 {groupConfirmed.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No confirmed bookings.</div> : groupConfirmed.map((b) => (
//                   <BookingCard key={b._id} booking={b} onStart={() => updateStatus(b._id, "in_progress")} onComplete={() => markComplete(b._id)} onCancel={() => cancelBooking(b._id)} />
//                 ))}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-2">In Progress ({groupInProgress.length})</h3>
//                 {groupInProgress.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No in-progress bookings.</div> : groupInProgress.map((b) => (
//                   <BookingCard key={b._id} booking={b} onComplete={() => markComplete(b._id)} onCancel={() => cancelBooking(b._id)} />
//                 ))}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Completed ({groupCompleted.length})</h3>
//                 {groupCompleted.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No completed bookings.</div> : groupCompleted.map((b) => <BookingCard key={b._id} booking={b} />)}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Cancelled ({groupCancelled.length})</h3>
//                 {groupCancelled.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No cancelled bookings.</div> : groupCancelled.map((b) => <BookingCard key={b._id} booking={b} />)}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Not Refunded ({notRefunded.length})</h3>
//                 {notRefunded.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No unpaid/refund-pending bookings.</div> : notRefunded.map((b) => (
//                   <div key={b._id} className="mb-3">
//                     <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//                       <div className="flex items-start gap-4 min-w-0">
//                         <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
//                           {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
//                         </div>
//                         <div className="min-w-0">
//                           <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
//                           <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
//                           <div className="text-sm text-gray-600 mt-1">Customer: {b.user?.name || b.userName || b.userEmail || "—"}</div>
//                           <div className="text-sm text-gray-600">Amount: ₹ {b.total ?? b.totalAmount ?? b.servicePriceAtBooking ?? 0}</div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start md:items-end gap-2">
//                         <div className="text-sm text-gray-500">Payment: {b.paymentStatus || "—"}</div>
//                         <div className="flex gap-2">
//                           <button onClick={() => markRefunded(b._id)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Mark refunded</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Refunded ({refunded.length})</h3>
//                 {refunded.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No refunded bookings.</div> : refunded.map((b) => (
//                   <div key={b._id} className="mb-3">
//                     <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//                       <div className="flex items-start gap-4 min-w-0">
//                         <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
//                           {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
//                         </div>
//                         <div className="min-w-0">
//                           <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
//                           <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
//                           <div className="text-sm text-gray-600 mt-1">Refunded on: {b.refundAt ? new Date(b.refundAt).toLocaleString() : "—"}</div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start md:items-end gap-2">
//                         <div className="text-sm text-gray-500">Refund status: <span className="font-medium text-green-700">Refunded</span></div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         );
//     }
//   };

//   if (loading) return <div className="p-6">Loading bookings...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4 gap-3">
//         <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
//         <div className="flex gap-2">
//           <button className="px-3 py-2 bg-[#101828] text-white rounded" onClick={() => navigate("/admin/categories")}>Manage Categories</button>
//           <button className="px-3 py-2 border rounded" onClick={fetchBookings}>Refresh</button>
//         </div>
//       </div>

//       {/* Group filter buttons (scrollable on small screens) */}
//       <div className="mb-4 overflow-x-auto">
//         <div className="inline-flex gap-2">
//           {groupsMeta.map((g) => (
//             <button
//               key={g.key}
//               onClick={() => setActiveGroup(g.key)}
//               className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
//                 activeGroup === g.key ? "bg-[#FD7014] text-white" : "bg-gray-100 text-gray-700"
//               }`}
//             >
//               {g.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Content area - shows the selected group's list (or all when activeGroup === 'all') */}
//       <div>
//         {activeGroup === "all" ? (
//           // show all groups stacked (renderListForKey will render a comprehensive "all" layout)
//           renderListForKey("all")
//         ) : (
//           // show only selected group heading + list
//           <section className="mb-6">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-xl font-semibold capitalize">
//                 {groupsMeta.find((m) => m.key === activeGroup)?.label?.split(" (")[0] ?? activeGroup}
//               </h2>
//               <div className="text-sm text-gray-500">{(() => {
//                 const meta = groupsMeta.find((m) => m.key === activeGroup);
//                 return meta ? meta.label.split(" (")[1]?.replace(")", "") : "";
//               })()}</div>
//             </div>

//             <div className="space-y-4">
//               {renderListForKey(activeGroup)}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }




// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import { sendCompletionOtp, verifyCompletionOtp } from "../api/booking";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeGroup, setActiveGroup] = useState("new"); // group filter
  const [cities, setCities] = useState([]);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [addingCity, setAddingCity] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [citiesLoading, setCitiesLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    fetchCities();
  }, []);

  /* ---------------- bookings ---------------- */
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/booking/all");
      const list = res.data.bookings ?? res.data ?? [];
      list.sort(
        (a, b) =>
          new Date(b.createdAt || b._id).getTime() -
          new Date(a.createdAt || a._id).getTime()
      );
      setBookings(list);
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) navigate("/login");
      else alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/booking/updateStatus/${id}`, { status });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  const cancelBooking = async (id) => {
    const reason = window.prompt("Enter cancellation reason (required):");
    if (!reason || !reason.trim()) return alert("Cancellation reason required");
    try {
      await axios.put(`/booking/cancelBooking/${id}`, { reason });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id
            ? { ...b, status: "cancelled", notes: (b.notes || "") + `\n[Admin reason]: ${reason}` }
            : b
        )
      );
    } catch (err) {
      console.error(err);
      alert("Cancellation failed");
    }
  };

  const markComplete = async (id) => {
    try {
      await sendCompletionOtp(id);
      alert("An OTP has been sent to the user's email. Ask the user for the OTP.");

      const otp = window.prompt("Enter OTP from user to confirm completion:");
      if (!otp || otp.trim().length === 0) {
        return alert("OTP not entered. Booking not completed.");
      }

      const res = await verifyCompletionOtp(id, otp.trim());
      const updated = res?.booking ?? res?.data ?? null;
      setBookings((prev) => prev.map((b) => (b._id === id ? (updated || { ...b, status: "completed" }) : b)));
      alert("Booking marked as completed.");
    } catch (err) {
      console.error("Complete error", err);
      const msg = err?.response?.data?.msg || err?.msg || err?.message || "Failed to complete booking";
      alert(msg);
    }
  };

  const markRefunded = async (id) => {
    if (!window.confirm("Have you processed the refund to the customer? Click OK to mark as refunded.")) return;
    try {
      await axios.put(`/booking/markRefunded/${id}`, { refunded: true });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, refunded: true, refundAt: new Date().toISOString() } : b)));
      alert("Marked as refunded.");
    } catch (err) {
      console.error("Mark refunded failed", err);
      alert(err?.response?.data?.msg || "Failed to mark refunded");
    }
  };

  /* ---------------- group helpers ---------------- */
  const normalize = (s) => (s || "").toLowerCase();
  const groupNew = bookings.filter((b) => ["pending"].includes(normalize(b.status)));
  const groupConfirmed = bookings.filter((b) => ["confirmed"].includes(normalize(b.status)));
  const groupInProgress = bookings.filter((b) => ["in_progress", "inprogress", "started"].includes(normalize(b.status)));
  const groupCompleted = bookings.filter((b) => ["completed"].includes(normalize(b.status)));
  const groupCancelled = bookings.filter((b) => ["cancelled", "canceled"].includes(normalize(b.status)));

  const notRefunded = bookings.filter((b) => {
    const paying = normalize(b.paymentStatus);
    const isPaid = paying === "paid" || paying === "succeeded" || paying === "success";
    return isPaid && !b.refunded;
  });
  const refunded = bookings.filter((b) => Boolean(b.refunded));

  const groupsMeta = [
    { key: "new", label: `New (${groupNew.length})` },
    { key: "confirmed", label: `Confirmed (${groupConfirmed.length})` },
    { key: "in_progress", label: `In Progress (${groupInProgress.length})` },
    { key: "completed", label: `Completed (${groupCompleted.length})` },
    { key: "cancelled", label: `Cancelled (${groupCancelled.length})` },
    { key: "not_refunded", label: `Not Refunded (${notRefunded.length})` },
    { key: "refunded", label: `Refunded (${refunded.length})` },
    { key: "all", label: `All (${bookings.length})` },
  ];

  const renderListForKey = (key) => {
    switch (key) {
      case "new":
        return groupNew.map((b) => (
          <BookingCard key={b._id} booking={b} onConfirm={() => updateStatus(b._id, "confirmed")} onCancel={() => cancelBooking(b._id)} />
        ));
      case "confirmed":
        return groupConfirmed.map((b) => (
          <BookingCard key={b._id} booking={b} onStart={() => updateStatus(b._id, "in_progress")} onComplete={() => markComplete(b._id)} onCancel={() => cancelBooking(b._id)} />
        ));
      case "in_progress":
        return groupInProgress.map((b) => (
          <BookingCard key={b._id} booking={b} onComplete={() => markComplete(b._id)} onCancel={() => cancelBooking(b._id)} />
        ));
      case "completed":
        return groupCompleted.map((b) => <BookingCard key={b._id} booking={b} />);
      case "cancelled":
        return groupCancelled.map((b) => <BookingCard key={b._id} booking={b} />);
      case "not_refunded":
        return notRefunded.map((b) => (
          <div key={b._id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
                {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
                <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
                <div className="text-sm text-gray-600 mt-1">Customer: {b.user?.name || b.userName || b.userEmail || "—"}</div>
                <div className="text-sm text-gray-600">Amount: ₹ {b.total ?? b.totalAmount ?? b.servicePriceAtBooking ?? 0}</div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="text-sm text-gray-500">Payment: {b.paymentStatus || "—"}</div>
              <div className="flex gap-2">
                <button onClick={() => markRefunded(b._id)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Mark refunded</button>
              </div>
            </div>
          </div>
        ));
      case "refunded":
        return refunded.map((b) => (
          <div key={b._id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
                {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
                <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
                <div className="text-sm text-gray-600 mt-1">Refunded on: {b.refundAt ? new Date(b.refundAt).toLocaleString() : "—"}</div>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="text-sm text-gray-500">Refund status: <span className="font-medium text-green-700">Refunded</span></div>
            </div>
          </div>
        ));
      case "all":
      default:
        return (
          <>
            <div className="space-y-4">
              {/* Pending */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Pending ({groupNew.length})</h3>
                {groupNew.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No pending bookings.</div> : groupNew.map((b) => (
                  <BookingCard key={b._id} booking={b} onConfirm={() => updateStatus(b._id, "confirmed")} onCancel={() => cancelBooking(b._id)} />
                ))}
              </div>

              {/* Confirmed */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Confirmed ({groupConfirmed.length})</h3>
                {groupConfirmed.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No confirmed bookings.</div> : groupConfirmed.map((b) => (
                  <BookingCard key={b._id} booking={b} onStart={() => updateStatus(b._id, "in_progress")} onComplete={() => markComplete(b._id)} onCancel={() => cancelBooking(b._id)} />
                ))}
              </div>

              {/* In progress */}
              <div>
                <h3 className="text-lg font-semibold mb-2">In Progress ({groupInProgress.length})</h3>
                {groupInProgress.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No in-progress bookings.</div> : groupInProgress.map((b) => (
                  <BookingCard key={b._id} booking={b} onComplete={() => markComplete(b._id)} onCancel={() => cancelBooking(b._id)} />
                ))}
              </div>

              {/* Completed */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Completed ({groupCompleted.length})</h3>
                {groupCompleted.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No completed bookings.</div> : groupCompleted.map((b) => <BookingCard key={b._id} booking={b} />)}
              </div>

              {/* Cancelled */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Cancelled ({groupCancelled.length})</h3>
                {groupCancelled.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No cancelled bookings.</div> : groupCancelled.map((b) => <BookingCard key={b._id} booking={b} />)}
              </div>

              {/* Not refunded */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Not Refunded ({notRefunded.length})</h3>
                {notRefunded.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No unpaid/refund-pending bookings.</div> : notRefunded.map((b) => (
                  <div key={b._id} className="mb-3">
                    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
                          {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
                          <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
                          <div className="text-sm text-gray-600 mt-1">Customer: {b.user?.name || b.userName || b.userEmail || "—"}</div>
                          <div className="text-sm text-gray-600">Amount: ₹ {b.total ?? b.totalAmount ?? b.servicePriceAtBooking ?? 0}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="text-sm text-gray-500">Payment: {b.paymentStatus || "—"}</div>
                        <div className="flex gap-2">
                          <button onClick={() => markRefunded(b._id)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Mark refunded</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Refunded */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Refunded ({refunded.length})</h3>
                {refunded.length === 0 ? <div className="p-3 bg-white rounded border text-gray-600">No refunded bookings.</div> : refunded.map((b) => (
                  <div key={b._id} className="mb-3">
                    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700 flex-shrink-0">
                          {(b.serviceName || b.service?.name || "S").charAt(0).toUpperCase() || "S"}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate">{b.serviceName || b.service?.name || "Service"}</div>
                          <div className="text-xs text-gray-500 mt-1">Booking ID: <span className="font-mono">{b._id}</span></div>
                          <div className="text-sm text-gray-600 mt-1">Refunded on: {b.refundAt ? new Date(b.refundAt).toLocaleString() : "—"}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="text-sm text-gray-500">Refund status: <span className="font-medium text-green-700">Refunded</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  /* ---------------- cities management ---------------- */
  const fetchCities = async () => {
    setCitiesLoading(true);
    try {
      const res = await axios.get("/location/list");
      const list = res.data?.cities ?? res.data ?? [];
      setCities(list);
    } catch (err) {
      console.error("fetch cities:", err);
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  };

  const handleAddCity = async () => {
    const name = (newCityName || "").trim();
    if (!name) return alert("Please enter a city name");
    setAddingCity(true);
    try {
      await axios.post("/location/add", { city: name });
      setNewCityName("");
      await fetchCities();
      alert("City added");
    } catch (err) {
      console.error("Add city failed", err);
      alert(err?.response?.data?.msg || "Failed to add city");
    } finally {
      setAddingCity(false);
    }
  };

  const handleToggleAvailability = async (city) => {
    const next = !city.isAvailable;
    try {
      await axios.put("/location/setAvailability", { city: city.name, isAvailable: next });
      setCities((prev) => prev.map((c) => (c.name === city.name ? { ...c, isAvailable: next } : c)));
    } catch (err) {
      console.error("Set availability failed", err);
      alert(err?.response?.data?.msg || "Failed to update availability");
    }
  };

  const handleDeleteCity = async (city) => {
    if (!window.confirm(`Delete city "${city.name}"? This cannot be undone.`)) return;
    try {
      // attempt a straightforward delete endpoint. Adjust if your backend uses a different route.
      await axios.delete(`/location/${encodeURIComponent(city.name)}`);
      // refresh local list
      setCities((prev) => prev.filter((c) => c.name !== city.name));
      alert("City deleted");
    } catch (err) {
      console.error("Delete city failed", err);
      alert(err?.response?.data?.msg || "Failed to delete city. If backend doesn't support delete, add an endpoint or change URL.");
    }
  };

  /* ---------------- render ---------------- */
  if (loading) return <div className="p-6">Loading bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="flex gap-2 items-center">
          <button className="px-3 py-2 bg-[#101828] text-white rounded" onClick={() => navigate("/admin/categories")}>Manage Categories</button>
          <button className="px-3 py-2 border rounded" onClick={fetchBookings}>Refresh</button>
          <button className="px-3 py-2 border rounded" onClick={() => navigate("/admin/popular")}>Popular Services</button>
          <button className="px-3 py-2 border rounded bg-white" onClick={() => setCitiesOpen((v) => !v)}>
            {citiesOpen ? "Close Cities" : "Manage Cities"}
          </button>
        </div>
      </div>

      {/* Group filter buttons */}
      <div className="mb-4 overflow-x-auto">
        <div className="inline-flex gap-2">
          {groupsMeta.map((g) => (
            <button
              key={g.key}
              onClick={() => setActiveGroup(g.key)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${activeGroup === g.key ? "bg-[#FD7014] text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cities management panel (collapsible) */}
      {citiesOpen && (
        <div className="mb-6 bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Cities</h3>
            <div className="text-sm text-gray-500">{cities.length} cities</div>
          </div>

          <div className="flex gap-2 mb-3">
            <input
              placeholder="New city name"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              className="border px-3 py-2 rounded flex-1"
            />
            <button onClick={handleAddCity} disabled={addingCity} className="px-4 py-2 bg-[#101828] text-white rounded">
              {addingCity ? "Adding..." : "Add"}
            </button>
            <button onClick={fetchCities} className="px-3 py-2 border rounded">Refresh</button>
          </div>

          <div>
            {citiesLoading ? (
              <div className="text-sm text-gray-500">Loading cities...</div>
            ) : cities.length === 0 ? (
              <div className="text-sm text-gray-500">No cities found.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {cities.map((c) => (
                  <div key={c.name} className="flex items-center justify-between gap-3 bg-gray-50 p-3 rounded">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">Status: {c.isAvailable ? "Available" : "Coming soon"}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleToggleAvailability(c)} className={`px-3 py-1 rounded text-sm ${c.isAvailable ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                        {c.isAvailable ? "Set coming soon" : "Set available"}
                      </button>
                      <button onClick={() => handleDeleteCity(c)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content area for bookings (selected group or all stacked) */}
      <div>
        {activeGroup === "all" ? (
          renderListForKey("all")
        ) : (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold capitalize">
                {groupsMeta.find((m) => m.key === activeGroup)?.label?.split(" (")[0] ?? activeGroup}
              </h2>
              <div className="text-sm text-gray-500">
                {(() => {
                  const meta = groupsMeta.find((m) => m.key === activeGroup);
                  return meta ? meta.label.split(" (")[1]?.replace(")", "") : "";
                })()}
              </div>
            </div>

            <div className="space-y-4">
              {renderListForKey(activeGroup)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}




