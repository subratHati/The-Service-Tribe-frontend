// // src/pages/PaymentPage.jsx
// import { useLocation, useNavigate } from "react-router-dom";
// import PaymentButton from "../components/PaymentButton";

// export default function PaymentPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const bookingPayload = location.state?.bookingPayload;

//   if (!bookingPayload) {
//     // if someone opened /payment without state, send back to checkout
//     navigate("/checkout");
//     return null;
//   }

//   const items = Array.isArray(bookingPayload.items) ? bookingPayload.items : [];
//   const total = Number(bookingPayload.total ?? items.reduce((s, it) => {
//     const p = Number(it.serviceId?.price ?? it.price ?? 0);
//     const q = Number(it.quantity ?? 1);
//     return s + (isNaN(p) ? 0 : p) * (isNaN(q) ? 1 : q);
//   }, 0));

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">Confirm & Pay</h2>

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h3 className="font-medium mb-2">Order summary</h3>
//         <ul className="space-y-3 mb-3">
//           {items.map((it, idx) => (
//             <li key={idx} className="flex justify-between">
//               <div>
//                 <div className="font-medium">{it.serviceId?.name ?? "Service"}</div>
//                 <div className="text-sm text-gray-500">{it.quantity} × ₹ {it.serviceId?.price ?? it.price ?? 0}</div>
//               </div>
//               <div className="font-medium">₹ { (Number(it.serviceId?.price ?? it.price ?? 0) * Number(it.quantity ?? 1)) }</div>
//             </li>
//           ))}
//         </ul>

//         <div className="flex justify-between items-center">
//           <div className="text-sm text-gray-600">Total</div>
//           <div className="text-xl font-bold">₹ {total}</div>
//         </div>
//       </div>

//       <div className="mb-4">
//         <PaymentButton bookingPayload={bookingPayload} amountDisplay={total} />
//       </div>

//       <div>
//         <button className="text-sm text-gray-600" onClick={() => navigate(-1)}>Back</button>
//       </div>
//     </div>
//   );
// }

// src/pages/PaymentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "../components/PaymentButton";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingPayload = location.state?.bookingPayload;

  if (!bookingPayload) {
    navigate("/checkout");
    return null;
  }

  const items = Array.isArray(bookingPayload.items) ? bookingPayload.items : [];
  const total = Number(
    bookingPayload.total ??
      items.reduce((s, it) => {
        const p = Number(it.serviceId?.price ?? it.price ?? 0);
        const q = Number(it.quantity ?? 1);
        return s + (isNaN(p) ? 0 : p) * (isNaN(q) ? 1 : q);
      }, 0)
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-orange-50 min-h-screen">
      {/* Page header */}
      <h2 className="text-3xl font-bold mb-4 text-orange-900">
        Confirm Your Booking
      </h2>


      {/* Order summary card */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-t-4 border-orange-400">
        <h3 className="text-xl font-semibold mb-4 text-orange-800">Order Summary</h3>
        <ul className="space-y-3 mb-4">
          {items.map((it, idx) => (
            <li
              key={idx}
              className="flex justify-between items-start gap-3 border-b pb-2"
            >
              <div className="min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {it.serviceId?.name ?? "Service"}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {it.quantity} × ₹ {it.serviceId?.price ?? it.price ?? 0}
                </div>
              </div>
              <div className="font-medium text-gray-900">
                ₹ {(Number(it.serviceId?.price ?? it.price ?? 0) * Number(it.quantity ?? 1))}
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t pt-3 mt-3 flex justify-between items-center">
          <div className="text-lg font-medium text-gray-700">Total</div>
          <div className="text-2xl font-bold text-orange-900">₹ {total}</div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="mb-6">
        <PaymentButton
          bookingPayload={bookingPayload}
          amountDisplay={total}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
        />
      </div>

      {/* Back button */}
      <div className="text-center">
        <button
          className="text-sm text-orange-700 hover:underline"
          onClick={() => navigate(-1)}
        >
          Back to Checkout
        </button>
      </div>
    </div>
  );
}
