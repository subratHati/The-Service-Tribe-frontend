import { useEffect, useState } from "react";
import { updatePhoneNumber } from "../api/auth";


export default function PhoneNumberDialog({ open, onClose, currentPhone, onSaved }) {
  const [phone, setPhone] = useState(currentPhone || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setPhone(currentPhone || "");
  }, [open, currentPhone]);

  if (!open) return null;

  const handleSave = async () => {
    const trimmed = (phone || "").trim();
    if (trimmed.length < 6) return push({ type: "warning", message: "Enter a valid phone number." });
    setSaving(true);
    try {
      const res = await updatePhoneNumber({ phone: trimmed });
      onSaved?.(res.data?.phoneNumber || trimmed);
      onClose?.();
    } catch (err) {
      const msg = err?.response?.data?.msg || err?.message || "Failed to save";
      push({ type: "error", message: msg });
      console.error("update-phone error", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add phone number</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <label className="block mb-4">
          <div className="text-sm font-medium mb-1">Phone number</div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 8328894189 or +91XXXXXXXXXX"
          />
        </label>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded bg-[#101828] text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </div>
    </div>
  );
}
