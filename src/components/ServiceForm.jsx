// src/components/ServiceForm.jsx
import { useState } from "react";
import axios from "../utils/axios";

/**
 * props:
 *  - categoryId (for creating)
 *  - initial (service object for editing)
 *  - onCreated(service)
 *  - onUpdated(service)
 *  - onCancel()
 */
export default function ServiceForm({ categoryId, initial = null, onCreated, onUpdated, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(initial && initial._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return  push({ type: "warning", message: "Name is required." });
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("price", price);
      fd.append("description", description);
      // if creating, pass category from prop (categoryId). For edit, backend can accept category change if included.
      if (!isEdit && categoryId) fd.append("category", categoryId);
      if (file) fd.append("image", file);

      if (isEdit) {
        const res = await axios.put(`/service/update/${initial._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onUpdated?.(res.data.service || res.data);
      } else {
        const res = await axios.post("/service/create", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onCreated?.(res.data.service || res.data);
      }
    } catch (err) {
      console.error(err);
       push({ type: "error", message: err?.response?.data?.message || err?.response?.data?.msg || "Email is required." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{isEdit ? "Edit service" : "Create service"}</h3>
        <button type="button" onClick={onCancel} className="text-sm text-gray-500">Close</button>
      </div>

      <label className="block mb-2">
        <div className="text-sm font-medium">Name</div>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </label>

      <label className="block mb-2">
        <div className="text-sm font-medium">Price</div>
        <input value={price} onChange={e => setPrice(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </label>

      <label className="block mb-4">
        <div className="text-sm font-medium">Description</div>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </label>

      <label className="block mb-4">
        <div className="text-sm font-medium">Image</div>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        {initial?.image && !file && (
          <img src={initial.image} alt={initial.name} className="mt-2 w-32 h-20 object-cover rounded" />
        )}
      </label>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-[#101828] text-white rounded">{loading ? "Saving..." : "Save"}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}
