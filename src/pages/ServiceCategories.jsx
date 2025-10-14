// // import { useState, useEffect } from "react";
// // import axios from "../utils/axios";
// // import CategoryCard from "../components/CategoryCard";

// // export default function ServiceCategories() {

// //     const [categories, setCategories] = useState([]);
// //     const [loading, setLoading] = useState(false);

// //     useEffect(() => {
// //         const fetch = async() => {
// //             setLoading(true);
// //             try {
// //                 const res =await axios.get("/category/all");
// //                 console.log("All the categories are : ", res.data.categories);
// //                 setCategories(res.data.categories);

// //             } catch (error) {
// //                 console.error(error);
// //             }finally{
// //                 setLoading(false);
// //             }
// //         }
// //         fetch();
// //     }, []);

// //      if (loading) return <div className="p-6">Loading categories...</div>;

// //      return(
// //          <div className="max-w-6xl mx-auto p-4">
// //       <h2 className="text-2xl font-bold mb-6">Service Categories</h2>

// //       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
// //         {categories.map((c) => (
// //           <CategoryCard
// //             key={c._id}
// //             category={c}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //      );
// // }

// // import { useState, useEffect } from "react";
// // import axios from "../utils/axios";
// // import CategoryCard from "../components/CategoryCard";
// // import ServiceCard from "../components/ServiceCard";

// // export default function ServiceCategories() {
// //   const [categories, setCategories] = useState([]);
// //   const [services, setServices] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [loadingCategories, setLoadingCategories] = useState(false);
// //   const [loadingServices, setLoadingServices] = useState(false);

// //   // Fetch all categories
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       setLoadingCategories(true);
// //       try {
// //         const res = await axios.get("/category/all");
// //         setCategories(res.data.categories);
// //         if (res.data.categories.length > 0) {
// //           setSelectedCategory(res.data.categories[0]); // Select first category by default
// //         }
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //       } finally {
// //         setLoadingCategories(false);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Fetch services for selected category
// //   useEffect(() => {
// //     if (!selectedCategory) return;
// //     const fetchServices = async () => {
// //       setLoadingServices(true);
// //       try {
// //         const res = await axios.get(`/service/category/${selectedCategory._id}`);
// //         setServices(res.data);
// //       } catch (error) {
// //         console.error("Error fetching services:", error);
// //         setServices([]);
// //       } finally {
// //         setLoadingServices(false);
// //       }
// //     };
// //     fetchServices();
// //   }, [selectedCategory]);

// //   if (loadingCategories) return <div className="p-6">Loading categories...</div>;

// //   return (
// //     <div className="max-w-6xl mx-auto p-4 flex gap-6">
// //       {/* Left Sidebar: Categories */}
// //       <div className="w-1/4 space-y-3 sticky top-20 h-[80vh] overflow-y-auto">
// //         {categories.map((category) => (
// //           <div
// //             key={category._id}
// //             onClick={() => setSelectedCategory(category)}
// //             className={`cursor-pointer transition-all duration-200 rounded-lg border-2 ${selectedCategory?._id === category._id
// //                 ? "border-[#FD7014] bg-orange-50"
// //                 : "border-transparent hover:border-gray-200"
// //               }`}
// //           >
// //             <CategoryCard
// //               category={category}
// //               selectMode={true}
// //               onSelect={() => setSelectedCategory(category)}
// //               selected={selectedCategory?._id === category._id}
// //             />
// //           </div>
// //         ))}
// //       </div>

// //       {/* Right: Services of selected category */}
// //       <div className="w-3/4 h-[80vh] overflow-y-auto">
// //         <h2 className="text-2xl font-bold mb-4">
// //           {selectedCategory ? selectedCategory.name : "Select a category"}
// //         </h2>

// //         {loadingServices ? (
// //           <div>Loading services...</div>
// //         ) : services.length > 0 ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {services.map((service) => (
// //               <ServiceCard key={service._id} service={service} />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-gray-500">No services found for this category.</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// // src/pages/ServiceCategories.jsx
// import { useState, useEffect } from "react";
// import axios from "../utils/axios";
// import CategoryCard from "../components/CategoryCard";
// import ServiceCard from "../components/ServiceCard";

// export default function ServiceCategories() {
//   const [categories, setCategories] = useState([]);
//   const [services, setServices] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [loadingServices, setLoadingServices] = useState(false);

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoadingCategories(true);
//       try {
//         const res = await axios.get("/category/all");
//         const cats = res.data?.categories ?? res.data ?? [];
//         setCategories(cats);

