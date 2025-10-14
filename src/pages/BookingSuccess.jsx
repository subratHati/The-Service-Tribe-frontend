// import { useLocation, useNavigate } from "react-router-dom";


// export default function BookingSuccess() {
//     const {state} = useLocation();
//     const navigate = useNavigate();

//     const booking = state?.booking;
//     console.log("State is ", booking);
//     const bookings = booking ? [booking] : [];
//     const amount = booking?.total;

//     if (!booking) {
//     return (
//       <div className="max-w-3xl mx-auto p-6">
//         <h2 className="text-2xl font-semibold mb-4">Booking not found</h2>
//         <p className="mb-4">We couldn't find booking information. If you just completed payment, try checking <strong>My Bookings</strong>.</p>
//         <div className="flex gap-3">
//           <button onClick={() => navigate("/bookings")} className="px-4 py-2 bg-gray-900 text-white rounded">
//             My Bookings
//           </button>
//           <button onClick={() => navigate("/")} className="px-4 py-2 border rounded">
//             Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//    return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold mb-2">Booking Successful 🎉</h2>
//         <p className="text-gray-600 mb-4">Thank you — your booking{bookings.length > 1 ? "s" : ""} has been created and paid.</p>

//         <div className="space-y-4">
//           {bookings.map((b) => {
//             // support both shapes: b.total or b.totalAmount, and service may be populated or only id
//             const service = b.service || (b.items && b.items[0] && b.items[0].serviceId) || {};
//             const serviceName = b.serviceName || service.name || (service._id ? `Service ${service._id}` : "Service");
//             const qty = b.quantity || (b.items && b.items[0] && b.items[0].quantity) || 1;
//             const price = b.servicePriceAtBooking || (b.items && b.items[0] && b.items[0].priceAtBooking) || (service.price || 0);
//             const total = b.total ?? b.totalAmount ?? (price * qty);

//             return (
//               <div key={b._id} className="border rounded p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="font-medium text-lg">{serviceName}</div>
//                     <div className="text-sm text-gray-500">Booking ID: <span className="font-mono">{b._id}</span></div>
//                     <div className="text-sm text-gray-500">Scheduled: {b.scheduledAt ? new Date(b.scheduledAt).toLocaleString() : "—"}</div>
//                   </div>

//                   <div className="text-right">
//                     <div className="text-sm text-gray-600">Qty: {qty}</div>
//                     <div className="font-semibold">₹ {total}</div>
//                     <div className="text-xs text-gray-500">Status: {b.status || b.paymentStatus || "—"}</div>
//                   </div>
//                 </div>

//                 {b.address && (
//                   <div className="mt-3 text-sm text-gray-600">
//                     <div><strong>Address:</strong> {b.address}</div>
//                     {b.notes && <div><strong>Notes:</strong> {b.notes}</div>}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//           <div>
//             <div className="text-sm text-gray-600">Total paid</div>
//             <div className="text-2xl font-bold">₹ {amount}</div>
//           </div>

//           <div className="flex gap-3">
//             <button onClick={() => navigate("/bookings")} className="px-4 py-2 bg-gray-900 text-white rounded">
//               My Bookings
//             </button>
//             <button onClick={() => navigate("/")} className="px-4 py-2 border rounded">
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

    
// }



// src/pages/BookingSuccess.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const payload = state?.result ?? state?.booking ?? state ?? null;
  const bookings = Array.isArray(payload?.bookings) ? payload.bookings : payload ? [payload] : [];
  const amount =
    payload?.amount ??
    payload?.total ??
    (bookings.length ? bookings.reduce((s, b) => s + (b.total ?? b.totalAmount ?? 0), 0) : 0);

  const fmt = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Illustration */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Booking Success"
          className="w-24 h-24 mx-auto mb-6"
        />

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h1>
        <p className="text-gray-600 mb-4">
          {bookings.length > 1
            ? `Your ${bookings.length} bookings are confirmed.`
            : "Your booking is confirmed."}
        </p>

        {/* Amount Paid */}
        <div className="text-lg font-semibold text-gray-800 mb-6">
          Total Paid: <span className="text-[#FD7014]">{fmt(amount)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/bookings")}
            className="w-full sm:w-auto px-4 py-2 bg-[#FD7014] text-white rounded-lg shadow"
          >
            My Bookings
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
