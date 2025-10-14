// src/api/booking.js
import axios from "../utils/axios";

export async function sendCompletionOtp(bookingId) {
  const res = await axios.post(`/booking/${bookingId}/send-completion-otp`, {}, { withCredentials: true });
  return res.data;
}

export async function verifyCompletionOtp(bookingId, otp) {
  const res = await axios.post(`/booking/${bookingId}/verify-completion-otp`, { otp }, { withCredentials: true });
  return res.data;
}
