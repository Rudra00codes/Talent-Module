import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin';

export const getPendingProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/pending-talents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pending profiles:', error);
    throw error;
  }
};

export const approveProfile = async (id: string) => {
  try {
    const response = await axios.put(`${API_URL}/approve/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error approving profile:', error);
    throw error;
  }
};

export const rejectProfile = async (id: string) => {
  try {
    const response = await axios.put(`${API_URL}/reject/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting profile:', error);
    throw error;
  }
}; 