// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//     const navigate = useNavigate();
//     const {cart, removeItem, clearCart} = useCart();

//     //compute total.
//     const total = cart.reduce((sum, it) => {
//         const price = it.serviceId.price;
//         const quantity = it.quantity;
//         return sum + price * quantity;
//     }, 0);

//     const handleRemove = async(serviceId) => {
//       try {
//         await removeItem(serviceId);
//       } catch (error) {
//         alert("Failed to remove item form cart");

//       }
//     }

//     const handleClear = async() => {
//         try {
//             await clearCart();
//         } catch (error) {
//             alert("Falied to clear cart");

//         }
//     }

//     const handleCheckout = () => {
//         navigate("/checkout");
//     }

//     return (
//          <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">My Cart</h2>

//       {(!cart || cart.length === 0) ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="space-y-3">
//             {cart.map((it) => {
//               // keys: prefer cart item's own _id, fallback to service id
//               const key = it._id || it.serviceId._id;
//               const name = it.serviceId.name;
//               const price = it.serviceId.price;
//               const qty = it.quantity;
//               const subtotal = price * qty;

//               return (
//                 <li key={key} className="flex justify-between items-center border p-3 rounded">
//                   <div>
//                     <div className="font-medium">{name}</div>
//                     <div className="text-sm text-gray-500">₹ {price} each</div>
//                     <div className="text-sm text-gray-400">
//                       {qty} × ₹ {price} ={" "}
//                       <span className="font-medium">₹ {subtotal}</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-end gap-2">
//                     <button
//                       onClick={() => handleRemove(it.serviceId._id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>

//           <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//             <div>
//               <div className="text-sm text-gray-500">Total</div>
//               <div className="text-2xl font-bold">₹ {total}</div>
//             </div>

//             <div className="flex gap-3">
//               <button onClick={handleClear} className="px-4 py-2 rounded border">
//                 Clear Cart
//               </button>
//               <button onClick={handleCheckout} className="px-4 py-2 rounded bg-gray-900 text-white">
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//     );
// }



// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeItem, clearCart } = useCart();
  const {push} = useToast();

  // compute total
  const total = cart.reduce((sum, it) => {
    const price = it.serviceId?.price || 0;
    const quantity = it.quantity || 0;
    return sum + price * quantity;
  }, 0);

  const handleRemove = async (serviceId) => {
    try {
      await removeItem(serviceId);
    } catch (error) {
      push({ type: "error", message: "Failed to remove item from cart" });
    }
  };

  const handleClear = async () => {
    try {
      await clearCart();
    } catch (error) {
      push({ type: "error", message: "Failed to clear cart" });
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const fmt = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="min-h-[80vh] bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">My Cart</h2>

        {/* Empty cart */}
        {(!cart || cart.length === 0) ? (
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-md text-center flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty cart"
              className="w-36 h-36 sm:w-48 sm:h-48 mb-4 opacity-90"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
              Your cart is empty
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              Looks like you haven’t added any services yet.
            </p>
            <button
              onClick={() => navigate("/category")}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-[#FD7014] text-white rounded-lg hover:opacity-95 transition-all text-sm sm:text-base"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - items (span 2 on large screens) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((it) => {
                const key = it._id || it.serviceId?._id;
                const name = it.serviceId?.name || "Service";
                const price = it.serviceId?.price || 0;
                const qty = it.quantity || 0;
                const subtotal = price * qty;
                const img =
                  it.serviceId?.image ||
                  it.serviceId?.imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/1046/1046857.png";

                return (
                  <div
                    key={key}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-start"
                  >
                    {/* Thumbnail: fixed square so cards have consistent height */}
                    <div className="w-full sm:w-28 h-28 sm:h-28 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      <img src={img} alt={name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="font-medium text-gray-800 text-sm sm:text-base truncate">
                          {name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-1">
                          ₹ {price} per service
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="text-sm text-gray-600">
                          <div className="text-xs text-gray-500">Qty</div>
                          <div className="font-semibold text-gray-700">{qty}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-gray-500">Subtotal</div>
                          <div className="text-sm sm:text-base font-semibold text-gray-800">
                            {fmt(subtotal)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-start sm:items-center gap-2">
                      <button
                        onClick={() => handleRemove(it.serviceId._id)}
                        className="text-xs sm:text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right - Summary */}
            <aside className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6 h-fit w-full lg:sticky lg:top-28">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Order Summary</h3>
                <div className="text-2xl font-bold text-[#FD7014] mt-1">{fmt(total)}</div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="md:static fixed bottom-0 left-0 w-full bg-white p-3 border-t border-gray-200 z-50">
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
                   onClick={handleCheckout}
                   >
                    Book Now
                  </button>
                </div>

                <button
                  onClick={handleClear}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm"
                >
                  Clear Cart
                </button>

                <button
                  onClick={() => navigate("/category")}
                  className="w-full px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  Continue Browsing
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
