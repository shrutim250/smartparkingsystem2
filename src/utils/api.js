import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend API URL

export const checkSlotAvailability = async (slotNo) => {
  try {
    const response = await axios.post(`${API_URL}/check-slot`, { slotNo });
    return response.data;
  } catch (error) {
    console.error("Error checking slot availability:", error);
  }
};

export const makePayment = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/payment`, { amount });
    return response.data;
  } catch (error) {
    console.error("Error making payment:", error);
  }
};
