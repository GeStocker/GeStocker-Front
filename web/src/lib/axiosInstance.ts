import { routes } from '@/routes/routes';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Token inválido'
    ) {
      if (typeof window !== 'undefined') {
        window.location.href = routes.dashboard + '?banned=true';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
