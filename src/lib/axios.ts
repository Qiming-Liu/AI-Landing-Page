import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { logout } from '@/store/features/authSlice';
import { store } from '@/store/store';

const httpInstance = () => {
  const axiosInstance: AxiosInstance = axios.create();
  axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  axiosInstance.defaults.headers.common.Authorization =
    store.getState().auth.token;

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      // eslint-disable-next-line no-console
      error && console.log(error.response);

      // jwt expired or invalid
      if (error && error.response && error.response.status === 401) {
        store.dispatch(logout());
      }

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const http = (endpoint: string, config?: AxiosRequestConfig) => {
  const axiosInstance = httpInstance();
  return axiosInstance(endpoint, { ...config });
};

export default http;
