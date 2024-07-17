import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/payment";

const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

export const getPaymentUrl = async (id,amount) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-payment-url?amount=${amount}&memberId=${id}`, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};


