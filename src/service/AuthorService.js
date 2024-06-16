import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const getAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/author`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAuthor = async (author) => {
  try {
    const response = await axios.post(`${BASE_URL}/author`, author);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAuthor = async (authorId, author) => {
  try {
    const response = await axios.put(`${BASE_URL}/author/${authorId}`, author);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAuthor = async (authorId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/author/${authorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuthorById = async (authorId) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${authorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
