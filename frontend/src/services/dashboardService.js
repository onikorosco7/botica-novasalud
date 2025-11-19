import axios from "axios";

const API = "http://localhost:4000/api/reportes";
const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
};

export const getVentasPorDia = () =>
  axios.get(`${API}/ventas/por-dia`, config);

export const getTopProductos = () =>
  axios.get(`${API}/productos/top`, config);

export const getVentasTotales = () =>
  axios.get(`${API}/ventas/totales`, config);

export const getInventario = () =>
  axios.get(`${API}/inventario`, config);
