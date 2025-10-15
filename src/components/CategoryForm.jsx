// src/components/CategoryForm.jsx
import { useState } from "react";
import axios from "../utils/axios";
import { useToast } from "./ToastProvider";

/**
 * props:
 *  - initial: null or category object (for edit)
 *  - onCreated(category) called on create
 *  - onUpdated(category) called on update
 *  - onCancel()
 */
export default function CategoryForm({ initial = null, onCreated, onUpdated, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {push} = useToast();

  const isEdit = Boolean(initial && initial._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return  push({ type: "warning", message: "Name is required" });
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", name);
      if (file) fd.append("image", file);
      console.log("fd is : ", fd);
      if (isEdit) {
        const res = await axios.put(`/category/${initial._id}`, fd, { headers: { "Content-Type": "multipart/form-data" }} );
        onUpdated?.(res.data.category);
      } else {
        const res = await axios.post("/category/create", fd, { headers: { "Content-Type": "multipart/form-data" } });
        onCreated?.(res.data.category);
      }
    } catch (err) {
      console.error(err);
       push({ type: "error", message: err?.response?.data?.message || "Save failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{isEdit ? "Edit category" : "Create category"}</h3>
        <button type="button" onClick={onCancel} className="text-sm text-gray-500">Close</button>
      </div>

      <label className="block mb-2">
        <div className="text-sm font-medium">Name</div>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </label>

      <label className="block mb-4">
        <div className="text-sm font-medium">Image</div>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        {initial?.image && !file && <img src={initial.image} alt={initial.name} className="mt-2 w-32 h-20 object-cover rounded" />}
      </label>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-[#101828] text-white rounded">{loading ? "Saving..." : "Save"}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}
