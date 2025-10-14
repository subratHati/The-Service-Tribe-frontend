// // src/pages/Home.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../utils/axios";

// // removed CategoryCard usage here on purpose (we render custom cards)
// // reuse your Service card component and optional CityDropdown
// import Service from "../components/ServiceCard";
// import CityDropdown from "../components/CityDropdown";

// const TESTIMONIALS = [
//   { id: 1, name: "Rahul S.", text: "Fast, professional and reasonably priced. Technician came on time." },
//   { id: 2, name: "Priya M.", text: "AC cleaning was thorough — my AC works like new!" },
//   { id: 3, name: "Sandeep K.", text: "Easy booking and polite staff. Recommended." },
// ];

// export default function Home() {
//   const [popular, setPopular] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // read selected city from localStorage (CityDropdown writes this)
//   const selectedCityName = typeof window !== "undefined" ? localStorage.getItem("selectedCityName") : null;

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         // fetch all services
//         const res = await axios.get("/service/popular");
//         const svcList = Array.isArray(res.data) ? res.data : (res.data.services ?? res.data ?? []);
//         setPopular(svcList.slice(0, 6));

//         // Fetch categories
//         const catRes = await axios.get("/category/all");
//         setCategories(catRes.data.categories ?? catRes.data ?? []);
//       } catch (err) {
//         console.log("Cannot fetch services:", err?.message);
//         // fallback placeholders
//         setPopular([
//           { _id: "p1", name: "AC cleaning", price: 750, description: "AC deep cleaning" },
//           { _id: "p2", name: "Pest control", price: 999, description: "Home pest control" },
//           { _id: "p3", name: "Tap repair", price: 250, description: "Leak & tap repair" },
//         ]);
//       }

//       try {
//         // fetch city list (same endpoint CityDropdown uses)
//         const cityRes = await axios.get("/location/list");
//         const cityList = cityRes.data?.cities ?? cityRes.data ?? [];
//         setCities(cityList);
//       } catch (err) {
//         console.log("Cannot fetch cities:", err?.message);
//         setCities([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [navigate]);

//   // find selected city object (case-insensitive)
//   const selectedCityObj = (selectedCityName && Array.isArray(cities))
//     ? cities.find(c => c.name && c.name.toLowerCase() === selectedCityName.toLowerCase())
//     : null;

//   // If a city is selected AND it exists in our list AND isAvailable === false
//   // then hide categories/popular services and show the "coming soon" message.
//   const hideServicesForCity = selectedCityObj && selectedCityObj.isAvailable === false;

//   // Helper: resolve image URL from category doc
//   const getCategoryImage = (cat) => {
//     // support multiple possible fields from API
//     return cat?.image || cat?.imageUrl || cat?.thumbnail || null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 pt-8">
//         {/* optional city dropdown at top — include if you want */}
//         <div className="grid lg:grid-cols-2 gap-8 items-start">
//           {/* LEFT: categories & small popular list OR "coming soon" message */}
//           <div>
//             {!hideServicesForCity ? (
//               <>
//                 {/* Popular categories as circles */}
//                 <h3 className="text-2xl font-semibold mb-4">Popular Categories</h3>
//                 <div className="flex flex-wrap gap-6">
//                   {categories.map((c) => {
//                     const img = c?.image || c?.imageUrl || c?.thumbnail || null;

