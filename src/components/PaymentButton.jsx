// src/components/PaymentButton.jsx
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";


export default function PaymentButton({ bookingId = null, bookingPayload = null, amountDisplay, className }) {
  const navigate = useNavigate();
  const handlePay = async () => {
    try {
      // send bookingPayload if present (your flow), else bookingId
      const body = bookingPayload ? { bookingPayload } : { bookingId };
      const { data } = await axios.post("/payment/create-order", body, { withCredentials: true });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Household Services",
        description: "Booking payment",
        order_id: data.orderId,
        theme: { color: "#101828" },
        handler: async function (response) {
          try {
            // verify on backend
            await axios.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }, { withCredentials: true });

             push({ type: "success", message: "Payment successful" });
            window.location.href = "/"; // or navigate somewhere meaningful
          } catch (e) {
            push({ type: "error", message: e?.response?.data?.msg || "Verification failed" });
            console.error("verify error", e);
          }
        },
        prefill: {
          // optional prefill: name/email/contact (Razorpay may show)
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const msg = err?.response?.data?.msg || err?.message || "Create order failed";
       push({ type: "error", message: msg });
      console.error("create order error", err);
    }
  };

  const mockPay = async () => {
    
    try {
      // simulate loading
      const confirmPayment = window.confirm(
        `This is a mock payment of ₹${amountDisplay}. Proceed?`
      );
      if (!confirmPayment) return;

      // Create booking in backend without payment

      const res = await axios.post("/booking/create", bookingPayload,);
      
      // Assuming backend returns booking details
      const booking = res.data;
      console.log("In payment button booking is : ", booking);

      // Redirect to success page with booking details
      navigate("/booking-success", { state: { booking } });
    } catch (err) {
      console.error("Mock payment failed", err);
      push({ type: "error", message: "Failed to create booking" });
    }
  };


  return (
    <button onClick={handlePay} className={`px-4 py-2 rounded ${className}`}>
      Pay {amountDisplay ? `₹${amountDisplay}` : ""}
    </button>
  );
}
