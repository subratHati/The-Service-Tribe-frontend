import axios from "axios";
import { pushToast } from "./toastNotifier"; // make sure this is exported from your ToastProvider

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});

//Request interceptor to attach token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // your token saved after login/register
  if (token) {
    config.headers["x-auth-token"] = token; // attach token for backend auth
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(
  res => res,
  (error) => {
    const serverData = error?.response?.data;
    const status = error?.response?.status;
    let message = "Something went wrong";

    if (serverData) {
      message = serverData.msg || serverData.error || serverData.message || JSON.stringify(serverData);
    } else if (error?.msg) message = error.msg;

    // Push toast (non-blocking)
    // If caller set skipToast on the request config, don't show global toast
    const skipToast = error?.config?.skipToast === true;
    if(!skipToast){
         try {
      pushToast({
        type: status >= 500 ? "error" : (status >= 400 ? "warning" : "info"),
        title: status ? `Error ${status}` : undefined,
        message,
        timeout: 6000
      });
    } catch (e) {
      // ignore
      console.error("Toast push failed", e);
    }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default instance;
