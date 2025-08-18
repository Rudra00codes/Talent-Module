import apiService, { Talent } from './apiService';

export const registerTalent = async (formData: FormData) => {
  const response = await apiService.registerTalent(formData);
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export const getAllTalents = async (): Promise<Talent[]> => {
  const response = await apiService.getAllTalents();
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data || [];
};

export const getTalentById = async (id: string): Promise<Talent> => {
  const response = await apiService.getTalentById(id);
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data!;
};
