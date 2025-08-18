import apiService, { Talent } from './apiService';

export const getPendingProfiles = async (): Promise<Talent[]> => {
  const response = await apiService.getPendingTalents();
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data || [];
};

export const getAllTalentsAdmin = async (): Promise<Talent[]> => {
  const response = await apiService.getAllTalentsAdmin();
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data || [];
};

export const getTalentByIdAdmin = async (id: string): Promise<Talent> => {
  const response = await apiService.getTalentByIdAdmin(id);
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data!;
};

export const approveProfile = async (id: string) => {
  const response = await apiService.approveTalent(id);
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export const rejectProfile = async (id: string, rejectionReason?: string) => {
  const response = await apiService.rejectTalent(id, rejectionReason);
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};