//                     return (
//                       <div
//                         key={c._id}
//                         role="button"
//                         tabIndex={0}
//                         onClick={() => navigate(`/category/${c._id}`)}
//                         onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/category/${c._id}`); }}
//                         className="flex flex-col items-center cursor-pointer"
//                       >
//                         <div className="h-34 w-34 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition overflow-hidden">
//                           {img ? (
//                             <img
//                               src={img}
//                               alt={c.name}
//                               className="w-full h-full object-cover rounded-full"
//                               loading="lazy"
//                               decoding="async"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white text-2xl font-bold">
//                               {c.name.charAt(0)}
//                             </div>
//                           )}
//                         </div>
//                         <div className="mt-2 text-center text-sm font-medium">{c.name}</div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Browse All Services Button */}
//                 <div className="mt-6">
//                   <button
//                     onClick={() => navigate("/category")}
//                     className="px-6 py-2 bg-[#FD7014] text-white font-semibold rounded-lg shadow hover:bg-[#e25f00] transition"
//                   >
//                     Browse All Services
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="bg-white p-6 rounded-lg border shadow-sm">
//                 <h3 className="text-xl font-semibold mb-2">Service coming soon</h3>
//                 <p className="text-gray-600">
//                   We are currently unavailable in <strong>{selectedCityObj?.name || selectedCityName}</strong>.
//                   We will be available soon — please check back later.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* RIGHT: Hero with single image */}
//           <div className="rounded-xl overflow-hidden">
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="p-1">
//                 <div className="w-full h-[360px] rounded overflow-hidden">
//                   <img
//                     src="/images/hero_image.png"  // ← your new combined image
//                     alt="hero"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Popular Services section - hidden when city unavailable */}
//         {!hideServicesForCity && (
//           <section className="mt-10">
//             <h3 className="text-2xl font-semibold mb-4">Popular Services</h3>
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {popular.map((s) => (
//                 <div key={s._id || s.id}><Service service={s} /></div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* How it works (kept same) */}
//         <section className="my-12">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-2xl font-semibold">How it works</h3>
//             <p className="text-sm text-gray-500 hidden sm:block">Quick and simple.</p>
//           </div>

//           <div className="relative">
//             <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

//             <div className="grid md:grid-cols-3 gap-6">
//               {/* Step 1 */}
//               <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-200">
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#FD7014] to-[#D35A0F] flex items-center justify-center text-white">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
//                       </svg>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h4 className="text-lg font-semibold">Choose</h4>
//                       <span className="ml-auto text-sm text-gray-400">Step 1</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-2">Pick a category or search for a service.</p>
//                     <ul className="mt-3 text-sm text-gray-600 space-y-1">
//                       <li>• Clear price & duration</li>
//                       <li>• Verified providers</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Step 2 */}
//               <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-200">
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="h-12 w-12 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#0EA5E9]">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h4 className="text-lg font-semibold">Schedule</h4>
//                       <span className="ml-auto text-sm text-gray-400">Step 2</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-2">Choose date and time. Confirm the booking.</p>
//                     <ul className="mt-3 text-sm text-gray-600 space-y-1">
//                       <li>• Instant confirmation</li>
//                       <li>• Reschedule if needed</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Step 3 */}
//               <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-200">
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="h-12 w-12 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#16A34A]">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h4 className="text-lg font-semibold">Done</h4>
//                       <span className="ml-auto text-sm text-gray-400">Step 3</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-2">Technician completes the job. Rate if you like.</p>
//                     <ul className="mt-3 text-sm text-gray-600 space-y-1">
//                       <li>• Satisfaction guarantee</li>
//                       <li>• Easy rebook</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="md:hidden mt-6 flex items-center justify-between px-2">
//               <div className="flex items-center gap-2">
//                 <div className="h-2 w-2 rounded-full bg-[#FD7014]" />
//                 <div className="text-xs text-gray-500">Choose</div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
//                 <div className="text-xs text-gray-500">Schedule</div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
//                 <div className="text-xs text-gray-500">Done</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Why choose us & Testimonials left unchanged */}
//         <section className="my-14">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-2xl font-semibold">Why choose us</h3>
//             <p className="text-sm text-gray-500 hidden sm:block">Trusted, transparent & convenient — built for busy homes.</p>
//           </div>

//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//             <div className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
//               <div className="mx-auto h-12 w-12 rounded-lg bg-[#FEF3E8] flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FD7014]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" />
//                 </svg>
//               </div>
//               <div className="font-semibold">Verified Technicians</div>
//               <div className="text-sm text-gray-500 mt-2">Background-checked & trained professionals.</div>
//             </div>

//             <div className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
//               <div className="mx-auto h-12 w-12 rounded-lg bg-[#F0F9FF] flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3M5 5h14" />
//                 </svg>
//               </div>
//               <div className="font-semibold">Transparent Pricing</div>
//               <div className="text-sm text-gray-500 mt-2">Upfront costs — no hidden fees.</div>
//             </div>

//             <div className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
//               <div className="mx-auto h-12 w-12 rounded-lg bg-[#ECFDF5] flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14v8H5z" />
//                 </svg>
//               </div>
//               <div className="font-semibold">Secure Payments</div>
//               <div className="text-sm text-gray-500 mt-2">UPI, cards & popular wallets supported.</div>
//             </div>

//             <div className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
//               <div className="mx-auto h-12 w-12 rounded-lg bg-[#FFF7ED] flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-6 0v4" />
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 15h4l1 5 5-9V5H5z" />
//                 </svg>
//               </div>
//               <div className="font-semibold">Satisfaction Guarantee</div>
//               <div className="text-sm text-gray-500 mt-2">Not happy? We will make it right.</div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials */}
//         <section className="my-10">
//           <h3 className="text-2xl font-semibold mb-4">What our customers say</h3>
//           <div className="grid sm:grid-cols-3 gap-4">
//             {TESTIMONIALS.map((t) => (
//               <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm border">
//                 <div className="font-medium">{t.name}</div>
//                 <div className="text-sm text-gray-600 mt-2">{t.text}</div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }


// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

import Service from "../components/ServiceCard";
import CityDropdown from "../components/CityDropdown";

const TESTIMONIALS = [
  { id: 1, name: "Rahul S.", text: "Fast, professional and reasonably priced. Technician came on time." },
  { id: 2, name: "Priya M.", text: "AC cleaning was thorough — my AC works like new!" },
  { id: 3, name: "Sandeep K.", text: "Easy booking and polite staff. Recommended." },
];

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const selectedCityName = typeof window !== "undefined" ? localStorage.getItem("selectedCityName") : null;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/service/popular");
        const svcList = Array.isArray(res.data) ? res.data : (res.data.services ?? res.data ?? []);
        setPopular(Array.isArray(svcList) ? svcList.slice(0, 6) : []);

        const catRes = await axios.get("/category/all");
        setCategories(catRes.data.categories ?? catRes.data ?? []);
      } catch (err) {
        console.log("Cannot fetch services:", err?.message);
        setPopular([
          { _id: "p1", name: "AC cleaning", price: 750, description: "AC deep cleaning" },
          { _id: "p2", name: "Pest control", price: 999, description: "Home pest control" },
          { _id: "p3", name: "Tap repair", price: 250, description: "Leak & tap repair" },
        ]);
      }

      try {
        const cityRes = await axios.get("/location/list");
        const cityList = cityRes.data?.cities ?? cityRes.data ?? [];
        setCities(cityList);
      } catch (err) {
        console.log("Cannot fetch cities:", err?.message);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const selectedCityObj = (selectedCityName && Array.isArray(cities))
    ? cities.find(c => c.name && c.name.toLowerCase() === selectedCityName.toLowerCase())
    : null;

  const hideServicesForCity = selectedCityObj && selectedCityObj.isAvailable === false;

  const getCategoryImage = (cat) => {
    return cat?.image || cat?.imageUrl || cat?.thumbnail || null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            {!hideServicesForCity ? (
              <>
                <h3 className="text-2xl font-semibold mb-4">Popular Categories</h3>

                <div className="overflow-x-auto -mx-4 px-4 sm:px-0">
                  <div className="flex gap-4 flex-nowrap sm:flex-wrap">
                    {categories.map((c) => {
                      const img = getCategoryImage(c);
                      const initial = (c.name && c.name.charAt(0).toUpperCase()) || "?";

                      return (
                        <div
                          key={c._id}
                          role="button"
                          tabIndex={0}
                          onClick={() => navigate(`/category/${c._id}`)}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/category/${c._id}`); }}
                          className="flex-shrink-0 sm:flex-shrink-0 flex flex-col items-center cursor-pointer"
                          aria-label={`Open ${c.name} category`}
                        >
                          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition overflow-hidden bg-white">
                            {img ? (
                              <img
                                src={img}
                                alt={`${c.name} category`}
                                className="w-full h-full object-cover rounded-full"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white text-xl sm:text-2xl font-bold">
                                {initial}
                              </div>
                            )}
                          </div>

                          <div className="mt-2 text-center text-sm font-medium truncate" style={{ maxWidth: 120 }}>
                            {c.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate("/category")}
                    className="px-6 py-2 bg-[#FD7014] text-white font-semibold rounded-lg shadow hover:bg-[#e25f00] transition"
                  >
                    Browse All Services
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Service coming soon</h3>
                <p className="text-gray-600">
                  We are currently unavailable in <strong>{selectedCityObj?.name || selectedCityName}</strong>.
                  We will be available soon — please check back later.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl overflow-hidden">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-1">
                <div className="w-full h-48 sm:h-64 md:h-[360px] rounded overflow-hidden">
                  <img
                    src="/images/hero_image.png"
                    alt="hero"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {!hideServicesForCity && (
          <section className="my-12">
  <h3 className="text-xl font-semibold mb-4 sm:text-2xl">Popular Services</h3>
  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-visible">
    {popular.map((s) => (
      <div key={s._id || s.id} className="snap-start min-w-[180px] sm:min-w-0">
        <Service service={s} />
      </div>
    ))}
  </div>
</section>
        )}

        <section className="my-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">How it works</h3>
            <p className="text-sm text-gray-500 hidden sm:block">Quick and simple.</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

            {/* mobile: horizontal row scroll with snap; md+: grid 3 columns */}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
              {/* Step 1 */}
              <div className="snap-start min-w-[220px] md:min-w-0 bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FD7014] to-[#D35A0F] flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-lg font-semibold">Choose</h4>
                      <span className="ml-auto text-xs text-gray-400">Step 1</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">Pick a category or search for a service.</p>
                    <ul className="mt-2 text-xs md:text-sm text-gray-600 space-y-1">
                      <li>• Clear price & duration</li>
                      <li>• Verified providers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="snap-start min-w-[220px] md:min-w-0 bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#0EA5E9]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-lg font-semibold">Schedule</h4>
                      <span className="ml-auto text-xs text-gray-400">Step 2</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">Choose date and time. Confirm the booking.</p>
                    <ul className="mt-2 text-xs md:text-sm text-gray-600 space-y-1">
                      <li>• Instant confirmation</li>
                      <li>• Reschedule if needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="snap-start min-w-[220px] md:min-w-0 bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#16A34A]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-lg font-semibold">Done</h4>
                      <span className="ml-auto text-xs text-gray-400">Step 3</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">Technician completes the job. Rate if you like.</p>
                    <ul className="mt-2 text-xs md:text-sm text-gray-600 space-y-1">
                      <li>• Satisfaction guarantee</li>
                      <li>• Easy rebook</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden mt-6 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#FD7014]" />
                <div className="text-xs text-gray-500">Choose</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
                <div className="text-xs text-gray-500">Schedule</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#16A34A]" />
                <div className="text-xs text-gray-500">Done</div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Why choose us</h3>
            <p className="text-sm text-gray-500 hidden sm:block">Trusted, transparent & convenient — built for busy homes.</p>
          </div>

          {/* mobile: horizontal row; md+: grid 4 columns */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-6">
            <div className="snap-start min-w-[200px] md:min-w-0 bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
              <div className="mx-auto h-10 w-10 rounded-lg bg-[#FEF3E8] flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD7014]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" />
                </svg>
              </div>
              <div className="font-semibold text-sm md:text-base">Verified Technicians</div>
              <div className="text-xs md:text-sm text-gray-500 mt-2">Background-checked & trained professionals.</div>
            </div>

            <div className="snap-start min-w-[200px] md:min-w-0 bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
              <div className="mx-auto h-10 w-10 rounded-lg bg-[#F0F9FF] flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0EA5E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3M5 5h14" />
                </svg>
              </div>
              <div className="font-semibold text-sm md:text-base">Transparent Pricing</div>
              <div className="text-xs md:text-sm text-gray-500 mt-2">Upfront costs — no hidden fees.</div>
            </div>

            <div className="snap-start min-w-[200px] md:min-w-0 bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
              <div className="mx-auto h-10 w-10 rounded-lg bg-[#ECFDF5] flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14v8H5z" />
                </svg>
              </div>
              <div className="font-semibold text-sm md:text-base">Secure Payments</div>
              <div className="text-xs md:text-sm text-gray-500 mt-2">UPI, cards & popular wallets supported.</div>
            </div>

            <div className="snap-start min-w-[200px] md:min-w-0 bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 text-center">
              <div className="mx-auto h-10 w-10 rounded-lg bg-[#FFF7ED] flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-6 0v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15h4l1 5 5-9V5H5z" />
                </svg>
              </div>
              <div className="font-semibold text-sm md:text-base">Satisfaction Guarantee</div>
              <div className="text-xs md:text-sm text-gray-500 mt-2">Not happy? We will make it right.</div>
            </div>
          </div>
        </section>

        <section className="my-10">
          <h3 className="text-2xl font-semibold mb-4">What our customers say</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-gray-600 mt-2">{t.text}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


