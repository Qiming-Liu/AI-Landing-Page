import http from '@/lib/axios';

export const getPet = async () => {
  const response = await http(`/private/pet`, { method: 'GET' });
  return response;
};

export const postPet = async (Pet: any) => {
  const response = await http(`/private/pet`, { method: 'POST', data: Pet });
  return response;
};

export const updatePet = async (Pet: any) => {
  const response = await http(`/private/pet`, { method: 'PUT', data: Pet });
  return response;
};
