import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

export const getProductos = async () => {
  const response = await axios.get(`${BASE_URL}/product-conts?populate=*`);
  return response.data;
};
export const addProduct = async (item) => {
  const response = await axios.post(`${BASE_URL}/product-conts`, item);
  return response.data;
};
export const getFeatures = async () => {
  const response = await axios.get(`${BASE_URL}/features`);
  return response.data;
};
export const getAreas = async () => {
  const response = await axios.get(`${BASE_URL}/areas`);
  return response.data;
};

export const updateProduct = async (item, id) => {
  const response = await axios.put(`${BASE_URL}/product-conts/${id}`, item);
  return response.data;
};
