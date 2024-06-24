import http from '@/lib/axios';

import { IAccommodation } from '@/models/Accommodation';

export const getAllAccommodation = () =>
  http(`/public/accommodation`, { method: 'GET' });

export const getAccommodationByID = (accommodationID: string) =>
  http(`/public/accommodation?id=${accommodationID}`, { method: 'GET' });

export const updateAccommodation = (updateAccommodation: any) =>
  http(`/public/accommodation`, { method: 'PUT', data: updateAccommodation });

export const deleteAccommodation = () =>
  http(`/public/accommodation`, { method: 'DELETE' });

export const postAccommodation = (newAccommodation: Partial<IAccommodation>) =>
  http(`/private/accommodation`, { method: 'POST', data: newAccommodation });

export const getAccommodationByFilter = (
  minPrice: number,
  maxPrice: number,
  bedroom: number,
  bathroom: number,
  parking: number,
  toilet: number,
  catsAllowed: number,
  dogsAllowed: number,
  selectedType: string,
  amenities: string[],
) =>
  http(
    `/public/accommodation?minPrice=${minPrice}&maxPrice=${maxPrice}&bedroom=${bedroom}&bathroom=${bathroom}&parking=${parking}&toilet=${toilet}&catsAllowed=${catsAllowed}&dogsAllowed=${dogsAllowed}&selectedType=${selectedType}&amenities=${amenities.join(',')}`,
    {
      method: 'GET',
    },
  );
