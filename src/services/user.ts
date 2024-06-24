import toast from 'react-hot-toast';

import http from '@/lib/axios';

import { setAuthUser } from '@/store/features/authSlice';
import { store } from '@/store/store';

export const loginUser = async (username: string, password: string) => {
  const { data } = await http(`/public/login`, {
    method: 'POST',
    data: {
      username,
      password,
    },
  });
  if (data.status === 200) {
    store.dispatch(
      setAuthUser({
        name: data.name,
        token: data.token,
      }),
    );
  }
  toast(data.message);
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const { data } = await http(`/public/register`, {
    method: 'POST',
    data: {
      username,
      // firstName: username,
      // lastName: username,
      email,
      password,
    },
  });
  if (data.status !== 200) {
    throw data.message;
  }

  store.dispatch(
    setAuthUser({
      id: data.user._id,
      name: data.user.username,
      token: data.token,
    }),
  );
  toast(data.message);
};

export const getUser = () => http(`/private/user`, { method: 'GET' });

export const updateUser = (userId: string, user: any) =>
  http(`/private/user?id=${userId}`, { method: 'PUT', data: user });

export const postUser = (user: any) =>
  http(`/private/user`, { method: 'POST', data: user });
