// src/pages/AdminPopular.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { getPopularServices, addPopularService, removePopularService } from "../api/popular";
import { useToast } from "../components/ToastProvider";

export default function AdminPopular() {
  const [popular, setPopular] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [selected, setSelected] = useState("");
  const { push } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const p = await getPopularServices();
        setPopular(p || []);
        const svcRes = await axios.get("/service/all"); // expects admin/public endpoint
        const svcList = Array.isArray(svcRes.data) ? svcRes.data : (svcRes.data.services ?? svcRes.data ?? []);
        setAllServices(svcList);
      } catch (err) {
        console.error(err);
        push({ type:"error", message:"Failed to load" });
      }
    })();
  }, []);

  const handleAdd = async () => {
    if (!selected) return;
    try {
      await addPopularService(selected);
      const updated = await getPopularServices();
      setPopular(updated);
      push({ type: "success", message: "Added to popular" });
    } catch (err) {
      push({ type: "error", message: err?.msg || "Add failed" });
    }
  };

  const handleRemove = async (id) => {
    if (!confirm("Remove from popular?")) return;
    try {
      await removePopularService(id);
      setPopular(prev => prev.filter(s => s._id !== id));
      push({ type: "success", message: "Removed" });
    } catch (err) {
      push({ type: "error", message: err?.msg || "Remove failed" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Popular Services</h2>

      <div className="mb-4 flex gap-2">
        <select value={selected} onChange={e => setSelected(e.target.value)} className="border p-2 rounded flex-1">
          <option value="">Pick a service to add</option>
          {allServices.map(s => <option key={s._id} value={s._id}>{s.name} — ₹{s.price}</option>)}
        </select>
        <button onClick={handleAdd} className="px-4 py-2 bg-[#101828] text-white rounded">Add</button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Current popular (order preserved)</h3>
        <ul>
          {popular.map(p => (
            <li key={p._id} className="flex items-center justify-between border rounded p-2 mb-2">
              <div className="flex items-center gap-3">
                <img src={p.image || "/images/placeholder.png"} alt={p.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">₹{p.price}</div>
                </div>
              </div>
              <div>
                <button onClick={() => handleRemove(p._id)} className="px-3 py-1 rounded border text-red-600">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
