import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/author";
const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
      Authorization: `Bearer ${token}` ,
      "Content-Type": "application/json"
  };
};


export const getAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/find-all-author`, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAuthor = async (author) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-author`, author, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAuthor = async (authorId, author) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-author/${authorId}`, author,{ headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAuthor = async (authorID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-author`,{ 
      headers: getHeader(),
      data: { authorID } 
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
     }
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
