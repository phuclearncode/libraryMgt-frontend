import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/category";

const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
      Authorization: `Bearer ${token}` ,
      "Content-Type": "application/json"
  };
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/find-all-category`, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-category`,category, { headers: getHeader() });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    }
    throw error; 
  }
};

export const updateCategory = async (categoryId, category) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-category/${categoryId}`, category, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const deleteCategory = async (id) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/delete-category`, {data: id} ,{ headers: getHeader() });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-category`, { 
      headers: getHeader(),
      data: { categoryId } 
    });
    return response.data;
  } catch (error) {
    if (error.response) {
     console.log(error.response.data);
    }
    throw error; 
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
