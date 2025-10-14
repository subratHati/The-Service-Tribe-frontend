// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useUser } from "../context/UserContext";
// import { useState } from "react";

// export default function Checkout() {
//     const { cart } = useCart();
//     const [user] = useUser();
//     const navigate = useNavigate();

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const [form, setForm] = useState({
//         name: user?.name,
//         phone: user?.phoneNumber,
//         address: "",
//         city: "",
//         pincode: "",
//         scheduleAt: "",
//     });

//     //compute total for display.
//     const total = cart.reduce((s, it) => s + (it.serviceId.price) * (it.quantity), 0);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }

//     const validate = () => {
//         if (!user) return "Please login to continue";
//         if (!form.address.trim()) return "Address is required";
//         if (!form.city.trim()) return "City is required";
//         if (!form.pincode.trim()) return "Pincode is required.";
//         if (!form.scheduleAt.trim()) return "Please choose a date/time for the service.";
//         if (!cart || cart.length === 0) return "Your cart is empty.";
//         return null;
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const v = validate();
//         if(v){
//             setError(v);
//             return;
//         }

//         setLoading(true);

//         //Build booking payload: array of items[{serviceId, quantity}] + address, schedule, paymentMethod, total.
//         const payLoad = {
//             items: cart.map((it) => ({
//                 serviceId: it.serviceId,
//                 quantity: it.quantity,
//             })),
//             address: {
//                 line1: form.address,
//                 city: form.city,
//                 pincode: form.pincode,
//             },
//             scheduleAt:new Date(form.scheduleAt).toISOString(),
//             total,
//         }

//         //Navigate to payment page and pass teh payload in location.state.
//         navigate("/paymentPage", {state: {bookingPayload: payLoad}});

//     };

//     return(
//         <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded">
//           {error}
//         </div>
//       )}

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Left: form */}
//         <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
//           <h3 className="font-medium mb-3">Your details</h3>

//           <div className="mb-2">
//             <label className="text-sm block mb-1">Name</label>
//             <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
//           </div>

//           <div className="mb-2">
//             <label className="text-sm block mb-1">Phone</label>
//             <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
//           </div>

//           <div className="mb-2">
//             <label className="text-sm block mb-1">Address</label>
//             <textarea name="address" value={form.address} onChange={handleChange} className="w-full border p-2 rounded" />
//           </div>

//           <div className="flex gap-2 mb-2">
//             <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-1/2 border p-2 rounded" />
//             <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="w-1/2 border p-2 rounded" />
//           </div>

//           <div className="mb-2">
//             <label className="text-sm block mb-1">Preferred date & time</label>
//             <input type="datetime-local" name="scheduleAt" value={form.scheduleAt} onChange={handleChange} className="w-full border p-2 rounded" />
//           </div>

//           <div className="mb-4">
//             <label className="text-sm block mb-2">Payment method</label>
//             <div className="flex gap-2">
//               <label className="inline-flex items-center gap-2">
//                 <input type="radio" name="paymentMethod" value="upi" checked={form.paymentMethod === "upi"} onChange={handleChange} />
//                 UPI
//               </label>
//               <label className="inline-flex items-center gap-2">
//                 <input type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === "card"} onChange={handleChange} />
//                 Card
//               </label>
//               <label className="inline-flex items-center gap-2">
//                 <input type="radio" name="paymentMethod" value="offline" checked={form.paymentMethod === "offline"} onChange={handleChange} />
//                 Pay later / Cash
//               </label>
//             </div>
//           </div>

//           <div className="flex justify-between items-center">
//             <div className="text-sm text-gray-600">Total</div>
//             <div className="text-xl font-bold">₹ {total}</div>
//           </div>

//           <div className="mt-4">
//             <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded bg-green-600 text-white">
//               {loading ? "Preparing payment..." : "Proceed to Payment"}
//             </button>
//           </div>
//         </form>

//         {/* Right: order summary */}
//         <aside className="bg-white p-4 rounded shadow">
//           <h3 className="font-medium mb-3">Order summary</h3>

//           <ul className="space-y-3 mb-4">
//             {cart.map((it) => (
//               <li key={it._id || it.serviceId._id} className="flex justify-between">
//                 <div>
//                   <div className="font-medium">{it.serviceId.name}</div>
//                   <div className="text-sm text-gray-500">{it.quantity} × ₹ {it.serviceId.price}</div>
//                 </div>
//                 <div className="font-medium">₹ {it.quantity * it.serviceId.price}</div>
//               </li>
//             ))}
//           </ul>

//           <div className="border-t pt-3">
//             <div className="flex justify-between mb-1">
//               <div className="text-sm text-gray-600">Subtotal</div>
//               <div>₹ {total}</div>
//             </div>
//             <div className="flex justify-between font-bold text-lg">
//               <div>Total</div>
//               <div>₹ {total}</div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//     );
// }



// src/pages/Checkout.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";

export default function Checkout() {
  const { cart } = useCart();
  const [user] = useUser();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    scheduleAt: "",
  });

  // initialize form from user once available
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.name || "",
      phone: user?.phoneNumber || user?.phone || "",
    }));
  }, [user]);

  // compute total for display.
  const total = cart.reduce(
    (s, it) => s + (it.serviceId.price || 0) * (it.quantity || 0),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!user) return "Please login to continue";
    if (!form.address.trim()) return "Address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.pincode.trim()) return "Pincode is required.";
    if (!form.scheduleAt.trim()) return "Please choose a preferred date for the service.";
    if (!cart || cart.length === 0) return "Your cart is empty.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);

    // Build booking payload: array of items[{serviceId, quantity}] + address, schedule, total.
    const payLoad = {
      items: cart.map((it) => ({
        serviceId: it.serviceId,
        quantity: it.quantity,
      })),
      address: {
        line1: form.address,
        city: form.city,
        pincode: form.pincode,
      },
      // convert date-only value to ISO (time = 00:00:00Z)
      scheduleAt: new Date(form.scheduleAt).toISOString(),
      total,
    };

    // Navigate to payment page and pass the payload in location.state.
    setLoading(false);
    navigate("/paymentPage", { state: { bookingPayload: payLoad } });
  };

  const fmt = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen pb-28 md:pb-6">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800">
        Checkout
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Left: form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 md:p-6 rounded-xl shadow space-y-3"
        >
          <h3 className="font-medium mb-2 text-base md:text-lg">Your details</h3>

          <div className="grid sm:grid-cols-2 gap-2">
            <div>
              <label className="text-xs md:text-sm block mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base"
                placeholder="Full name"
                required
                disabled={!user}
              />
            </div>

            <div>
              <label className="text-xs md:text-sm block mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base"
                placeholder="Mobile number"
                required
                disabled={!user}
              />
            </div>
          </div>

          <div>
            <label className="text-xs md:text-sm block mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base"
              placeholder="House no., street, landmark"
              rows={3}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base"
              required
            />
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full border px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="text-xs md:text-sm block mb-1">Preferred date</label>
            <input
              type="date"
              name="scheduleAt"
              value={form.scheduleAt}
              onChange={handleChange}
              className="w-full border px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Pick a day you prefer — our team will contact to confirm time slot.
            </p>
          </div>

          {/* Total and submit - desktop button visible on md+ */}
          <div className="mt-3 md:mt-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-xl md:text-2xl font-bold text-gray-900">
                {fmt(total)}
              </div>
            </div>

            <div className="hidden md:block w-44">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 rounded-lg bg-[#FD7014] text-white hover:opacity-95 transition text-sm md:text-base"
              >
                {loading ? "Preparing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </form>

        {/* Right: order summary */}
        <aside className="bg-white p-4 md:p-6 rounded-xl shadow md:sticky md:top-24 h-fit">
          <h3 className="font-medium mb-2 text-base md:text-lg">Order summary</h3>

          <ul className="space-y-2 mb-3 text-sm md:text-base">
            {cart.map((it) => (
              <li
                key={it._id || it.serviceId._id}
                className="flex justify-between items-start gap-3"
              >
                <div className="min-w-0">
                  <div className="font-medium text-gray-800 truncate text-sm md:text-base">
                    {it.serviceId.name}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1">
                    {it.quantity} × ₹ {it.serviceId.price}
                  </div>
                </div>
                <div className="font-medium text-gray-800 text-sm md:text-base">
                  ₹ {it.quantity * it.serviceId.price}
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t pt-3">
            <div className="flex justify-between mb-1 text-sm md:text-base">
              <div className="text-gray-600">Subtotal</div>
              <div>₹ {total}</div>
            </div>
            <div className="flex justify-between font-bold text-lg md:text-xl mt-2">
              <div>Total</div>
              <div>₹ {total}</div>
            </div>
          </div>

          <div className="mt-3 text-xs md:text-sm text-gray-500">
            We’ll contact you to confirm the booking time on the selected day.
          </div>
        </aside>
      </div>

      {/* Sticky bottom bar for mobile only */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t p-3 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-gray-500">Total</div>
              <div className="text-lg font-semibold text-gray-900">{fmt(total)}</div>
            </div>

            <div className="w-1/2">
              <button
                onClick={(e) => {
                  // submit the form programmatically
                  // build a small synthetic event to call handleSubmit
                  // easiest: call validate/navigate directly here by duplicating logic
                  // We'll create a temporary form submit by calling handleSubmit with a fake event
                  const fakeEvent = { preventDefault: () => {} };
                  handleSubmit(fakeEvent);
                }}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-[#FD7014] text-white font-medium text-sm hover:opacity-95 transition"
              >
                {loading ? "Preparing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
