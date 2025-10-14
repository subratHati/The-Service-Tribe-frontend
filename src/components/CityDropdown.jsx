// src/components/CityDropdown.jsx
import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function CityDropdown({ placeholder = "Select your city", onlyAvailable = false }) {
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCityName");
    if(savedCity) setQ(savedCity);
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchCities = async () => {
      try {
        const res = await axios.get("/location/list");
        // support both shapes: res.data.cities or res.data (array)
        const list = res.data?.cities ?? res.data ?? [];
        if (mounted) setCities(list);
      } catch (err) {
        console.error("fetch cities:", err);
        if (mounted) setCities([]);
      }
    };
    fetchCities();
    return () => (mounted = false);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const filtered = (q ? cities.filter(c => c.name.toLowerCase().includes(q.toLowerCase())) : cities)
    .filter(c => (onlyAvailable ? c.isAvailable : true));

  const handleSelect = (city) => {
    setOpen(false);
    setQ(city.name);
     localStorage.setItem("selectedCityName", city.name);
     navigate("/");
  };

  return (
    <div ref={ref} className="relative w-72 md:w-96">
      {/* Search-like button */}
      <button
        onClick={() => { setOpen(v => !v); if (!open) setQ(""); }}
        className="w-full flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <span className="text-gray-700 truncate">{q || placeholder}</span>
        <span className="ml-auto text-xs text-gray-400">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 left-0 mt-2 w-full bg-white border rounded-lg shadow-lg">
          <div className="p-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type to filter cities..."
              className="w-full border rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="max-h-56 overflow-auto">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-gray-500">No cities found</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleSelect(c)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.isAvailable ? "Available" : "Coming soon"}</div>
                  </div>
                  <div>
                    {c.isAvailable ? (
                      <span className="text-sm text-green-600">Browse</span>
                    ) : (
                      <span className="text-sm text-yellow-600">Notify</span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}




