import React from "react";

/**
 * Loading component
 *
 * Props:
 * - variant: "fullscreen" | "inline" | "button" (default: "inline")
 * - size: "sm" | "md" | "lg" (default: "md")
 * - message: optional text (shown under spinner for fullscreen, next to spinner for inline)
 * - className: additional wrapper classes
 *
 * Uses site theme color #101828 by default.
 */
export default function Loading({
  variant = "inline",
  size = "md",
  message = "",
  className = "",
}) {
  const color = "#101828"; // theme color
  const sizes = {
    sm: { w: 4, h: 4, stroke: 2 },
    md: { w: 6, h: 6, stroke: 2.5 },
    lg: { w: 10, h: 10, stroke: 3 },
  };
  const sz = sizes[size] || sizes.md;

  const Spinner = ({ compact = false }) => (
    <svg
      role="img"
      aria-hidden="true"
      width={sz.w * 4}
      height={sz.h * 4}
      viewBox="0 0 24 24"
      className={`animate-spin inline-block ${compact ? "align-middle" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth={sz.stroke}
        strokeOpacity="0.12"
        fill="none"
      />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke={color}
        strokeWidth={sz.stroke}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  if (variant === "fullscreen") {
    return (
      <div
        role="status"
        aria-busy="true"
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ${className}`}
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border">
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-[#F1F5F9]">
              <Spinner />
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-[#101828]">
                {message || "Loading"}
              </div>
              {message && (
                <div className="text-sm text-gray-500 mt-1">
                  Please wait a moment...
                </div>
              )}
            </div>

            {/* subtle animated dots for friendliness */}
            <div className="flex items-center gap-1 mt-2">
              <span className="w-2 h-2 rounded-full bg-[#101828] opacity-80 animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-2 h-2 rounded-full bg-[#101828] opacity-60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-[#101828] opacity-40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`} aria-busy="true" role="status">
        <Spinner compact />
        <span className="text-sm font-medium text-white"> {message || "Please wait"} </span>
      </div>
    );
  }

  // inline default
  return (
    <div className={`inline-flex items-center gap-3 ${className}`} role="status" aria-busy="true">
      <Spinner compact />
      {message ? (
        <div className="text-sm text-gray-700">{message}</div>
      ) : null}
    </div>
  );
}
