// src/utils/toastService.js
let _push = null;

export function registerPush(fn) {
  _push = fn;
}

export function pushToast(payload) {
  if (typeof _push === "function") return _push(payload);
  // fallback to console to avoid crashes
  console.warn("Toast not registered:", payload);
}