//         if (cats.length > 0) {
//           setSelectedCategory(cats[0]); // select first by default
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch services for selected category
//   useEffect(() => {
//     if (!selectedCategory) {
//       setServices([]);
//       return;
//     }

//     const fetchServices = async () => {
//       setLoadingServices(true);
//       try {
//         // backend returns array (either res.data or res.data.services)
//         const res = await axios.get(`/service/category/${selectedCategory._id}`);
//         const svcs = res.data?.services ?? res.data ?? [];
//         setServices(svcs);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setServices([]);
//       } finally {
//         setLoadingServices(false);
//       }
//     };

//     fetchServices();
//   }, [selectedCategory]);

//   if (loadingCategories) return <div className="p-6">Loading categories...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4 flex gap-6">
//       {/* Left Sidebar: Categories (uses CategoryCard in selectMode) */}
//       <aside className="w-1/4 space-y-3 sticky top-20 h-[80vh] overflow-y-auto">
//         <div className="mb-2 text-sm text-gray-500">Categories</div>

//         <div className="space-y-3">
//           {categories.map((category) => (
//             <CategoryCard
//               key={category._id}
//               category={category}
//               selectMode={true}
//               onSelect={() => setSelectedCategory(category)}
//               selected={selectedCategory?._id === category._id}
//             />
//           ))}

//           {categories.length === 0 && (
//             <div className="text-sm text-gray-500">No categories found.</div>
//           )}
//         </div>
//       </aside>

//       {/* Right: Services of selected category */}
//       <main className="w-3/4 h-[80vh] overflow-y-auto">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold">
//             {selectedCategory ? selectedCategory.name : "Select a category"}
//           </h2>
//           <div className="text-sm text-gray-500">
//             {selectedCategory ? `${services.length} services` : ""}
//           </div>
//         </div>

//         {loadingServices ? (
//           <div>Loading services...</div>
//         ) : services.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {services.map((service) => (
//               <ServiceCard key={service._id || service.id} service={service} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-gray-500">No services found for this category.</div>
//         )}
//       </main>
//     </div>
//   );
// }


// src/pages/ServiceCategories.jsx
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import CategoryCard from "../components/CategoryCard";
import ServiceCard from "../components/ServiceCard";
import Loading from "../components/Loading";

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await axios.get("/category/all");
        const cats = res.data?.categories ?? res.data ?? [];
        setCategories(cats);

        if (cats.length > 0) setSelectedCategory(cats[0]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch services for selected category
  useEffect(() => {
    if (!selectedCategory) {
      setServices([]);
      return;
    }

    const fetchServices = async () => {
      setLoadingServices(true);
      try {
        const res = await axios.get(`/service/category/${selectedCategory._id}`);
        const svcs = res.data?.services ?? res.data ?? [];
        setServices(svcs);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  if (loadingCategories) return  <Loading variant="fullscreen" message="Loading services..." />;

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Left Sidebar: Categories */}
      <aside className="md:w-1/4 flex md:flex-col overflow-x-auto md:overflow-y-auto gap-3 md:gap-3">
        {categories.length === 0 && (
          <div className="text-sm text-gray-500 md:mb-3">No categories found.</div>
        )}

        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer flex md:flex-row flex-col items-center md:items-start justify-center md:justify-start gap-2 md:gap-3 p-2 md:p-1 rounded-lg transition-all duration-200
              ${selectedCategory?._id === category._id
                ? "border-2 border-[#FD7014] bg-orange-50"
                : "border border-transparent hover:border-gray-200"
              }`}
          >
            {/* Category Image */}
            <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-full overflow-hidden shadow-sm">
              <img
                src={category.image || category.imageUrl || category.thumbnail}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category Name */}
            <div className="text-center md:text-left text-xs xs:text-sm md:text-base font-medium">
              {category.name}
            </div>
          </div>
        ))}
      </aside>

      {/* Right: Services */}
      <main className="md:w-3/4 flex-1">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xl sm:text-2xl font-bold">
            {selectedCategory ? selectedCategory.name : "Select a category"}
          </h2>
          <div className="text-sm text-gray-500">
            {selectedCategory ? `${services.length} services` : ""}
          </div>
        </div>

        {loadingServices ? (
         <Loading variant="inline" size="sm" message="Fetching..." />
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <ServiceCard key={service._id || service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No services found for this category.</div>
        )}
      </main>
    </div>
  );
}

