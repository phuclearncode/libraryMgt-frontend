import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/category`, category);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (categoryId, category) => {
  try {
    const response = await axios.put(`${BASE_URL}/category/${categoryId}`, category);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
