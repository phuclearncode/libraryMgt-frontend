import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/membership";

const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

export const getMemberships = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/memberships`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

