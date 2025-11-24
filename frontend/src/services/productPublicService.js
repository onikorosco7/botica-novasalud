import axios from "axios";

const API_URL = "http://localhost:4000/api/productos";

export const getProductosPublic = async () => {
  const res = await axios.get(`${API_URL}/public`);
  return res.data;
};

export const getProductoPublicById = async (id) => {
  const res = await axios.get(`${API_URL}/public/${id}`);
  return res.data;
};

export const searchProductosPublic = async (q) => {
  const res = await axios.get(`${API_URL}/public/search?q=${q}`);
  return res.data;
};

export const getDestacadosPublic = async () => {
  const res = await axios.get(`${API_URL}/public/destacados`);
  return res.data;
};
