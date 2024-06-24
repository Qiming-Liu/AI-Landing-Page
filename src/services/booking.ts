import http from '@/lib/axios';

export const getBooking = () => {
  http(`/public/booking`, { method: 'GET' });
};

export const postBooking = (bookingData: any) => {
  http(`/public/booking`, { method: 'POST', data: bookingData });
};

export const update = (Booking: any) =>
  http(`/public/booking`, { method: 'PUT', data: Booking });

export const deleteBooking = (bookingID: any) =>
  http(`/public/booking`, { method: 'DELETE', data: bookingID });
