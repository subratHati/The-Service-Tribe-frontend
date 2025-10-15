// // src/components/ServiceCard.jsx
// import { useCart } from "../context/CartContext";
// import { useUser } from "../context/UserContext";

// export default function ServiceCard({ service }) {
//   if (!service) return null;

//   const { addItem } = useCart();
//   const [user] = useUser();

//   const handleAdd = () => {
//     if (!user) {
//       alert("Please login to add item to your cart");
//       return;
//     }
//     addItem(service._id);
//     alert("Service added to cart");
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
//       {/* Image */}
//       {service.image ? (
//         <img
//           src={service.image}
//           alt={service.name}
//           className="w-full h-40 object-cover"
//         />
//       ) : (
//         <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
//           No Image
//         </div>
//       )}

//       {/* Info */}
//       <div className="flex flex-col h-full p-5">
//         <div className="flex flex-col gap-2">
//           <div className="text-lg font-semibold text-[#101828]">{service.name}</div>
//           <div className="text-sm text-gray-600">{service.description}</div>
//           <div className="mt-2 text-base font-bold text-[#101828]">₹ {service.price}</div>
//         </div>

//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={handleAdd}
//             className="px-4 py-2 rounded-lg bg-[#101828] text-white text-sm font-medium hover:bg-opacity-90 transition-colors"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/ServiceCard.jsx
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useToast } from "./ToastProvider";

export default function ServiceCard({ service }) {
  const {push} = useToast();
  if (!service) return null;

  const { addItem } = useCart();
  const [user] = useUser();

  const handleAdd = () => {
    if (!user) {
      push({ type: "warning", message: "Please login to add items to your cart" });
      return;
    }
    addItem(service._id);
    push({ type: "success", message: "Service added to cart." });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      {service.image ? (
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-28 sm:h-36 md:h-40 object-cover"
        />
      ) : (
        <div className="w-full h-28 sm:h-36 md:h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-xs sm:text-sm">
          No Image
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <div className="flex-1 flex flex-col gap-1 sm:gap-2">
          <div className="text-sm xs:text-base sm:text-lg font-semibold text-[#101828]">
            {service.name}
          </div>
          <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 line-clamp-2">
            {service.description}
          </div>
          <div className="mt-1 sm:mt-2 text-sm sm:text-base font-bold text-[#101828]">
            ₹ {service.price}
          </div>
        </div>

        <div className="mt-2 sm:mt-3 flex justify-end">
          <button
            onClick={handleAdd}
            className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#101828] text-white text-[10px] xs:text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
