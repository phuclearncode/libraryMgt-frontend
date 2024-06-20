import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/book";

const getHeader = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}` ,
        "Content-Type": "application/json"
    };
};

export const getAllBooks = async () => {
    const response = await axios.get(`${BASE_URL}/list-book`, { headers: getHeader() }); 
    return response.data;
};

export const addBook = async (book) => {
    const response = await axios.post(`${BASE_URL}/add-book`,book, { headers: getHeader() });
    return response.data;
};

export const updateBook = async (book) => {
    const response = await axios.put(`${BASE_URL}/update-book`, book, { headers: getHeader() });
    return response.data;
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete-book/${id}`, { headers: getHeader() });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
