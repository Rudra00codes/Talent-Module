import axios from 'axios';

interface ProfileResponse {
  success: boolean;
  message: string;
}

export const approveProfile = async (profileId: string): Promise<ProfileResponse> => {
  try {
    const response = await axios.put(`/api/admin/profiles/${profileId}/approve`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to approve profile');
  }
};

export const rejectProfile = async (profileId: string, reason?: string): Promise<ProfileResponse> => {
  try {
    const response = await axios.put(`/api/admin/profiles/${profileId}/reject`, { reason });
    return response.data;
  } catch (error) {
    throw new Error('Failed to reject profile');
  }
};

export const getPendingProfiles = async () => {
  try {
    const response = await axios.get('/api/admin/profiles/pending');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch pending profiles');
  }
}; 