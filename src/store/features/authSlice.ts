'use client';

import { createSlice } from '@reduxjs/toolkit';

import AuthUser from '@/types/authUser';

const getInitialState = (): AuthUser => {
  if (typeof window === 'undefined')
    return { name: '', token: '', isLoggedIn: false };
  const authData = window.localStorage.getItem('auth');
  if (authData) {
    const { name, token, isLoggedIn } = JSON.parse(authData);
    return { name, token, isLoggedIn };
  } else {
    return { name: '', token: '', isLoggedIn: false };
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setAuthUser: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          name: state.name,
          token: state.token,
          isLoggedIn: true,
        }),
      );
    },
    logout: (state) => {
      state.name = '';
      state.token = '';
      state.isLoggedIn = false;
      localStorage.removeItem('auth');
      window.location.href = '/';
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
