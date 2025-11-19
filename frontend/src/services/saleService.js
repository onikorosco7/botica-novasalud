import axios from "axios";

const API_URL = "http://localhost:4000/api/ventas";

export const registrarVenta = async (data) => {
  return axios.post(API_URL, data, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

export const obtenerHistorialVentas = async () => {
  return axios.get(`${API_URL}/historial`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};
