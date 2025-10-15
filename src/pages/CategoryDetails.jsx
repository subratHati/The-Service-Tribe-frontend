// src/pages/CategoryDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import CategoryForm from "../components/CategoryForm";
import ServiceForm from "../components/ServiceForm";
import { useToast } from "../components/ToastProvider";

export default function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [creatingService, setCreatingService] = useState(false);
  const{push} = useToast();

  useEffect(() => { fetchData(); }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, svcRes] = await Promise.all([
        axios.get(`/category/${id}`),
        axios.get(`/service/category/${id}`) // adjust endpoint if needed
      ]);
      setCategory(catRes.data.category || catRes.data);
      setServices(svcRes.data.services || svcRes.data || []);
    } catch (err) {
      console.error(err);
     push({ type: "error", message: "Failed to load categories" });
      navigate("/admin/categories");
    } finally { setLoading(false); }
  };

  const onCategoryUpdated = (cat) => {
    setCategory(cat);
    setEditingCategory(false);
  };

  const onServiceCreated = (svc) => {
    setServices(prev => [svc, ...prev]);
    setCreatingService(false);
  };

  const onServiceUpdated = (svc) => {
    setServices(prev => prev.map(s => s._id === svc._id ? svc : s));
    setEditingService(null);
  };

  const deleteService = async (svcId) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`/service/${svcId}`);
      setServices(prev => prev.filter(s => s._id !== svcId));
    } catch (err) {
      console.error(err);
      push({ type: "error", message: "Deletion failed" });
    }
  };

  const deleteCategory = async () => {
    if (!window.confirm("Delete category and all its services?")) return;
    try {
      await axios.delete(`/category/${id}`);
      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
     push({ type: "error", message: "Deletion failed" });
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{category?.name}</h1>
        <div className="flex gap-2">
          <button className="px-3 py-2 border" onClick={() => setEditingCategory(true)}>Edit Category</button>
          <button className="px-3 py-2 border text-red-600" onClick={deleteCategory}>Delete Category</button>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-600">{category?.description}</div>
        {category?.image && <img src={category.image} alt={category.name} className="mt-3 w-48 h-28 object-cover rounded" />}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Services ({services.length})</h2>
        <div>
          <button className="px-3 py-2 bg-[#101828] text-white rounded" onClick={() => setCreatingService(true)}>Create service</button>
        </div>
      </div>

      {services.length === 0 ? <div className="p-4 bg-white rounded border">No services yet.</div> :
        <div className="space-y-4">
          {services.map(s => (
            <div key={s._id} className="bg-white p-4 rounded border flex items-center justify-between">
              <div>
                <div className="font-semibold">{s.name} — ₹{s.price}</div>
                <div className="text-sm text-gray-500">{s.description}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 border" onClick={() => setEditingService(s)}>Edit</button>
                <button className="px-2 py-1 border text-red-600" onClick={() => deleteService(s._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      }

      {/* Modals */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-4">
            <CategoryForm initial={category} onUpdated={onCategoryUpdated} onCancel={() => setEditingCategory(false)} />
          </div>
        </div>
      )}

      {creatingService && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-4">
            <ServiceForm categoryId={id} onCreated={onServiceCreated} onCancel={() => setCreatingService(false)} />
          </div>
        </div>
      )}

      {editingService && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-4">
            <ServiceForm initial={editingService} onUpdated={onServiceUpdated} onCancel={() => setEditingService(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
