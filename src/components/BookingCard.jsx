// src/components/BookingCard.jsx
export default function BookingCard({ booking, onConfirm, onStart, onComplete, onCancel }) {
  const b = booking;
  return (
    <div className="bg-white p-4 rounded shadow-sm border flex flex-col md:flex-row justify-between gap-4">
      <div>
        <div className="text-lg font-medium">{b.serviceName} — ₹{b.servicePriceAtBooking}</div>
        <div className="text-sm text-gray-600">Qty: {b.quantity ?? 1}</div>
        <div className="text-sm text-gray-600">Scheduled: {b.scheduledAt ? new Date(b.scheduledAt).toLocaleString() : "—"}</div>
        <div className="text-sm text-gray-600">User: {b.user?.name || b.user?.phoneNumber || b.user}</div>
        <div className="text-sm text-gray-600">Phone: {b.user?.phoneNumber || "—"}</div>
        <div className="mt-2 text-sm">Address: {b.address}</div>
        {b.notes && <div className="mt-2 text-sm text-gray-700">Notes: {b.notes}</div>}
      </div>

      <div className="flex flex-col gap-2 items-start md:items-end">
        <div className="text-sm">
          <span className="font-medium">Status: </span>
          <span className="capitalize">{b.status}</span>
        </div>

        <div className="flex gap-2">
          <button disabled={["confirmed","cancelled","completed"].includes(b.status)} onClick={onConfirm} className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50">Confirm</button>

          <button disabled={["in_progress","cancelled","completed"].includes(b.status)} onClick={onStart} className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50">In Progress</button>

          <button disabled={["completed","cancelled"].includes(b.status)} onClick={onComplete} className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50">Mark Complete</button>

          <button disabled={b.status === "cancelled"} onClick={onCancel} className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50">Cancel</button>
        </div>
      </div>
    </div>
  );
}
