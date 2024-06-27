import axios from "axios";
// const BASE_URL = "http://localhost:8080/api/v1/book";
const BASE_URL = "http://localhost:9999";

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/books`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        console.log('response', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categoriess`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        console.log("Categories: ", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/books/${id}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
