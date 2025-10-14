// src/components/CategoryCard.jsx
import { Link } from "react-router-dom";

/**
 * CategoryCard
 * Props:
 *  - category: { _id, id, name, image, imageUrl, description, count }
 *  - selectMode (bool) : if true, card will NOT navigate and will call onSelect instead
 *  - onSelect (function) : called with category when selectMode === true and card clicked
 *  - selected (bool) : visual highlight when used in a list
 *
 * Behavior:
 *  - Default: navigates to /category/:id when clicked
 *  - selectMode=true: acts like a selectable card (no navigation)
 *
 * Styling respects primary brand color #101828
 */

export default function CategoryCard({
  category = {},
  selectMode = false,
  onSelect,
  selected = false,
}) {
  const id = category._id || category.id || "";
  const name = category.name || "Category";
  const img = category.image || category.imageUrl || null;
  const description = category.description || "";

  const rootClasses = [
    "bg-white rounded-xl border transition duration-150 p-4 flex items-center gap-4",
    "shadow-sm hover:shadow-md",
    selected ? "ring-2 ring-offset-1 ring-[#FFFFFF] bg-orange-50" : "border-gray-100",
    "focus:outline-none",
  ].join(" ");

  // Accessible click handler for selectMode
  const handleKeyDown = (e) => {
    if (!selectMode) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(category);
    }
  };

  // If selectMode: render non-link interactive div
  if (selectMode) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect?.(category)}
        onKeyDown={handleKeyDown}
        aria-pressed={selected}
        className={rootClasses + " cursor-pointer"}
        aria-label={`Select ${name} category`}
      >
        {/* Image or fallback badge */}
        {img ? (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
            <img
              src={img}
              alt={`${name} category`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-xl font-semibold flex-shrink-0 bg-[#101828]"
            aria-hidden="true"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-md font-semibold text-[#101828] truncate">{name}</h3>
          </div>
          {description ? (
            <p className="text-sm text-gray-500 mt-1 truncate">{description}</p>
          ) : null}
        </div>

        {/* Chevron / indicator */}
        <div className="ml-3 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    );
  }

  // Default: navigation Link (if id exists) or non-link card
  const content = (
    <div className={rootClasses + " cursor-pointer"}>
      {img ? (
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
          <img
            src={img}
            alt={`${name} category`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-xl font-semibold flex-shrink-0 bg-[#101828]"
          aria-hidden="true"
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-md font-semibold text-[#101828] truncate">{name}</h3>
        </div>
        {description ? (
          <p className="text-sm text-gray-500 mt-1 truncate">{description}</p>
        ) : null}
      </div>

      <div className="ml-3 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );

  if (!id) {
    // no id: just render content non-link
    return content;
  }

  return (
    <Link
      to={`/category/${id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#101828] rounded-xl"
      aria-label={`Open ${name} category`}
    >
      {content}
    </Link>
  );
}
