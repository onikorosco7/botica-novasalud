import axios from "axios";

const API_URL = "http://localhost:4000/api/reportes";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") }
};

export const getVentasTotales = async () =>
  axios.get(`${API_URL}/ventas/totales`, config);

export const getVentasPorFecha = async (fecha) =>
  axios.get(`${API_URL}/ventas/fecha/${fecha}`, config);

export const getTopProductos = async () =>
  axios.get(`${API_URL}/productos/top`, config);

export const getInventarioReporte = async () =>
  axios.get(`${API_URL}/inventario`, config);
