import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

export const getProductos = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};
export const getFeatures = async () => {
  const response = await axios.get(`${BASE_URL}/features`);
  return response.data;
};

export const addProduct = async (item) => {
  const response = await axios.post(`${BASE_URL}/features`, item);

  return response.data;
};
