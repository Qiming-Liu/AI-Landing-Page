import http from '@/lib/axios';

export const getReview = async () => {
  http(`/public/review`, { method: 'GET' });
};

export const postReview = (review: any) => {
  http(`/private/review`, { method: 'POST', data: review });
};

export const updateReview = (review: any) =>
  http(`/public/review`, { method: 'PUT', data: review });

export const deleteReview = () => http(`/public/review`, { method: 'DELETE' });
