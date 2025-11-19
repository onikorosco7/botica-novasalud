import axios from "axios";

const API_URL = "http://localhost:4000/api/productos";

export const getProductos = async () => {
  return axios.get(API_URL, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

export const crearProducto = async (data) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

export const actualizarProducto = async (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

export const eliminarProducto = async (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

export const obtenerProducto = async (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};
