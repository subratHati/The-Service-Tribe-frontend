import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { mockPay } from "../api/payment";
import { createBooking } from "../api/checkout";


export default function Payment() {
    const { state } = useLocation();
    const bookingPayload = state?.bookingPayload;
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!bookingPayload) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-medium">Payment</h2>
                <p>No booking info found. Please start checkout first.</p>
            </div>
        );
    };

    const handlePay = async () => {
        setError("");
        setLoading(true);
console.log(bookingPayload);
        try {
            // 1) Simulate payment (mock). Replace with real gateway flow later.
            const payRes = await mockPay(bookingPayload.total);
            if (!payRes || !payRes.success) {
                throw new Error(payRes?.msg || "Payment failed");
            }

            // 2) Payment succeeded -> create booking(s) on server
            // The server controller will create separate booking documents per item

             console.log("Your final payLoad is : ", bookingPayload);

            const res = await createBooking({
                items: bookingPayload.items,
                address: bookingPayload.address,
                scheduleAt: bookingPayload.scheduleAt,
                total: bookingPayload.total,
            });
            console.log("res data is : ", res.bookings);

            // res expected shape:
            // { bookings: [...], amount: X, status: 'paid' }
            // Clear client cart (server already cleared DB cart in controller)
            try { await clearCart(); } catch (err) { }

            // navigate to booking success page with server response

            navigate("/booking-success", {state: {result: res}});

        } catch (error) {
              console.error("Payment/Booking error:", error);
      setError(error?.response?.data?.msg || error?.message || "Payment or booking failed");
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment</h2>

      <div className="bg-white p-4 rounded shadow">
        <p className="mb-2">Amount to pay: <strong>₹ {bookingPayload.total}</strong></p>

        {error && <div className="mb-3 text-red-600">{error}</div>}

        <div className="flex gap-3">
          <button
            onClick={handlePay}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {loading ? "Processing..." : "Pay Now (mock)"}
          </button>
           
{/* <PaymentButton bookingId={booking._id} amountDisplay={res.servicePriceAtBooking} /> */}


          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          This is a mock payment flow. Replace <code>mockPay</code> with a real payment integration later.
        </div>
      </div>
    </div>
    );


}