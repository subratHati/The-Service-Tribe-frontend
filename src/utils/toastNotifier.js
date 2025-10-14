// simple module to receive a push function from ToastProvider at runtime
let pushFn = null;
export function setPushToast(fn) {
  pushFn = fn;
}
export function pushToast(payload) {
  if (!pushFn) return;
  pushFn(payload);
}
