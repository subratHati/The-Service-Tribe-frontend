// src/api/popular.js
import axios from "../utils/axios";

export const getPopularServices = async () => {
  const res = await axios.get("/service/popular");
  return res.data.services;
};

export const addPopularService = async (serviceId, position = undefined) => {
  const res = await axios.post("/service/popular", { serviceId, position });
  return res.data;
};

export const removePopularService = async (serviceId) => {
  const res = await axios.delete(`/service/popular/${serviceId}`);
  return res.data;
};

export const reorderPopularServices = async (orderedIds) => {
  const res = await axios.patch("/service/popular/reorder", { orderedIds });
  return res.data;
};
