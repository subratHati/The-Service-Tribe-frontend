// src/pages/AdminCategories.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import CategoryForm from "../components/CategoryForm";
import { useNavigate } from "react-router-dom";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/category/all"); // adjust endpoint as needed
      setCategories(res.data.categories || res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch categories");
    } finally { setLoading(false); }
  };

  const onCreated = (cat) => {
    setCategories(prev => [cat, ...prev]);
    setShowForm(false);
  };

  const onUpdated = (cat) => {
    setCategories(prev => prev.map(c => c._id === cat._id ? cat : c));
    setEditCategory(null);
    setShowForm(false);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this category? This also removes its services.")) return;
    try {
      await axios.delete(`/category/${id}`);
      setCategories(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <div className="p-6">Loading categories...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-[#101828] text-white rounded" onClick={() => { setEditCategory(null); setShowForm(true); }}>Create new category</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat._id} className="bg-white p-4 rounded border shadow-sm flex flex-col">
            <div className="flex items-center gap-3">
              {cat.image ? <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded" /> :
                <div className="w-16 h-16 bg-[#101828] text-white flex items-center justify-center rounded text-xl font-bold">{(cat.name||"")[0]}</div>
              }
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{cat.name}</div>
                <div className="text-sm text-gray-500">{cat.description}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button className="text-sm text-[#101828] underline" onClick={() => navigate(`/admin/categories/${cat._id}`)}>View services</button>
              <div className="flex gap-2">
                <button className="px-2 py-1 border rounded text-sm" onClick={() => { setEditCategory(cat); setShowForm(true); }}>Edit</button>
                <button className="px-2 py-1 border rounded text-sm text-red-600" onClick={() => onDelete(cat._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal-ish inline form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-4">
            <CategoryForm initial={editCategory} onCreated={onCreated} onUpdated={onUpdated} onCancel={() => { setShowForm(false); setEditCategory(null); }} />
          </div>
        </div>
      )}
    </div>
  );
}
